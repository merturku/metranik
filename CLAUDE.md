# CLAUDE.md — Proje Bağlamı & Kuralları

Bu dosya Claude Code tarafından otomatik okunur. Projede çalışırken buradaki
kararlara ve kurallara **her zaman** uy.

---

## 1. Ürün

Tarayıcı tabanlı + native mobil bir **mühendislik hesap platformu**.
Referans/rakip: projenik.com.

**Kapsam kararı (2026-07-26, güncellendi):** İlk stratejide "modül sayısı değil derinlik"
denmişti ve §6'da 300 modülü kopyalamama uyarısı vardı. Kullanıcı bu kararı bilinçli
olarak tersine çevirdi: projenik.com'un tüm kataloğu (~330 modül: Mekanik 142,
Elektrik 62, İnşaat 65, Ev Sahibi/Günlük Hayat 39, Teknik Ofis 21, Diğer 3) hedef
alınıyor. Kategori kategori (önce İnşaat) ilerlenip her oturumda bir parti eklenecek;
her modül yine §3/§4 kuralına (gerçek formül + standart atfı + çözümlü test) tabi —
sayı arttıkça titizlik düşürülmüyor. Aşağıdaki 3 eksen hâlâ ürünün asıl farkı:

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
  (Root Directory: `apps/web`). Canlı: https://metranik.vercel.app

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

### 5c. 24. ve 27. modüller + Standart & Yöntem paneli

24. modül grubu: yangın pompası performans kontrolü (NFPA 20), pano sıcaklık artışı
kontrolü (IEC 61439). 27. modül grubu: kar yükü hesabı (EN 1991-1-3), askılama hesabı
(askı yükü = doğrusal ağırlık × açıklık), gerilim düşümü kontrolü (IEC 60364-5-52,
ölçülen % ile izin verilen % karşılaştırması).

Ayrıca `CalcPage`'e `formula` ve `engineeringNote` prop'ları eklendi (referans
sitedeki "Standart & Yöntem" panelinin karşılığı) ve o tarihte var olan 27 modül
sayfasının tamamına işlendi. **Yeni modül eklerken bu iki prop'u da doldur.**

### 5d. İnşaat/Ev dengesi için 6 modül daha

İnşaat (4 modül) ve Ev (0 modül) diğer disiplinlere göre zayıf kaldığı için eklendi:

