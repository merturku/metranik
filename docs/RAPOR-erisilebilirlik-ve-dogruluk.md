# Metranik — Erişilebilirlik ve Hesap Doğruluğu Raporu

Tarih: 2026-10-29 · Kapsam: renk kontrastı, modüllerin formül/kaynak dayanağı, test kanıtının gücü.

## 1. Renk erişilebilirliği

**Bulgu:** Ekran görüntüsündeki sorun gerçekti ve 4 ayrı kök nedene dayanıyordu.

| # | Sorun | Etki |
|---|---|---|
| 1 | `surface-secondary`, `accent-fg`, `border-strong` tailwind'de **sabit açık renk** olarak tanımlıydı; koyu modda değişmiyordu | Koyu modda üst menü açık gri zemin + açık gri yazı oldu (menü bağlantıları okunmuyordu) |
| 2 | `text-tertiary` açıkta 2,4:1, koyuda 3,1:1; 37 yerde kullanılıyor | WCAG AA (4,5:1) altında |
| 3 | `Badge primary` koyu modda `accent-900` (çok koyu) yazı, koyu mavi zemin | "Beta sürümü · Tamamen ücretsiz" rozeti okunmuyordu |
| 4 | Durum renkleri (`success/warning/danger`) ve `accent` metin olarak açık modda 2,9–4,1:1, koyuda `accent` 3,6:1 | AA altında |

**Yapılan düzeltme:** `globals.css`'te tüm bu renkler açık/koyu için ayrı token oldu (`surface-secondary`,
`surface-tertiary`, `border-strong`, `accent-fg`, yeni `accent-text`, durum renkleri ve `-light` zeminleri);
`tailwind.config.ts` bu değişkenlere bağlandı; metin olarak kullanılan `text-accent` / `text-accent-hover`
`text-accent-text` yapıldı.

**Doğrulama (hesapla):** OKLCH → sRGB → WCAG oranı. Kullanılan 21 metin/zemin çiftinin **tamamı hem açık hem koyu
modda ≥ 4,5:1** (en düşük: açıkta üçüncül metin / surface-secondary 4,89; vurgu / accent-subtle 4,65).
**Doğrulanmayan:** tarayıcıda görsel kontrol yapmadım (ekran görüntüsü alma aracım yok); derleme sonucu aşağıda.
Büyük/dekoratif metin, odak halkası ve `placeholder` renkleri ayrıca denetlenmedi.

## 2. Modüller nereden geldi?

- **Katalog (hangi modüllerin olacağı):** projenik.com'un menüsü (WebFetch ile) ve sizin paylaştığınız ekran
  görüntüsü. Kapsam kararı sizindi (CLAUDE.md §1). Formüller o siteden **alınmadı**; site client-side render
  olduğu için zaten çoğu zaman yalnızca başlık dönüyordu.
- **Formüller:** benim (Claude) mühendislik bilgimden; ders kitabı/standart yöntemleri hatırlanarak yazıldı.
  **Standart metinlerine, kitaplara veya tablolara erişimim yok**; hiçbirini bu oturumda kaynağından açıp
  karşılaştırmadım. Standart metni kopyalanmadı (CLAUDE.md §6), yalnız madde/yöntem atfı var.
- **Tablo değerleri** (ör. TBDY FS/F1 tabloları, EN 338 dayanımları, IEC 60034-1 sıcaklık artışları, NEC doluluk
  oranları): hafızadan veya bulunabilen kamuya açık metinden; bu modüllerin sayfalarına "yerel baskıdan teyit
  edin" notu konuldu (300 sayfadan 27'sinde açık "teyit" ifadesi var — alt sınır, diğer ifadeler de olabilir).

## 3. Hesaplar doğru mu? (dürüst değerlendirme)

**Kesin olarak söyleyebileceklerim**
- 586 + 4 test geçiyor; testler formülün **kodda doğru uygulandığını** ve fiziksel sınır durumlarını
  (ε = 1, dengeli yük → 0 vb.) doğruluyor.
- En az **12 modülün testi yayımlanmış bir çözümlü örneği veya bağımsız bir formülü** yeniden üretiyor
  (IEEE 80 Ek B, Çengel örnekleri 11-1/11-2/14-8, ISO 7730 Ek D, NWS tabloları, NFPA 13 ABD-birim çapraz
  kontrolü, ASHRAE havuz formülü vb.). Otomatik tarama anahtar kelime aradığı için bu sayı alt sınırdır.

