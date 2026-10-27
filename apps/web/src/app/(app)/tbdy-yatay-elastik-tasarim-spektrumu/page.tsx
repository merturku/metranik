"use client";

import { tbdyYatayElastikTasarimSpektrumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TbdyYatayElastikTasarimSpektrumuPage() {
  return (
    <CalcPage
      module={tbdyYatayElastikTasarimSpektrumu}
      standardsLabel="TBDY 2018 §2.3"
      description="AFAD Türkiye Deprem Tehlike Haritası'ndan alınan SS ve S1 harita spektral ivme katsayıları ile yerel zemin sınıfından tasarım spektral ivme katsayılarını (SDS, SD1), köşe periyotlarını ve verilen doğal titreşim periyodu için yatay elastik tasarım spektral ivmesini Sae(T) hesaplar."
      formula="SDS = SS·FS,   SD1 = S1·F1,   TA = 0,2·SD1/SDS,   TB = SD1/SDS,   TL = 6 s;   Sae(T) = (0,4 + 0,6T/TA)SDS | SDS | SD1/T | SD1·TL/T²"
      engineeringNote="SS ve S1, bina konumu ve deprem yer hareketi düzeyi (tasarımda genellikle DD-2, 50 yılda %10 aşılma) için AFAD haritasından (tdth.afad.gov.tr) okunur. FS ve F1 TBDY 2018 Tablo 2.1 ve 2.2'den alınır; ara değerlerde doğrusal enterpolasyon yapılır. ZF sınıfı zeminde (sıvılaşabilir, hassas kil, kalın organik kil vb.) tablo kullanılamaz, sahaya özel zemin davranış analizi gerekir. Bulunan Sae(T), Deprem Taban Kesme modülünün spektral ivme girdisidir; tasarım spektrumu SaR(T) = Sae(T)/Ra(T) ile taşıyıcı sistem davranış ve bina önem katsayıları uygulanarak elde edilir. Tablo değerlerini yürürlükteki yönetmelik metninden teyit edin."
      fields={[
        { key: "kisaPeriyotHaritaIvmesi_SS", label: "Kısa Periyot Harita Spektral İvmesi SS (g)", type: "number", min: 0.01, step: 0.01 },
        { key: "birSaniyeHaritaIvmesi_S1", label: "1,0 s Harita Spektral İvmesi S1 (g)", type: "number", min: 0.01, step: 0.01 },
        {
          key: "zeminSinifi",
          label: "Yerel Zemin Sınıfı",
          type: "select",
          options: [
            { value: "ZA", label: "ZA — Sağlam, sert kayalar (Vs30 > 1500 m/s)" },
            { value: "ZB", label: "ZB — Az ayrışmış, orta sağlam kayalar (760–1500 m/s)" },
            { value: "ZC", label: "ZC — Çok sıkı kum/çakıl, sert kil, ayrışmış kaya (360–760 m/s)" },
            { value: "ZD", label: "ZD — Orta sıkı–sıkı kum/çakıl, çok katı kil (180–360 m/s)" },
            { value: "ZE", label: "ZE — Gevşek kum/çakıl, yumuşak–katı kil (< 180 m/s)" },
          ],
        },
        { key: "dogalPeriyot_T_s", label: "Doğal Titreşim Periyodu T (s)", type: "number", min: 0, step: 0.05 },
      ]}
      defaults={{
        kisaPeriyotHaritaIvmesi_SS: 0.927,
        birSaniyeHaritaIvmesi_S1: 0.259,
        zeminSinifi: "ZC",
        dogalPeriyot_T_s: 0.5,
      }}
      mainUnit="g (Sae, yatay elastik spektral ivme)"
      mainValueKey="spektralIvme_Sae_g"
      mainDecimals={3}
      intermediateLabels={{
        yerel_zemin_katsayisi_FS: "Yerel Zemin Katsayısı FS",
        yerel_zemin_katsayisi_F1: "Yerel Zemin Katsayısı F1",
        kisa_periyot_tasarim_ivmesi_SDS: "Kısa Periyot Tasarım İvmesi SDS (g)",
        bir_saniye_tasarim_ivmesi_SD1: "1,0 s Tasarım İvmesi SD1 (g)",
        kose_periyodu_TA_s: "Köşe Periyodu TA (s)",
        kose_periyodu_TB_s: "Köşe Periyodu TB (s)",
        uzun_periyot_TL_s: "Uzun Periyot Geçişi TL (s)",
        spektrum_bolgesi: "Spektrum Bölgesi",
        spektral_ivme_m_s2: "Spektral İvme (m/s²)",
        spektral_yerdegistirme_Sde_m: "Spektral Yerdeğiştirme Sde (m)",
      }}
    />
  );
}
