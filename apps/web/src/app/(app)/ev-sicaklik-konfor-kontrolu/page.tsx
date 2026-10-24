"use client";
import { CalcPage } from "@/components/calc-page";
import { evSicaklikKonforKontrolu } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={evSicaklikKonforKontrolu}
      standardsLabel="ISO 7730:2005"
      description="Oda havası, ışınım sıcaklığı, hava hızı, nem, aktivite ve giysiden Fanger'in PMV (beklenen ortalama oy) ve PPD (memnun olmayanların yüzdesi) değerlerini hesaplar, ISO 7730 konfor kategorisini kontrol eder."
      formula="PMV = [0,303·e^(−0,036·M) + 0,028]·(M − W − kayıplar), PPD = 100 − 95·e^(−0,03353·PMV⁴ − 0,2179·PMV²)"
      engineeringNote="Oturarak dinlenme ~1,0 met, ev içi hafif iş 1,2–1,6 met; yazlık giysi ~0,5 clo, kışlık ev giysisi ~1,0 clo. Ortalama ışınım sıcaklığı bilinmiyorsa iyi yalıtımlı odalarda hava sıcaklığına eşit alınabilir; soğuk pencere/duvar yüzeyleri onu düşürür. Kategori B için |PMV| ≤ 0,5 (PPD ≤ %10)."
      fields={[
        { key: "hava_sicakligi_C", label: "Hava Sıcaklığı (°C)", type: "number", min: 10, step: 0.5 },
        { key: "ortalama_isinim_sicakligi_C", label: "Ortalama Işınım Sıcaklığı (°C)", type: "number", min: 10, step: 0.5 },
        { key: "hava_hizi_ms", label: "Hava Hızı (m/s)", type: "number", min: 0, step: 0.05 },
        { key: "bagil_nem_yuzde", label: "Bağıl Nem (%)", type: "number", min: 0, step: 5 },
        { key: "metabolizma_met", label: "Aktivite (met)", type: "number", min: 0.8, step: 0.1 },
        { key: "giysi_clo", label: "Giysi (clo)", type: "number", min: 0, step: 0.1 },
      ]}
      defaults={{
        hava_sicakligi_C: 22,
        ortalama_isinim_sicakligi_C: 22,
        hava_hizi_ms: 0.1,
        bagil_nem_yuzde: 50,
        metabolizma_met: 1.2,
        giysi_clo: 1.0,
      }}
      mainUnit="PMV"
      mainValueKey="pmv"
      mainDecimals={2}
      intermediateLabels={{
        giysi_yuzey_sicakligi_C: "Giysi Yüzey Sıcaklığı (°C)",
        buhar_basinci_Pa: "Su Buharı Kısmi Basıncı (Pa)",
        tasinim_katsayisi_Wm2K: "Taşınım Katsayısı (W/m²K)",
      }}
    />
  );
}
