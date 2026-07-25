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
  /ifc            → IFC okuma / metraj çıkarımı (web-ifc). (Faz 2, henüz yok)
  /ui             → paylaşılan tasarım tokenları / bileşenler. (opsiyonel, henüz yok)
/apps
  /web            → Next.js (App Router) + TypeScript + Tailwind. PWA.
  /ios            → SwiftUI (Faz 3, henüz yok)
```

`apps/web/src/app` iki route group'a ayrılır (URL'leri etkilemez, her ikisinin kendi
root layout'u vardır — html/body burada tanımlanır, ikisi arasında paylaşılmaz):
- `(marketing)` → herkese açık tanıtım sitesi (`/`). Kendi header/footer'ı var.
- `(app)` → gerçek uygulama kabuğu: sol sidebar (`components/app-sidebar.tsx`,
  disiplin → alt kategori → modül), `/uygulama` (Kontrol Merkezi: arama, son
  hesaplar, en çok kullanılanlar — `lib/recent-calcs.ts` ile gerçek localStorage
  takibi) ve her hesap modülünün kendi sayfası.

Modül kataloğu tek kaynaktan yönetilir: `apps/web/src/lib/modules.ts`
(`MODUL_GRUPLARI`, `TUM_MODULLER`, `modulKonumu()`, `ilgiliModuller()`). Sidebar,
anasayfa modül listesi ve breadcrumb hepsi buradan okur — yeni modül eklerken
burayı da güncelle.

Çoğu hesap sayfası ortak `components/calc-page.tsx` (`<CalcPage>`) bileşenini
kullanır: form alanları config olarak verilir, breadcrumb/stepper/yöntem
paneli/ilgili modüller/verdict rozeti otomatik gelir. Yalnız girdi şekli çok
özel olan birkaç sayfa (örn. isitma-yuku, kanal-boyutlandirma) kendi JSX'ini yazar.

- Dil: **TypeScript strict** (`strict: true`, `noUncheckedIndexedAccess: true`).
- Girdi doğrulama: **Zod**.
- Test: **Vitest** (`packages/core-calc` içinde birim test zorunlu).
- Backend/veri (Faz 1+): **Supabase** (Auth + Postgres + RLS ile satır düzeyi izin). Henüz eklenmedi.
- Excel çıktı: **SheetJS**. PDF: server-side (Puppeteer) veya react-pdf. Henüz eklenmedi.
- Paket yöneticisi: **pnpm**. Node 20+.
- **Deploy:** GitHub `merturku/metranik` (main branch) → Vercel'e otomatik deploy
  (Root Directory: `apps/web`). Canlı: https://web-lime-eta-39.vercel.app

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

## 5. İlk 15 Çekirdek Modül — ✅ TAMAMLANDI (2026-07)

Mekanik: ısıtma yükü (TS 825), soğutma yükü, hidronik su debisi, kanal boyutlandırma (SMACNA),
boru basınç kaybı, pompa seçimi, sprinkler debi/basınç (NFPA 13), genleşme tankı, sıcak su/boyler (DIN 4708).
Elektrik: kablo kesiti + gerilim düşümü (IEC 60364), kısa devre akımı, aydınlatma lüks yöntemi (EN 12464-1), kompanzasyon.
Havalandırma: taze hava debisi (ASHRAE 62.1).
İnşaat: deprem taban kesme (TBDY 2018).

Modülleri **tek tek**, her biri test yeşil olacak şekilde ekle. Hepsini birden yazma.

### 5b. Test & Kontrol modülleri (ek, planın dışında ama aynı disiplinde)

`CalcResult.verdict` alanını kullanan, saha/deney değerini bir kriterle karşılaştıran
7 modül eklendi (her disiplinde en az bir tane, dengeli dağılım için):

- Mekanik: hidrostatik basınç testi (ASME B31/NFPA 13), havalandırma debi kontrolü.
- Elektrik: topraklama direnci testi (IEC 60364-4-41), yalıtım direnci testi (IEC 60364-6),
  kesici kısa devre kapasitesi kontrolü (IEC 60947-2).
- İnşaat: zemin taşıma gücü kontrolü, beton basınç dayanımı kontrolü (TS 500/TS EN 13791).

Aynı kural geçerli: standart-spesifik tablo değerleri (örn. yalıtım direnci asgari
MΩ tablosu) doğrulanmış ama "yerel baskıdan teyit edin" notuyla; formülün kendisi
(basınç/direnç/kapasite karşılaştırması) her zaman gerçek fizik/mühendislik ilişkisi,
uydurma değil.

**Toplam: 22 modül, 42 test, hepsi yeşil.** Yeni modül eklerken hem
`packages/core-calc/src/index.ts` hem `apps/web/src/lib/modules.ts` (MODUL_GRUPLARI +
ilgili sabit) hem de `apps/web/src/app/(app)/<modul>/page.tsx` güncellenmeli.

---

## 6. Yapma / Dikkat

- Standart metinlerini (TS/NFPA/IEC) **kopyalama/gömme**. Yalnız madde no + yönteme atıf.
- Hesabı LLM'e yaptırma (bkz. §3).
- Kapsamı şişirme: 300 modül kopyalamaya çalışma; 15 çekirdek + 3 farklılaşma ekseni.
- Her sonuç ekranında ve raporda: *"Ön boyutlandırmadır; nihai karar mühendis kontrolü gerektirir."*
- Bulut/hesap eklenince KVKK: aydınlatma metni + açık rıza + çerez akışı gerekir.
- Sırlar `.env` içinde, repoya girmez. Supabase anonim anahtarı client'ta olabilir; service_role ASLA.

---

## 7. Milestone 0 — Kabul Kriteri (ilk hedef) — ✅ TAMAMLANDI

- [x] Monorepo kurulu, `pnpm install` ve `pnpm build` temiz.
- [x] `packages/core-calc` içinde **ısıtma yükü (TS 825)** modülü: Zod şeması + saf `compute` + `intermediates` + çözümlü örnek testi.
- [x] `pnpm test` yeşil.
- [x] `apps/web` içinde tek sayfa: girdi formu → modülü çağırır → sonucu + ara değerleri + standart notunu gösterir.
- [x] Kısa `README.md`: kurulum + "yeni modül nasıl eklenir" reçetesi.

---

## 8. Güncel Durum (2026-07, Milestone 0 sonrası)

Milestone 0'ın çok ötesine geçildi — kullanıcı onayıyla ek kapsam eklendi:

- **Tasarım**: Görsel sistem (renk/tipografi/layout) bilinçli olarak projenik.com'un
  canlı CSS'inden alındı (kullanıcı talebi, `PRODUCT.md`'de gerekçesiyle kayıtlı).
  İçerik/kopya her zaman orijinal — kaynağın sahte istatistiklerini/özelliklerini
  kopyalamadık.
- **App shell**: `/uygulama` (Kontrol Merkezi) + sidebar, gerçek geçmiş/en-çok-kullanılan
  takibi (localStorage, `lib/recent-calcs.ts`).
- **22 modül, 42 test** (bkz. §5/§5b) — hem hesap hem test/kontrol tipinde, 3 disiplinde dengeli.
- **Deploy**: GitHub `merturku/metranik` → Vercel otomatik deploy, canlı link §2'de.
- **İş modeli (karar 2026-07-25)**: Beta sürümü, çekirdek kullanım ücretsiz/üyeliksiz.
  Gelir modeli reklam/sponsorluk (anasayfada "Reklam Verin" bölümü: Ana Sponsor Bandı,
  Kategori Sponsorluğu, Sonuç Yanı Kart). Henüz gerçek reklam altyapısı (ödeme, sponsor
  yönetimi) yok — şu an sadece ilgi toplama/iletişim CTA'sı var.

Sıradaki karar noktası: Faz 2 (BIM/IFC-native metraj, `packages/ifc`, web-ifc) — ayrı
bir mimari planlama gerektirir, kendiliğinden başlanmaz, önce birlikte karar verilir.
