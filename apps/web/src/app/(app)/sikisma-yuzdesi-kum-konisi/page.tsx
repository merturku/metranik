"use client";

import { sikismaYuzdesiKumKonisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SikismaYuzdesiKumKonisiPage() {
  return (
    <CalcPage
      module={sikismaYuzdesiKumKonisi}
      standardsLabel="TS 1900-2 · ASTM D698/D1557"
      description="Sahada ölçülen yaş birim ağırlık ve su içeriğinden kuru birim ağırlığı bulur, Proctor maksimum kuru birim ağırlığına göre bağıl sıkışmayı değerlendirir."
      formula="γd = γ_yaş/(1 + w);  RC = γd,saha/γd,maks × 100"
      engineeringNote="Maksimum kuru birim ağırlık ve optimum su içeriği laboratuvar Proctor deneyinden (standart/modifiye) alınır. Kabul ölçütü projeye/şartnameye göre girilir (yol/dolguda tipik ≥ %95). Su içeriği optimumdan ±%2'den fazla saparsa düzeltme önerilir."
      fields={[
        { key: "sahaYasBirimAgirlik_kNm3", label: "Saha Yaş Birim Ağırlık (kN/m³)", type: "number", step: 0.1, min: 1 },
        { key: "sahaSuIcerigi_yuzde", label: "Saha Su İçeriği w (%)", type: "number", step: 0.5, min: 0 },
        { key: "maksKuruBirimAgirlik_kNm3", label: "Maks. Kuru Birim Ağırlık (kN/m³)", type: "number", step: 0.1, min: 1 },
        { key: "optimumSuIcerigi_yuzde", label: "Optimum Su İçeriği wopt (%)", type: "number", step: 0.5, min: 0 },
        { key: "gerekliSikisma_yuzde", label: "Gerekli Sıkışma (%)", type: "number", step: 1, min: 80 },
      ]}
      defaults={{ sahaYasBirimAgirlik_kNm3: 19.5, sahaSuIcerigi_yuzde: 10, maksKuruBirimAgirlik_kNm3: 18.6, optimumSuIcerigi_yuzde: 11, gerekliSikisma_yuzde: 95 }}
      mainUnit="%"
      mainValueKey="sikisma_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        saha_kuru_birim_agirlik_kNm3: "Saha Kuru Birim Ağırlık (kN/m³)",
        su_icerigi_sapmasi_wopt_yuzde: "w − wopt (%)",
        su_icerigi_uyarisi: "Su İçeriği Değerlendirmesi",
        gerekli_kuru_birim_agirlik_kNm3: "Gerekli Kuru Birim Ağırlık (kN/m³)",
      }}
    />
  );
}