**Kanıtlanmamış olanlar (risk)**
- Kalan ~290 modülün testi **benim elle yaptığım hesaba** dayanıyor: formül yanlış hatırlanmışsa test de aynı
  hatayı taşır. Yani "test yeşil" = "kod, benim formülümü doğru uyguluyor"; "formül standartla bire bir aynı"
  demek değildir.
- ~150 modülde `standards: []` var (fizik/enerji-kütle dengesi gibi standardı olmayan ilişkiler veya atıf
  doğrulanamadığı için kaldırılanlar). Bunlar fiziksel olarak savunulabilir ama bir standarda bağlı değil.
- Önceki oturumlarda hatalar oldu ve kayıt altında: 96 stub modül "tamamlandı" diye raporlandı (sonradan
  silindi); birim hatası (1000×), ters mantık (buhar vakumu), uydurma eşikler (ör. "menteşe basıncı") bulunup
  düzeltildi/silindi (CLAUDE.md §5aw, §5ax). Benzer hataların başka modüllerde kalması mümkün.
- Sonuç ekranlarında "Ön boyutlandırmadır; nihai karar mühendis kontrolü gerektirir" uyarısı var; bu proje
  **imza/ruhsat düzeyi hesap için kullanılmamalı**.

## 4. Önerilen sonraki adımlar (öncelik sırasıyla)

1. **Bağımsız doğrulama:** Sizin ya da bir meslektaşınızın seçeceği ~20 kritik modülü (ör. ısıtma yükü, kablo kesiti,
   kısa devre, sprinkler, deprem taban kesme, kolon/kiriş) standart metni veya ticari yazılımla karşılaştırması.
   Bu en değerli adım; ben yapamam çünkü kaynağa erişimim yok.
2. **Modül başına "kaynak durumu" etiketi:** `verified` (yayımlanmış örnekle çakışıyor) / `derived` (formül
   doğru, tablo teyit edilmeli) / `physics` (standardı yok) — sayfada görünür olsun.
3. **Erişilebilirlik otomasyonu:** kontrast kontrolünü CI'a (axe/pa11y) eklemek; mevcut denetim elle yapıldı.
4. **Yeni modül hızını yavaşlatmak:** hedef sayıdan çok doğrulama borcunu kapatmak daha değerli.

## 5. Ek (2026-10-29, aynı gün): tasarım dili referans siteye çekildi

Kullanıcı talebiyle site, referansın (projenik.com) koyu terracotta paleti ve Sora / JetBrains Mono / Georgia
tipografisine geçirildi; logo, ad, metin ve istatistikler orijinal. Yukarıdaki 1. bölümdeki açık/koyu çift tema
kaldırıldı, **tek koyu tema** var (DESIGN.md). Erişilebilirlik için iki değer referanstan bilinçli ayrıldı:
üçüncül metin `#7e7264` (4,2:1) → `#968a7a` (5,8:1); düğme dolgusu `#c65a33` (beyazla 4,28:1) → `#b8502b` (4,98:1).
Yazı tipleri `apps/web/public/fonts` altında yerel (derlemede dış ağ yok). `next build` temiz (305 sayfa).
Hero'daki "100% test yeşil / 0 kara kutu" iddiaları, bu raporun 3. bölümündeki bulgular nedeniyle kaldırıldı.

## 6. Ek (2026-10-29, akşam): son görsel yön "Teknik Çizim"

Terracotta tema, kullanıcının seçtiği "Teknik Çizim" (mavi kopya) yönüyle değiştirildi (DESIGN.md). Hesaplanan en düşük
metin/zemin kontrastı **4,99:1** (üçüncül metin / surface-tertiary); diğer çiftler 5,7–14,8:1; sarı düğme + lacivert yazı 10,9:1.
Tarayıcıda gözle kontrol yapılmadı. Bekleyen 5 modül (VFD, nötr akımı, kayma güvenliği, güneş kazancı, rakım yoğunluğu)
kullanıcı "bitir" dediği için kataloğa alındı; 3. bölümdeki doğrulama uyarısı bunlar için de geçerlidir (testler el hesabı).
