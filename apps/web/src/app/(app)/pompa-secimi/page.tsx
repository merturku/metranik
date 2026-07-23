"use client";

import { pompaSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaSecimiPage() {
  return (
    <CalcPage
      module={pompaSecimi}
      standardsLabel="Fiziksel Sabitler"
      description="Basınç kaybını pompa basma yüksekliğine çevirir; debiyle birlikte çalışma noktasını verir."
      fields={[
        { key: "debi_m3h", label: "Debi (m³/h)", type: "number", min: 0.1, step: 0.1 },
        {
          key: "basincKaybi_Pa",
          label: "Toplam Basınç Kaybı (Pa)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ debi_m3h: 36, basincKaybi_Pa: 98100 }}
      mainUnit="m SS"
      mainValueKey="basmaYuksekligi_m"
      intermediateLabels={{ yogunluk_kg_m3: "Yoğunluk (kg/m³)", yercekimi_m_s2: "Yerçekimi (m/s²)" }}
    />
  );
}
