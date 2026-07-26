"use client";

import { vavKutusuMinimumDebi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function VavKutusuMinimumDebiPage() {
  return (
    <CalcPage
      module={vavKutusuMinimumDebi}
      standardsLabel="Fiziksel Formül"
      description="Maksimum tasarım debisine ve minimum orana göre VAV kutusunun minimum çalışma debisini hesaplar."
      formula="Qmin = Qmax × Minimum Oran"
      engineeringNote="Minimum oran, taze hava/havalandırma gereksinimini karşılamak için genelde %20-40 arasında seçilir (ASHRAE 62.1 taze hava payı ile uyumlu olmalıdır)."
      fields={[
        {
          key: "maksimumDebi_Qmax_m3h",
          label: "Maksimum Debi Qmax (m³/h)",
          type: "number",
          min: 10,
          step: 10,
        },
        {
          key: "minimumOran",
          label: "Minimum Oran (0-1)",
          type: "number",
          min: 0.05,
          step: 0.05,
        },
      ]}
      defaults={{ maksimumDebi_Qmax_m3h: 1000, minimumOran: 0.3 }}
      mainUnit="m³/h"
      mainValueKey="minimumDebi_m3h"
      intermediateLabels={{ minimumOran: "Minimum Oran" }}
    />
  );
}
