"use client";

import { topraklamaDirenciTesti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TopraklamaDirenciTestiPage() {
  return (
    <CalcPage
      module={topraklamaDirenciTesti}
      standardsLabel="IEC 60364-4-41"
      description="TT sistemlerde dokunma gerilimi kriteri. Genel yerlerde Uo=50V, ıslak/özel yerlerde 25V kullanılır."
      formula="U = Ra × IΔn (Ra: ölçülen direnç, IΔn: RCD anma artık akımı)"
      fields={[
        { key: "olculenDirenc_ohm", label: "Ölçülen Direnç (Ω)", type: "number", min: 0.1, step: 1 },
        {
          key: "rcdAnmaAkimi_A",
          label: "RCD Anma Artık Akımı (A)",
          type: "number",
          min: 0.001,
          step: 0.01,
        },
        {
          key: "izinVerilenGerilim_V",
          label: "İzin Verilen Dokunma Gerilimi (V)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ olculenDirenc_ohm: 1000, rcdAnmaAkimi_A: 0.03, izinVerilenGerilim_V: 50 }}
      mainUnit="V"
      mainValueKey="dokunmaGerilimi_V"
      intermediateLabels={{
        olculenDirenc_ohm: "Ölçülen Direnç (Ω)",
        rcdAnmaAkimi_A: "RCD Anma Akımı (A)",
      }}
    />
  );
}
