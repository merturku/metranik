"use client";

import { vanaKvDegeri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function VanaKvDegeriPage() {
  return (
    <CalcPage
      module={vanaKvDegeri}
      standardsLabel="Fiziksel Formül"
      description="Debiye, akışkan özgül ağırlığına ve vana üzerindeki basınç farkına göre gerekli vana akış katsayısını (Kv) hesaplar."
      formula="Kv = Q × √(SG/ΔP)"
      engineeringNote="Kv, vana üreticilerinin kataloglarında verilen ve vana boyutunu belirleyen standart bir akış katsayısıdır; su için SG=1 alınır."
      fields={[
        { key: "debi_Q_m3h", label: "Debi Q (m³/h)", type: "number", min: 0.1, step: 0.5 },
        {
          key: "ozgulAgirlik_SG",
          label: "Özgül Ağırlık SG (suya göre)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "basincFarki_dP_bar",
          label: "Basınç Farkı ΔP (bar)",
          type: "number",
          min: 0.01,
          step: 0.05,
        },
      ]}
      defaults={{ debi_Q_m3h: 10, ozgulAgirlik_SG: 1, basincFarki_dP_bar: 0.5 }}
      mainUnit="Kv"
      mainValueKey="kv"
      intermediateLabels={{ ozgulAgirlik_SG: "Özgül Ağırlık (SG)" }}
    />
  );
}