- İnşaat: rüzgar yükü hesabı (TS EN 1991-1-4), merdiven basamak hesabı (Blondel formülü, verdict'li).
- Elektrik: trafo güç seçimi, jeneratör seçimi (ikisi de fiziksel formül, standart yok).
- Mekanik: yangın dolabı debi/basınç (TS 9811, verdict'li).
- Ev (yeni disiplin, ilk modülü): klima (split) kapasite seçimi (sektör kuralı, standart yok).

### 5e. Ev disiplinini derinleştiren 4 modül daha

Ev disiplini tek modülle (klima) çok inceydi; eklenenler: güneş paneli (GES) kapasite
hesabı, su deposu hacmi hesabı, ısı yalıtım kalınlığı hesabı (TS 825), ev tesisatı
sigorta yükü kontrolü (IEC 60364, verdict'li). Ayrıca `/uygulama` (Kontrol Merkezi)
sayfasına, sidebar'dakiyle tutarlı, disiplin/alt kategori bazlı gruplu "Tüm Modüller"
bölümü eklendi (referans sitedeki klasör görünümünün karşılığı).

### 5f. İnşaat Denetim & Elektrik denetim modülleri (~330 hedefine ilk parti)

projenik.com'un İnşaat İşleri kategorisinden gerçek atıflı formüllerle 5 modül
eklendi: donatı kenetlenme boyu (TS 500/TBDY 2018), çelik yapı bulon sıkma momenti
(TS EN 1090-2/AWS D1.1), taze beton kalıp basıncı (ACI 347/TS EN 12812, hidrostatik
ve ampirik formülün küçüğü), kablo tava doluluk oranı (TS EN 61537, verdict'li),
paratoner koruma yarıçapı (TS EN 62305/NF C 17-102, yuvarlanan küre yöntemi).

**Toplam: 42 modül, 74 test, hepsi yeşil.** Yeni modül eklerken hem
`packages/core-calc/src/index.ts` hem `apps/web/src/lib/modules.ts` (MODUL_GRUPLARI +
ilgili sabit) hem de `apps/web/src/app/(app)/<modul>/page.tsx` (module, standardsLabel,
description, formula, engineeringNote, fields, defaults) güncellenmeli.

### 5g. ~330 modül hedefine ilerleme takibi

Referans (projenik.com) kategori/modül sayıları ile bizim durumumuz (2026-07-26):

| Disiplin | Referans | Bizde | Not |
|---|---|---|---|
| Mekanik | 142 | ~63 | çok geride, düz yüzey taşınımla ısı kaybı eklendi |
| Elektrik | 62 | ~37 | geride |
| İnşaat | 65 | ~30 | geride, konsol kiriş ucu sehimi eklendi |
| Ev Sahibi/Günlük Hayat | 39 | 11 | geride, elektrik fatura tahmini + güneş paneli geri ödeme + LED tasarrufu eklendi |
| Teknik Ofis | 21 | 0 | başlanmadı — hesap-dışı araçlar (Gantt, Excel, muhasebe) çoğunlukla CalcModule'e uymuyor, değerlendirme gerekir |
| Diğer | 3 | 0 | değerlendirilmedi (DÖF gibi hesap-dışı araçlar olabilir, CalcModule'e uymayabilir) |

projenik.com'un tam menüsü WebFetch ile incelendi (`app.html`, hash olmadan). Henüz
bizde olmayan başlıklar (kalınlar öncelikli, gerçek fizik formülü bulunabilenler):

- **Mekanik/Isıtma-Soğutma:** Aparey (kalan tek kalem, adı belirsiz/örtüşüyor — kapsam
  netleştirilmeli). Diğerleri (FCU, VAV, Radyatör, Yerden Isıtma, Radyant Isıtıcı, Klima
  Santrali, Isı Geri Kazanım, Endüstriyel Boyler, Isı Pompası, Güneş Kollektörü, Eşanjör,
  Denge Kabı, Hava Ayırıcı, Kollektör) eklendi.
- **Mekanik/Havalandırma:** Fan, Davlumbaz, Basınç Kaybı, Menfez/Difüzör, Susturucu,
  Trafo Odası Havalandırma.
- **Mekanik/Yangın:** Sprinkler Boru Çapı, Merdiven Basınçlandırma Fanı, Kuru Sistem
  Hava Kompresörü.
- **Mekanik/Sıhhi:** Temiz Su, Sıcak Su Sirkülasyon.
- **Mekanik/Buhar:** Kondens Hesapları.
- **Mekanik/Montaj:** Boru Seçim Tablosu (kalan tek kalem — lookup tablosu ağırlıklı,
  CalcModule sözleşmesine uyup uymadığı netleştirilmeli). Konsol Boru Destek Aralığı
  Kontrolü ve Kanal Askı Malzeme Metrajı (SMACNA) eklendi (yeni "Montaj" alt kategorisi).
- **Elektrik:** Kablo Düzeltme Faktörleri (grup+tesisat tipi birleşik), Yıldırım Risk
  Değerlendirmesi, Acil Aydınlatma Batarya Süresi, Pano Yük Cetveli.
- **İnşaat:** (Betonarme/Zemin/Yükler/Denetim alt kategorileri artık iyi kapsanıyor.)
- **Ev Sahibi/Günlük Hayat:** genel amaçlı, projenik'te alt kırılım verilmemiş.
- **Teknik Ofis / Diğer:** çoğunluğu proje yönetimi/muhasebe/rapor aracı — CalcModule
  sözleşmesine (gerçek formül + test) uymuyor, DÖF gibi araçlar dahil; bu kategorilere
  girmeden önce kullanıcıyla kapsam netleştirilmeli.

Sıradaki oturumlar Mekanik'ten (en büyük açık) devam edebilir; yukarıdaki liste
tükenirse `WebFetch` ile `projenik.com/app.html#m/<ilgili-kategori>` tekrar
incelenebilir (sayfa client-side render, bazen kısmi bilgi döner).

### 5h. Betonarme + elektrik denetim: 5 modül daha

Kolon boyutlandırma (eksenel kapasite), kiriş boyutlandırma (tek donatılı moment
kapasitesi), temel taşıma kapasitesi (Meyerhof formülü, taşıma gücü katsayıları
kullanıcı girdisi), kablo akım taşıma kapasitesi düzeltmesi (IEC 60364-5-52, sıcaklık/
gruplama katsayıları), yangın algılama loop gerilim düşümü (EN 54/NFPA 72, verdict'li).

### 5i. Döşeme/su yalıtımı + elektrik güç modülleri: 5 modül daha

Döşeme kalınlığı (sehim kontrolü, açıklık/derinlik oranı), su yalıtımı membran
bindirme kontrolü (DIN 18533, verdict'li), motor yol verme akımı, UPS/batarya
kapasitesi, bara (busbar) akım taşıma kapasitesi (akım yoğunluğu yöntemi).

**Toplam: 52 modül, 87 test, hepsi yeşil.**

### 5j. Mekanik açığını kapatmaya başlangıç: 5 modül daha

Yağmur suyu debisi (rasyonel yöntem), atık su debisi (EN 12056-2 deşarj birimi
yöntemi), emniyet ventili kapasitesi (enerji dengesi, TS EN 12828), buhar hat çapı
(süreklilik denklemi), hava kompresörü seçimi (FAD, eşzamanlılık faktörü). Yeni
alt kategoriler: Buhar, Basınçlı Hava.

**Toplam: 57 modül, 92 test, hepsi yeşil.**

### 5k. Isıtma-Soğutma ekipman modülleri: 5 modül daha

Eşanjör boyutlandırma (LMTD yöntemi), ısı pompası kompresör gücü (COP), radyatör
kapasite düzeltmesi (EN 442, üstel yasa), güneş kollektörü alanı (enerji dengesi),
FCU su debisi (enerji dengesi, Q=ṁcpΔT).

**Toplam: 62 modül, 97 test, hepsi yeşil.**

### 5l. Havalandırma + sıhhi tesisat modülleri: 5 modül daha

Fan afinite yasaları (devir değişimi), davlumbaz debisi (yakalama hızı, ACGIH),
menfez/difüzör debisi (orifis formülü), sıcak su sirkülasyon debisi (enerji
dengesi), trafo odası havalandırma debisi (enerji dengesi).

**Toplam: 67 modül, 102 test, hepsi yeşil.**

### 5m. Yangın/sıhhi/yıldırım modülleri: 5 modül daha

Merdiven basınçlandırma fanı debisi (NFPA 92), sprinkler boru çapı (NFPA 13),
temiz su debisi (EN 806-3, yükleme birimi yöntemi), yıldırım risk değerlendirmesi
(IEC 62305-2, basitleştirilmiş düşme sıklığı), acil aydınlatma batarya süresi.

**Toplam: 72 modül, 107 test, hepsi yeşil.**

### 5n. Buhar/ev/elektrik son modülleri: 5 modül daha

Kuru sistem hava kompresörü kapasitesi (NFPA 13), kondens debisi, pano yük cetveli
(talep faktörü), boya miktarı hesabı (Ev), fayans/döşeme malzeme miktarı (Ev).

**Toplam: 77 modül, 112 test, hepsi yeşil.**

### 5o. Boru fiziği + zemin konsolidasyon + rüzgar yükü: 5 modül daha

Boru ısı kaybı (silindirik iletim), boru termal genleşme payı, su darbesi basıncı
(Joukowsky denklemi), zemin konsolidasyon oturması (Terzaghi teorisi), aydınlatma
direği rüzgar yükü (TS EN 1991-1-4).

**Toplam: 82 modül, 117 test, hepsi yeşil.**

### 5p. Isıtma-soğutma ekipmanı + havalandırma: 5 modül daha

Yerden ısıtma boru uzunluğu, ısı geri kazanım verimi, boyler ısınma süresi,
susturucu uzunluğu, radyant ısıtıcı kapasitesi.

**Toplam: 87 modül, 122 test, hepsi yeşil.**

### 5q. Elektrik koruma + betonarme kontrol: 5 modül daha

Topraklama iletkeni kesiti (IEC 60364-5-54, adyabatik formül), kısa devre gücü,
kesme kuvveti kapasitesi (TS 500), kolon narinlik kontrolü (TBDY 2018, verdict'li),
trafo kısa devre akımı.

**Toplam: 92 modül, 128 test, hepsi yeşil.**

### 5r. Su/nem/merdiven fiziği: 5 modül daha

Havuz su sirkülasyon debisi (Ev), su yumuşatma reçine hacmi, klima gizli ısı yükü
(nem alma, psikrometrik), merdiven basamak sayısı, pencere/duvar ısı kaybı (TS 825).

**Toplam: 97 modül, 133 test, hepsi yeşil.**

### 5s. Isıtma ekipmanı + elektrik/inşaat detay: 5 modül daha

Denge kabı (buffer tank) hacmi, endüstriyel boyler yakıt tüketimi (yanma enerji
dengesi), kollektör devre sayısı, bara ısınma kaybı (I²R, Joule ısınması), perde
duvar kalınlığı (TBDY 2018, pratik kural).

**Toplam: 102 modül, 138 test, hepsi yeşil.**

### 5t. HVAC ekipmanı + beton karışımı: 5 modül daha

FCU hava tarafı kapasitesi, VAV kutusu minimum debi, ısı pompası mevsimsel
performans katsayısı (SPF), beton su/çimento oranı (TS 802), klima santrali
toplam basınç kaybı (bileşen toplamı).

**Toplam: 107 modül, 143 test, hepsi yeşil.**

### 5u. Klasik mühendislik formülleri: 5 modül daha

Boru et kalınlığı (Barlow formülü), motor giriş gücü, kablo ekonomik kesit
(ekonomik akım yoğunluğu), kompresör sıkıştırma sıcaklığı (izentropik bağıntı),
kolon ön boyutlandırma (eksenel yük bazlı kaba kesit).

**Toplam: 112 modül, 148 test, hepsi yeşil.**

### 5v. Vana/jeneratör/akü/yığma yapı: 5 modül daha

Vana akış katsayısı (Kv), jeneratör yakıt tüketimi (SFC), akü şarj süresi, yığma
duvar gerilme kontrolü (verdict'li), kondansatör deşarj süresi (RC denklemi,
IEC 60831 güvenlik gerekçesi).

**Toplam: 117 modül, 154 test, hepsi yeşil.**

### 5w. Fan gücü/pompa NPSH/trafo yüklenme/kazık/şev stabilitesi: 5 modül daha

Fan mil gücü (P=Q×ΔP/η), pompa NPSH kontrolü (kavitasyon riski, verdict'li),
trafo yüklenme oranı (verdict'li, IEC pratik eşikleri), kazık taşıma kapasitesi
(statik yöntem, Qu=qp×Ap+fs×As), sonsuz şev stabilitesi (kohezyonsuz zemin,
FS=tanφ/tanβ). Not: ilk tasarlanan "rüzgar yükü basıncı" modülü mevcut
`ruzgar-yuku-hesabi` ile aynı fiziği (qb=0.5ρV²) tekrar ettiği için atlandı,
yerine kazık taşıma kapasitesi eklendi — modül çeşitliliği tekrardan önemli.

**Toplam: 122 modül, 162 test, hepsi yeşil.**

### 5x. Basınçlı hava/kablo termik/bara kuvveti/kiriş sehimi/istinat duvarı: 5 modül daha

Basınçlı hava boru çapı (süreklilik denklemi), kablo kısa devre termik dayanım
kontrolü (IEC 60364-4-43, verdict'li), bara elektrodinamik kuvvet (IEC 60865-1),
kiriş sehim kontrolü (klasik kiriş teorisi, L/250 servis sınırı, verdict'li),
istinat duvarı aktif toprak basıncı (Rankine teorisi).

**Toplam: 127 modül, 169 test, hepsi yeşil.**

### 5y. Isı değiştirici/psikrometri/trafo verimi/kondansatör enerji/kolon donatı: 5 modül daha

Isı değiştirici etkinliği (ε-NTU temel tanımı), psikrometrik çiy noktası
(Magnus-Tetens yaklaşımı), trafo verimi (Pfe/Pcu kayıp yöntemi), kondansatör
depolanan enerji (E=0.5CV²), kolon boyuna donatı oranı kontrolü (TS 500 §7.4.1,
verdict'li).

**Toplam: 132 modül, 176 test, hepsi yeşil.**

### 5z. Boru akış rejimi/pompa gücü/motor hızı/kompanzasyon akımı/temel eksantrik yük: 5 modül daha

Boru akış rejimi (Reynolds sayısı, laminer/geçiş/türbülanslı sınıflandırma),
pompa hidrolik gücü (P=ρgQH/η), motor senkron hızı (n=120f/p), kompanzasyon
kondansatör akımı (Ic=Qc/(√3×V)), temel eksantrik yük zemin gerilmesi kontrolü
(q=N/A±M/W, e≤L/6 çekirdek koşulu, verdict'li).

**Toplam: 137 modül, 183 test, hepsi yeşil.**

### 5aa. Ev disiplini + mekanik/inşaat detay: 5 modül daha

Ev disiplini referansa göre en zayıf kategori olduğu için önceliklendirildi:
elektrik fatura tahmini (basit tüketim×fiyat), güneş paneli geri ödeme süresi
(yatırım/yıllık tasarruf), LED aydınlatma enerji tasarrufu. Ayrıca düz yüzey
taşınımla ısı kaybı (Newton soğuma yasası, Q=hAΔT) ve konsol kiriş ucu sehimi
(klasik kiriş teorisi, ankastre durum, L/180 servis sınırı, verdict'li).

**Toplam: 142 modül, 189 test, hepsi yeşil.**

Ayrıca bu oturumda: (1) Türkçe klavye/yerel ayarla girilen ondalık virgül
("5,5") `type="number"` input'larda native olarak reddediliyor ve `Number()`
NaN döndürüyordu — `calc-page.tsx`'teki tüm girdi alanları `type="text"` +
`inputMode="decimal"`'e çevrildi, virgül/nokta normalize eden `sayiyaCevir()`
eklendi (kullanıcı canlıda karşılaştı, düzeltildi). (2) (app) ve (marketing)
layout'larına KVKK/veri gizliliği bildirimi banner'ı (`components/kvkk-banner.tsx`,
localStorage tabanlı onay) ve `/kvkk` detay sayfası eklendi — çekirdek kullanım
hâlâ üyeliksiz ve hesaplar tarayıcıda çalışıyor, banner bunu netleştiriyor.

### 5ab. Hava ayırıcı + montaj (yeni alt kategori) + ev sulama/batarya: 5 modül daha

Hava ayırıcı boyutlandırma (süreklilik denklemi + üretici hız pratiği, Isıtma-Soğutma),
konsol boru destek aralığı kontrolü (klasik kiriş teorisi, ankastre M=wL²/2, verdict'li)
ve kanal askı malzeme metrajı (SMACNA askı aralığı pratiği) — ikincisi ve üçüncüsü için
Mekanik Tesisat altında yeni "Montaj" alt kategorisi açıldı. Ev disiplinine bahçe sulama
debisi (1mm/m²=1L ilişkisi) ve güneş enerjisi bataryası otonomi kapasitesi (UPS'teki
yedekleme süresinden farklı olarak gün bazlı otonomi + DoD ile) eklendi.

**Toplam: 147 modül, 195 test, hepsi yeşil.**

Ayrıca bu oturumda: repo iCloud Drive altında olduğu için `.git` bozulmuştu
(`fatal: bad object HEAD` — commit objesi diskte eksikti) ve son commit'in eklediği
10 modülün dosyaları (5 core-calc modül+test çifti, 10 page.tsx, modules.ts'teki
karşılık gelen girdiler) sessizce diskten silinmiş/eski haline dönmüştü — muhtemelen
aynı iCloud senkron sorunu. `git fetch` (çok yavaş, ~3-4 KB/sn, arka planda beklenip
tamamlandı) ile obje kurtarıldı, ardından `git restore` ile kayıp dosyalar geri
yüklendi; hiçbir iş kaybedilmedi (bkz. hafıza `gotcha_icloud_git_corruption`). Bu
proje iCloud altında çalıştığı sürece benzer belirtiler (`git status`/`git log`
hatası veya CLAUDE.md'nin kaydettiği sayıyla `pnpm test` çıktısının uyuşmaması)
görülürse önce `git fetch`/`git restore` denenmeli, dosya gerçekten kayıpsa panik
yapmadan `origin/main`'den kurtarılabileceği unutulmamalı.

Sıradaki oturumlarda kategori kategori devam et (İnşaat'ta Betonarme/Zemin/Yükler alt
başlıkları, sonra Elektrik denetim, sonra Mekanik). Her modül gerçek formül + standart
atfı + çözümlü test gerektirir; referans sitenin URL'lerini (`projenik.com/app.html#m/...`)
WebFetch ile inceleyip gerçek formül/standart bulmak işe yarıyor — ama sayfa client-side
render olduğundan bazen sadece kısmi bilgi dönebilir, gerekirse mühendislik bilgisiyle
tamamla (uydurma sayı değil, gerçek standart formülü).

---

## 6. Yapma / Dikkat

- Standart metinlerini (TS/NFPA/IEC) **kopyalama/gömme**. Yalnız madde no + yönteme atıf.
- Hesabı LLM'e yaptırma (bkz. §3).
- ~330 modül hedefi §1'de kayıtlı bilinçli bir karar; ama her modül yine de gerçek
  formül + standart atfı + çözümlü test gerektirir (bkz. §3/§4) — hız için kaliteden
  ödün verme, uydurma sayı/tablo değeri ekleme.
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
- **147 modül, 195 test** (bkz. §5/§5b-§5ab) — hem hesap hem test/kontrol tipinde, 4 disiplinde (mekanik/elektrik/inşaat/ev) dengeli. Hedef ~330 (§5g'de ilerleme tablosu ve eksik başlık listesi).
- **KVKK**: (app) ve (marketing) layout'larında `KvkkBanner` (localStorage onay) + `/kvkk` detay sayfası var (bkz. §5z). Bulut/hesap eklenince (Faz 1+) bu bildirim gerçek sunucu tarafı veri işleme senaryosuna göre güncellenmeli.
- **Sayısal girdi alanları**: `calc-page.tsx`'teki tüm sayı alanları `type="text"` + `inputMode="decimal"` kullanır (native `type="number"` Türkçe ondalık virgülü — "5,5" — reddediyordu); `sayiyaCevir()` virgül/nokta normalize eder. Yeni girdi tipi eklerken bu deseni koru.
- **Deploy**: GitHub `merturku/metranik` → Vercel otomatik deploy, canlı link §2'de.
- **İş modeli (karar 2026-07-25)**: Beta sürümü, çekirdek kullanım ücretsiz/üyeliksiz.
  Gelir modeli reklam/sponsorluk (anasayfada "Reklam Verin" bölümü: Ana Sponsor Bandı,
  Kategori Sponsorluğu, Sonuç Yanı Kart). Henüz gerçek reklam altyapısı (ödeme, sponsor
  yönetimi) yok — şu an sadece ilgi toplama/iletişim CTA'sı var.

Sıradaki karar noktası: Faz 2 (BIM/IFC-native metraj, `packages/ifc`, web-ifc) — ayrı
bir mimari planlama gerektirir, kendiliğinden başlanmaz, önce birlikte karar verilir.
