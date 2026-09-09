"use client";

import { yuzeyYogusmaRiskiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YuzeyYogusmaRiskiKontroluPage() {
  return (
    <CalcPage
      module={yuzeyYogusmaRiskiKontrolu}
      standardsLabel="Çiy Noktası Karşılaştırması"
      description="Yüzey sıcaklığı ile çiy noktası sıcaklığı arasındaki farkı hesaplar ve bir güvenlik marjıyla karşılaştırarak yüzeyde yoğuşma (terleme) riskini kontrol eder."
      formula="ΔT = Tyüzey - Tçiy"
      engineeringNote="Psikrometrik Çiy Noktası Sıcaklığı modülünün ürettiği çiy noktasını girdi olarak kullanır. Yüzey sıcaklığı çiy noktasına çok yakın veya altındaysa yoğuşma oluşur (soğuk borular, klima santrali gövdesi, cam yüzeyler gibi uygulamalarda kritik)."
      fields={[
        {
          key: "yuzeySicakligi_Tyuzey_C",
          label: "Yüzey Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "ciyNoktasiSicakligi_Tciy_C",
          label: "Çiy Noktası Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "guvenlikMarji_C",
          label: "Güvenlik Marjı (°C)",
          type: "number",
          min: 0,
          step: 0.5,
        },
      ]}
      defaults={{
        yuzeySicakligi_Tyuzey_C: 18,
        ciyNoktasiSicakligi_Tciy_C: 14,
        guvenlikMarji_C: 1,
      }}
      mainUnit="°C"
      mainValueKey="sicaklikFarki_C"
      mainDecimals={1}
      intermediateLabels={{
        guvenlikMarji_C: "Güvenlik Marjı (°C)",
      }}
    />
  );
}
