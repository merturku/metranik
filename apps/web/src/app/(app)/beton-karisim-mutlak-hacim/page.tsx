"use client";

import { betonKarisimMutlakHacim } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonKarisimMutlakHacimPage() {
  return (
    <CalcPage
      module={betonKarisimMutlakHacim}
      standardsLabel="ACI 211.1 — mutlak hacim yöntemi"
      description="Çimento, su ve hava miktarından 1 m³ beton için gereken agrega kütlesini hesaplar."
      formula="Vagrega = 1 − mc/ρc − mw/ρw − hava;   magrega = Vagrega·ρa"
      engineeringNote="Agrega yoğunluğu kuru yüzey doygun (SSD) bağıl yoğunluğudur; agrega nemine göre karışım suyu düzeltmesi ayrıca yapılmalıdır. Deneme karışımıyla doğrulayın. Su/çimento oranı dayanım ve dayanıklılık için Beton Su/Çimento Oranı modülüyle seçilir."
      fields={[
        { key: "cimento_kg", label: "Çimento (kg/m³)", type: "number", step: 10, min: 1 },
        { key: "su_kg", label: "Su (kg/m³)", type: "number", step: 5, min: 1 },
        { key: "cimentoYogunlugu", label: "Çimento Bağıl Yoğunluğu", type: "number", step: 0.01, min: 2 },
        { key: "agregaYogunlugu", label: "Agrega Bağıl Yoğunluğu (SSD)", type: "number", step: 0.01, min: 2 },
        { key: "havaYuzdesi", label: "Hava Boşluğu (%)", type: "number", step: 0.5, min: 0 },
      ]}
      defaults={{ cimento_kg: 350, su_kg: 175, cimentoYogunlugu: 3.15, agregaYogunlugu: 2.65, havaYuzdesi: 2 }}
      mainUnit="kg/m³ agrega"
      mainValueKey="agrega_kg"
      mainDecimals={0}
      intermediateLabels={{
        cimento_hacmi_m3: "Çimento Hacmi (m³)",
        su_hacmi_m3: "Su Hacmi (m³)",
        hava_hacmi_m3: "Hava Hacmi (m³)",
        agrega_hacmi_m3: "Agrega Hacmi (m³)",
        birim_agirlik_kgm3: "Birim Ağırlık (kg/m³)",
        su_cimento_orani: "Su/Çimento",
      }}
    />
  );
}
