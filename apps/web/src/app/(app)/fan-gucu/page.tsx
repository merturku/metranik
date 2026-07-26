"use client";

import { fanGucu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FanGucuPage() {
  return (
    <CalcPage
      module={fanGucu}
      standardsLabel="Fiziksel Formül"
      description="Hava debisine, sistem toplam basınç kaybına ve fan verimine göre gerekli fan mil gücünü hesaplar."
      formula="P = Q × ΔP / η"
      engineeringNote="ΔP, kanal + filtre + batarya + susturucu gibi tüm sistem elemanlarının toplam basınç kaybını içermelidir; η tipik olarak fan tipine göre 0.5-0.75 arasındadır."
      fields={[
        { key: "debi_Q_m3h", label: "Hava Debisi Q (m³/h)", type: "number", min: 1, step: 100 },
        {
          key: "basincKaybi_dP_Pa",
          label: "Toplam Basınç Kaybı ΔP (Pa)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "fanVerimi_eta",
          label: "Fan Verimi η (0-1)",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
      ]}
      defaults={{ debi_Q_m3h: 5000, basincKaybi_dP_Pa: 800, fanVerimi_eta: 0.65 }}
      mainUnit="kW"
      mainValueKey="guc_kW"
      intermediateLabels={{ debi_m3s: "Debi (m³/s)", fanVerimi_eta: "Fan Verimi (η)" }}
    />
  );
}
