"use client";

import { betonBasincDayanimiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonBasincDayanimiKontroluPage() {
  return (
    <CalcPage
      module={betonBasincDayanimiKontrolu}
      standardsLabel="TS 500 / TS EN 13791"
      description="Ölçülen (düzeltilmiş) karot basınç dayanımı, tasarım karakteristik dayanımını (f'ck) karşılamalı. Karot çap-boy oranı, delme yönü, nem durumu gibi düzeltme faktörleri bu modülde gömülü değildir — ölçülen değeri bu düzeltmeler uygulandıktan sonra girin."
      fields={[
        {
          key: "olculenDayanim_MPa",
          label: "Ölçülen (Düzeltilmiş) Dayanım (MPa)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
        {
          key: "karakteristikDayanim_fck_MPa",
          label: "Karakteristik Dayanım f'ck (MPa)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
      ]}
      defaults={{ olculenDayanim_MPa: 28, karakteristikDayanim_fck_MPa: 25 }}
      mainUnit="MPa"
      mainValueKey="marj_MPa"
      intermediateLabels={{
        olculenDayanim_MPa: "Ölçülen Dayanım (MPa)",
        karakteristikDayanim_fck_MPa: "f'ck (MPa)",
      }}
    />
  );
}
