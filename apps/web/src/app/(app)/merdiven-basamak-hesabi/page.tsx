"use client";

import { merdivenBasamakHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MerdivenBasamakHesabiPage() {
  return (
    <CalcPage
      module={merdivenBasamakHesabi}
      standardsLabel="Blondel Formülü"
      description="Rıht yüksekliği ve basamak genişliğinin Blondel ergonomi kuralına (60-65 cm) uygunluğunu kontrol eder."
      formula="2 × Rıht + Genişlik = 60–65 cm (Blondel)"
      engineeringNote="Blondel kuralı ergonomik bir yaklaşımdır; yönetmeliklerde ayrıca asgari/azami rıht ve basamak genişliği sınırları da ayrıca aranabilir."
      fields={[
        { key: "rihtYuksekligi_cm", label: "Rıht Yüksekliği (cm)", type: "number", min: 1, step: 0.5 },
        {
          key: "basamakGenisligi_cm",
          label: "Basamak Genişliği (cm)",
          type: "number",
          min: 1,
          step: 0.5,
        },
      ]}
      defaults={{ rihtYuksekligi_cm: 17, basamakGenisligi_cm: 29 }}
      mainUnit="cm"
      mainValueKey="blondelDegeri_cm"
      intermediateLabels={{
        kabulAraligi_min_cm: "Kabul Aralığı Alt Sınır (cm)",
        kabulAraligi_max_cm: "Kabul Aralığı Üst Sınır (cm)",
      }}
    />
  );
}
