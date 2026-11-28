// Hesap rehberleri: her rehber bir modüle bağlanır; çözümlü örnek sayısı metne
// elle YAZILMAZ, sayfa oluşturulurken hesap motoru çalıştırılarak üretilir.
export interface Rehber {
  slug: string;
  baslik: string;
  ozet: string;
  modulId: string;
  ornekGirdi: Record<string, string | number>;
  girdiEtiketleri: Record<string, string>;
  sonucAnahtari: string;
  sonucEtiketi: string;
  birim: string;
  ondalik: number;
  formul: string;
  bolumler: { baslik: string; metin: string }[];
  dikkat: string[];
}

export const REHBERLER: Rehber[] = [
  {
    slug: "kablo-kesiti-nasil-hesaplanir",
    baslik: "Kablo Kesiti Nasıl Hesaplanır? (Gerilim Düşümü Yöntemi)",
    ozet: "Akım, hat uzunluğu ve izin verilen gerilim düşümünden gereken minimum bakır kablo kesitini bulma.",
    modulId: "kablo-kesiti-iec60364",
    ornekGirdi: { akim_A: 32, uzunluk_m: 50, izinliGerilimDusumu_V: 11.5, faz: "tek" },
    girdiEtiketleri: { akim_A: "Akım (A)", uzunluk_m: "Hat uzunluğu (m)", izinliGerilimDusumu_V: "İzin verilen gerilim düşümü (V)", faz: "Faz sayısı" },
    sonucAnahtari: "kesit_mm2",
    sonucEtiketi: "Gereken minimum kesit",
    birim: "mm²",
    ondalik: 2,
    formul: "S = k · ρ · L · I / ΔU   (tek faz k = 2, üç faz k = √3, bakır ρ ≈ 0,0175 Ω·mm²/m)",
    bolumler: [
      { baslik: "Neden gerilim düşümü?", metin: "Uzun hatlarda kablo direnci yüzünden yükün ucundaki gerilim kaynak gerilimine göre düşer. Cihazlar bu düşüm belirli bir sınırı aşınca verimsiz çalışır ya da devreye girmez. Bu yüzden kesit, hem akım taşıma kapasitesine hem de gerilim düşümüne göre kontrol edilir; ikisinden büyük çıkan kesit seçilir." },
      { baslik: "Hesabın adımları", metin: "Önce yükün hat akımı bulunur. Sonra izin verilen gerilim düşümü volt cinsinden belirlenir (örneğin 230 V'ta %5 = 11,5 V). Formüldeki k katsayısı gidiş-dönüş iletkeni yüzünden tek fazda 2, dengeli üç fazda √3 alınır. Çıkan değer, bir üst standart kesite (IEC 60228 serisi: 1,5; 2,5; 4; 6; 10; 16 … mm²) yuvarlanır." },
    ],
    dikkat: [
      "Bu modül yalnız gerilim düşümüne göre minimum kesiti verir; akım taşıma kapasitesi (döşeme tipi, ortam sıcaklığı, gruplama) ayrıca kontrol edilmelidir.",
      "Güç faktörü ve kablo reaktansı ihmal edilir; büyük kesitlerde ve uzun hatlarda sonuç iyimser kalabilir.",
    ],
  },
  {
    slug: "klima-btu-nasil-hesaplanir",
    baslik: "Klima BTU Kapasitesi Nasıl Seçilir?",
    ozet: "Oda alanı ve kişi sayısından yaklaşık klima kapasitesini BTU ve ton olarak bulma.",
    modulId: "klima-kapasite-secimi",
    ornekGirdi: { alan_m2: 25, katsayi_BTU_m2: 600, ekKisiSayisi: 1 },
    girdiEtiketleri: { alan_m2: "Oda alanı (m²)", katsayi_BTU_m2: "Birim kapasite katsayısı (BTU/m²)", ekKisiSayisi: "Ek kişi sayısı" },
    sonucAnahtari: "gerekliKapasite_BTU",
    sonucEtiketi: "Gerekli klima kapasitesi",
    birim: "BTU/h",
    ondalik: 0,
    formul: "Q = Alan × Katsayı(BTU/m²) + Ek kişi × kişi başı ek yük",
    bolumler: [
      { baslik: "Sektör pratiği", metin: "Konut klimalarında alan başına yaklaşık BTU katsayısı kullanılır; katsayı cephe yönüne, yalıtıma, cam oranına ve kat durumuna göre değişir. Bu bir sektör kuralıdır, standart değildir; ayrıntılı bir soğutma yükü hesabının yerini tutmaz." },
      { baslik: "BTU ve ton", metin: "1 ton soğutma 12 000 BTU/h'e eşittir. Piyasadaki split klimalar 9 000, 12 000, 18 000, 24 000 BTU/h gibi kademelerde satılır; hesaplanan değere eşit ya da bir üst kademe seçilir." },
    ],
    dikkat: [
      "Katsayı kullanıcı girdisidir; güneş alan cepheli, çatı katı veya yüksek tavanlı mekânlarda daha yüksek değer gerekir.",
      "Ticari ve kritik mekânlar için bina soğutma yükü modülü (TS 825 / ASHRAE yaklaşımı) kullanılmalıdır.",
    ],
  },
  {
    slug: "elektrikli-arac-sarj-suresi-hesabi",
    baslik: "Elektrikli Araç Şarj Süresi Nasıl Hesaplanır?",
    ozet: "Batarya kapasitesi, mevcut şarj oranı ve şarj gücünden tahmini şarj süresi.",
    modulId: "elektrikli-arac-sarj-suresi",
    ornekGirdi: { bataryaKapasitesi_kWh: 60, mevcutSarjOrani: 0.2, sarjGucu_P_kW: 7.4, sarjVerimi_eta: 0.9 },
    girdiEtiketleri: { bataryaKapasitesi_kWh: "Batarya kapasitesi (kWh)", mevcutSarjOrani: "Mevcut şarj oranı (0–1)", sarjGucu_P_kW: "Şarj gücü (kW)", sarjVerimi_eta: "Şarj verimi (0–1)" },
    sonucAnahtari: "sarjSuresi_saat",
    sonucEtiketi: "Tahmini şarj süresi",
    birim: "saat",
    ondalik: 2,
    formul: "t = Kapasite × (1 − mevcut şarj oranı) / (Şarj gücü × verim)",
    bolumler: [
      { baslik: "Mantık", metin: "Doldurulacak enerji, batarya kapasitesinin boş kalan kısmıdır. Bu enerji, şarj cihazının gücü ve dönüşüm verimiyle bölünerek süre bulunur. Evsel AC şarjda 3,7 / 7,4 / 11 kW sık görülen güçlerdir." },
    ],
    dikkat: [
      "Gerçekte şarj gücü batarya doluluğuna ve sıcaklığa göre %80 civarından sonra düşer; hesap sabit güç varsayar, bu yüzden son %20'lik dilim için süre kısa kalır.",
      "Aracın kabul edebildiği azami AC/DC şarj gücü, cihaz gücünden düşükse küçük olan değer girilmelidir.",
    ],
  },
  {
    slug: "ges-kac-kwp-gerekir",
    baslik: "Güneş Paneli (GES) Kaç kWp Olmalı?",
    ozet: "Günlük elektrik tüketimi ve güneşlenme süresinden gereken kurulu güç.",
    modulId: "gunes-paneli-kapasite-hesabi",
    ornekGirdi: { gunlukTuketim_kWh: 10, guneslenmeSaati_h: 5, sistemVerimi: 0.75 },
    girdiEtiketleri: { gunlukTuketim_kWh: "Günlük tüketim (kWh)", guneslenmeSaati_h: "Eşdeğer tam güneşlenme (saat/gün)", sistemVerimi: "Sistem verimi (0–1)" },
    sonucAnahtari: "gerekliGuc_kWp",
    sonucEtiketi: "Gereken kurulu güç",
    birim: "kWp",
    ondalik: 2,
    formul: "P = Günlük tüketim / (Güneşlenme saati × Sistem verimi)",
    bolumler: [
      { baslik: "Girdiler nereden alınır?", metin: "Günlük tüketim fatura/sayaç verisinden bulunur. Eşdeğer tam güneşlenme saati, bölgenin yıllık ortalama ışınımıdır (kWh/m²/gün, yaklaşık saat değerine eşittir); yer ve eğime göre değişir. Sistem verimi invertör, kablo, sıcaklık ve kirlenme kayıplarını toplu olarak içerir (ör. 0,75–0,85)." },
      { baslik: "Sonra ne yapılır?", metin: "Bulunan kWp değeri panel gücüne bölünerek panel adedine çevrilir. Üretimi ve geri ödemeyi görmek için aynı sitedeki yıllık üretim ve geri ödeme süresi modülleri kullanılabilir." },
    ],
    dikkat: [
      "Sonuç yıllık ortalamaya göredir; kışın üretim belirgin düşer.",
      "Şebeke bağlantısı ve izinler (lisanssız üretim limitleri) için yerel mevzuat geçerlidir.",
    ],
  },
  {
    slug: "boya-miktari-nasil-hesaplanir",
    baslik: "Boya Miktarı Nasıl Hesaplanır?",
    ozet: "Boyanacak alan, kat sayısı ve boyanın verimliliğinden gereken litre.",
    modulId: "boya-miktari-hesabi",
    ornekGirdi: { alan_m2: 80, katSayisi: 2, boyaVerimi_m2L: 10 },
    girdiEtiketleri: { alan_m2: "Boyanacak alan (m²)", katSayisi: "Kat sayısı", boyaVerimi_m2L: "Boya verimi (m²/L, tek kat)" },
    sonucAnahtari: "gerekliBoya_L",
    sonucEtiketi: "Gereken boya",
    birim: "L",
    ondalik: 1,
    formul: "V = Alan × Kat sayısı / Verim",
    bolumler: [
      { baslik: "Alan nasıl bulunur?", metin: "Duvar alanı = çevre uzunluğu × yükseklik; kapı ve pencere alanları düşülür. Tavan boyanacaksa tavan alanı eklenir. Verim (m²/L) boyanın ambalajında yazar; pürüzlü ve emici yüzeylerde ambalajdaki değerin altına düşer." },
    ],
    dikkat: [
      "Astar ve ilk kat boya ayrı kalemler olarak hesaplanmalıdır.",
      "Fire ve silme/kenar payı için sonucu %5–10 artırmak yaygın uygulamadır; modülde otomatik fire yoktur.",
    ],
  },
  {
    slug: "merdiven-basamak-sayisi-hesabi",
    baslik: "Merdiven Basamak Sayısı ve Rıht Yüksekliği Nasıl Bulunur?",
    ozet: "Kat yüksekliği ve hedef rıht yüksekliğinden basamak sayısı ve gerçek rıht.",
    modulId: "merdiven-basamak-sayisi",
    ornekGirdi: { katYuksekligi_cm: 280, rihtYuksekligi_cm: 17 },
    girdiEtiketleri: { katYuksekligi_cm: "Kat yüksekliği (cm)", rihtYuksekligi_cm: "Hedef rıht yüksekliği (cm)" },
    sonucAnahtari: "basamakSayisi",
    sonucEtiketi: "Basamak sayısı",
    birim: "adet",
    ondalik: 0,
    formul: "n = ⌈Kat yüksekliği / Hedef rıht⌉ ,  gerçek rıht = Kat yüksekliği / n",
    bolumler: [
      { baslik: "Mantık", metin: "Kat yüksekliği hedef rıhta bölünüp yukarı yuvarlanır; sonra kat yüksekliği bu adede bölünerek tüm basamaklarda eşit olan gerçek rıht bulunur. Basamak derinliği için Blondel formülü (2·rıht + basamak genişliği ≈ 60–64 cm) kullanılır; bunun için Merdiven Basamak Hesabı modülüne bakın." },
    ],
    dikkat: [
      "Konutlarda rıht genellikle 15–18 cm aralığında tasarlanır; yönetmelik sınırları için yürürlükteki bina yönetmeliğini kontrol edin.",
    ],
  },
];

export function rehberBul(slug: string): Rehber | undefined {
  return REHBERLER.find((r) => r.slug === slug);
}
