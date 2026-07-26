"use client";

import { menfezDifuzorDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MenfezDifuzorDebisiPage() {
  return (
    <CalcPage
      module={menfezDifuzorDebisi}
      standardsLabel="Fiziksel Formül"
      description="Menfez/difüzör alanına, debi katsayısına ve basınç farkına göre geçen hava debisini hesaplar."
      formula="Q = Cd × A × √(2ΔP/ρ)"
      engineeringNote="Debi katsayısı (Cd) menfez/difüzör geometrisine göre değişir, tipik değer 0.6-0.7 arasındadır; üretici verisi varsa onun kullanılması önerilir."
      fields={[
        { key: "menfezAlani_A_m2", label: "Menfez Alanı A (m²)", type: "number", min: 0.01, step: 0.01 },
        {
          key: "debiKatsayisi_Cd",
          label: "Debi Katsayısı Cd",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
        { key: "basincFarki_dP_Pa", label: "Basınç Farkı ΔP (Pa)", type: "number", min: 1, step: 1 },
      ]}
      defaults={{ menfezAlani_A_m2: 0.1, debiKatsayisi_Cd: 0.65, basincFarki_dP_Pa: 20 }}
      mainUnit="m³/h"
      mainValueKey="debi_m3h"
      intermediateLabels={{
        terminalHiz_ms: "Terminal Hız (m/s)",
        havaYogunlugu_kg_m3: "Hava Yoğunluğu (kg/m³)",
      }}
    />
  );
}
