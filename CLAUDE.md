# CLAUDE.md — Proje Bağlamı & Kuralları

Bu dosya Claude Code tarafından otomatik okunur. Projede çalışırken buradaki
kararlara ve kurallara **her zaman** uy.

---

## 1. Ürün

Tarayıcı tabanlı + native mobil bir **mühendislik hesap platformu**.
Referans/rakip: projenik.com. Bizim farkımız modül sayısı değil, üç eksende derinlik:

1. **BIM/IFC-native metraj** — kullanıcı IFC modeli yükler → boru/kanal/kablo/ekipman
   otomatik okunur → metraj ve hesap girdileri otomatik dolar.
2. **AI asistan (Claude tool-use)** — problemi cümleyle tarif → asistan doğru modülü seçer,
   girdileri çeker, **deterministik motor** hesaplar, sonucu standart maddesine atıfla açıklar.
3. **Bulut + ekip + native iOS** — hesap sistemi, proje bulutu, revizyon geçmişi, offline-first senkron.

Hedef kitle: MEP/mekanik/elektrik/inşaat mühendisleri, teknik ofis, denetçi, ev sahibi (rol bazlı UX).

---

## 2. Mimari & Stack (KESİN — kendiliğinden değiştirme, önce sor)

Monorepo (pnpm workspaces):

```
/packages
  /core-calc      → framework-bağımsız hesap motoru (saf TS, YAN ETKİSİZ). Vitest.
  /ifc            → IFC okuma / metraj çıkarımı (web-ifc). (Faz 2)
  /ui             → paylaşılan tasarım tokenları / bileşenler. (opsiyonel)
/apps
  /web            → Next.js (App Router) + TypeScript + Tailwind. PWA.
  /ios            → SwiftUI (Faz 3)
```

- Dil: **TypeScript strict** (`strict: true`, `noUncheckedIndexedAccess: true`).
- Girdi doğrulama: **Zod**.
- Test: **Vitest** (`packages/core-calc` içinde birim test zorunlu).
- Backend/veri (Faz 1+): **Supabase** (Auth + Postgres + RLS ile satır düzeyi izin).
- Excel çıktı: **SheetJS**. PDF: server-side (Puppeteer) veya react-pdf.
- Paket yöneticisi: **pnpm**. Node 20+.

---

## 3. Hesap Motoru Sözleşmesi (EN KRİTİK KURAL)

Her hesap modülü aşağıdaki sözleşmeye uyar. Bu, tüm ürünün doğruluk garantisidir.

```ts
export type Discipline = "mekanik" | "elektrik" | "insaat" | "ev";

export interface CalcModule<I, O> {
  id: string;                 // örn "isitma-yuku-ts825"
  title: string;              // "Isıtma Yükü"
  discipline: Discipline;
  standards: string[];        // ["TS 825"] — sürüm dahil raporda basılır
  inputSchema: import("zod").ZodType<I>;
  compute(input: I): O;       // SAF fonksiyon: yan etki YOK, I/O YOK, random YOK
}

export interface CalcResult<O> {
  value: O;                   // ana sonuç
  intermediates: Record<string, number | string>; // ara değerler (şeffaflık)
  standardsUsed: string[];    // hangi standart + sürüm
  verdict?: { status: "uygun" | "sinirda" | "uygunsuz"; note: string };
}
```

Kurallar:
- `compute` **tamamen deterministik ve saf** olmalı. Ağ, tarih, random, DOM YOK.
- **LLM asla hesap yapmaz.** AI yalnız modül seçer ve girdi önerir; sayıyı hep motor üretir.
- Her modül `intermediates` döndürerek türevi görünür kılar (denetim için).
- Sonuç **standart sürümünü** taşır ve raporda basılır.

---

## 4. Test Kuralı (İSTİSNASIZ)

Her modülün en az bir testi, **standarttan/ders kitabından alınmış çözümlü bir örneği**
yeniden üretmeli ve beklenen sayısal sonucu tolerans içinde doğrulamalıdır.

```ts
// örnek: packages/core-calc/src/modules/isitma-yuku-ts825.test.ts
it("TS 825 çözümlü örnek: 85 m² çift cam İstanbul ≈ X kW", () => {
  const r = isitmaYukuTs825.compute({ alan: 85, sehir: "istanbul", cam: "cift" });
  expect(r.value.kW).toBeCloseTo(BEKLENEN, 1); // referans örnekle
});
```

`pnpm test` yeşil olmadan commit yok.

---

## 5. İlk 15 Çekirdek Modül (mekanik ağırlıklı — başlangıç seti)

Mekanik: ısıtma yükü (TS 825), soğutma yükü, hidronik su debisi, kanal boyutlandırma (SMACNA),
boru basınç kaybı, pompa seçimi, sprinkler debi/basınç (NFPA 13), genleşme tankı, sıcak su/boyler (DIN 4708).
Elektrik: kablo kesiti + gerilim düşümü (IEC 60364), kısa devre akımı, aydınlatma lüks yöntemi (EN 12464-1), kompanzasyon.
Havalandırma: taze hava debisi (ASHRAE 62.1).
İnşaat (opsiyonel 15.): deprem taban kesme (TBDY 2018).

Modülleri **tek tek**, her biri test yeşil olacak şekilde ekle. Hepsini birden yazma.

---

## 6. Yapma / Dikkat

- Standart metinlerini (TS/NFPA/IEC) **kopyalama/gömme**. Yalnız madde no + yönteme atıf.
- Hesabı LLM'e yaptırma (bkz. §3).
- Kapsamı şişirme: 300 modül kopyalamaya çalışma; 15 çekirdek + 3 farklılaşma ekseni.
- Her sonuç ekranında ve raporda: *"Ön boyutlandırmadır; nihai karar mühendis kontrolü gerektirir."*
- Bulut/hesap eklenince KVKK: aydınlatma metni + açık rıza + çerez akışı gerekir.
- Sırlar `.env` içinde, repoya girmez. Supabase anonim anahtarı client'ta olabilir; service_role ASLA.

---

## 7. Milestone 0 — Kabul Kriteri (ilk hedef)

- [ ] Monorepo kurulu, `pnpm install` ve `pnpm build` temiz.
- [ ] `packages/core-calc` içinde **ısıtma yükü (TS 825)** modülü: Zod şeması + saf `compute` + `intermediates` + çözümlü örnek testi.
- [ ] `pnpm test` yeşil.
- [ ] `apps/web` içinde tek sayfa: girdi formu → modülü çağırır → sonucu + ara değerleri + standart notunu gösterir.
- [ ] Kısa `README.md`: kurulum + "yeni modül nasıl eklenir" reçetesi.

Milestone 0 bitince dur ve özet ver; sonraki modüllere birlikte karar veririz.
