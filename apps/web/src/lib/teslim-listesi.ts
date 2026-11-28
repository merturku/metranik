export interface TeslimGrup {
  baslik: string;
  maddeler: string[];
}

// Genel saha kontrol maddeleri; yasal/standart değer içermez, gözle ve basit
// aletle (metre, su terazisi, priz test cihazı) yapılabilecek kontrollerdir.
export const TESLIM_LISTESI: TeslimGrup[] = [
  {
    baslik: "Belgeler ve genel",
    maddeler: [
      "İskân (yapı kullanma izin belgesi) alınmış mı?",
      "Tapu, proje ve mimari plan ile daire ölçüleri/oda dağılımı uyuşuyor mu?",
      "Anahtar, kumanda, kapı kartı ve garanti belgeleri teslim edildi mi?",
      "Sayaç numaraları (elektrik, su, doğalgaz) not edildi, endeks değerleri fotoğraflandı mı?",
    ],
  },
  {
    baslik: "Duvar, tavan ve zemin",
    maddeler: [
      "Sıva ve boyada çatlak, kabarma, leke, renk farkı var mı?",
      "Duvar köşeleri ve zeminde su terazisiyle belirgin eğim/dalgalanma var mı?",
      "Fayans ve seramiklerde kırık, çatlak, boşluk (tıklatınca oynak/boş ses) var mı?",
      "Fayans derzleri düzgün ve eksiksiz mi?",
      "Parke/laminatta kabarma, ayrılma, basınca gıcırtı var mı?",
      "Süpürgelik ve profillerde boşluk veya hasar var mı?",
    ],
  },
  {
    baslik: "Kapı ve pencereler",
    maddeler: [
      "Tüm kapılar ve pencereler sürtmeden açılıp kapanıyor mu, kilitler çalışıyor mu?",
      "Pencere ve kapı çevresinde conta eksikliği, hava kaçağı veya sızıntı izi var mı?",
      "Camlarda çizik, kırık, buğulanma (çift cam arası) var mı?",
      "Panjur/jaluzi sistemleri tam açılıp kapanıyor mu?",
      "Giriş (çelik) kapısının kilidi, dürbünü ve zili çalışıyor mu?",
    ],
  },
  {
    baslik: "Elektrik",
    maddeler: [
      "Tüm prizler priz test cihazıyla denendi mi (toprak hattı, ters bağlantı)?",
      "Her anahtar ve armatür çalışıyor mu?",
      "Sigorta panosunda devreler etiketli mi, kaçak akım rölesi test düğmesiyle atıyor mu?",
      "Zil, diafon/görüntülü diafon, kapı otomatiği çalışıyor mu?",
      "Anten/uydu, internet ve telefon prizlerinde sinyal var mı?",
    ],
  },
  {
    baslik: "Sıhhi tesisat",
    maddeler: [
      "Tüm musluk ve bataryalarda sıcak/soğuk su geliyor mu, basınç yeterli mi?",
      "Borular, bağlantılar ve sifonlarda damlama veya sızıntı izi var mı?",
      "Lavabo, klozet, duş teknesi giderleri su boşaltıyor mu, gider koku yapıyor mu?",
      "Duş ve banyo zemininde giderlere doğru eğim var mı (su göllenmesi)?",
      "Klozet rezervuarı su kaçırmadan dolup boşalıyor mu?",
    ],
  },
  {
    baslik: "Isıtma, doğalgaz ve havalandırma",
    maddeler: [
      "Kombi çalıştırıldı mı; radyatörlerin tamamı eşit ısınıyor mu, havası alındı mı?",
      "Doğalgaz tesisatı ve sayaç bağlantıları yetkili kuruluşça onaylı mı, koku/kaçak var mı?",
      "Banyo ve mutfak aspiratörleri/havalandırma menfezleri çekiş yapıyor mu?",
      "Klima/split cihaz tesisat hazırlığı (drenaj, bakır boru, elektrik) var mı?",
    ],
  },
  {
    baslik: "Mutfak, banyo ve balkon",
    maddeler: [
      "Mutfak dolapları, çekmeceler ve menteşeler düzgün çalışıyor mu?",
      "Tezgâh ve evye birleşimi sızdırmaz mı, silikonlar düzgün mü?",
      "Banyo armatürleri ve aksesuarları sağlam monte edilmiş mi?",
      "Balkon zemininde su gideri yönüne eğim var mı, korkuluklar sağlam mı?",
      "Çatı/teras/balkonda su yalıtımı izi: tavan veya duvarda nem lekesi var mı?",
    ],
  },
];
