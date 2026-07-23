"use client";

import { kisaDevreAkimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KisaDevreAkimiPage() {
  return (
    <CalcPage
      module={kisaDevreAkimi}
      standardsLabel="Basitleştirilmiş Empedans Yöntemi"
      description="Transformatör gücü, gerilim ve empedans yüzdesine göre kısa devre akımını hesaplar."
      fields={[
        {
          key: "transformatorGucu_kVA",
          label: "Transformatör Gücü (kVA)",
          type: "number",
          min: 1,
          step: 1,
        },
        { key: "gerilim_V", label: "Gerilim (V, hat-hat)", type: "number", min: 1, step: 1 },
        {
          key: "empedansYuzdesi",
          label: "Empedans Yüzdesi (Z%)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{ transformatorGucu_kVA: 1000, gerilim_V: 400, empedansYuzdesi: 6 }}
      mainUnit="kA"
      mainValueKey="kisaDevreAkimi_kA"
      intermediateLabels={{ nominalAkim_A: "Nominal Akım (A)" }}
    />
  );
}
