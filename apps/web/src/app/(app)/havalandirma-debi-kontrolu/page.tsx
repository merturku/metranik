"use client";

import { havalandirmaDebiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavalandirmaDebiKontroluPage() {
  return (
    <CalcPage
      module={havalandirmaDebiKontrolu}
      standardsLabel="Saha Ölçümü"
      description="Saha ölçüm kontrolü: ölçülen debi, tasarımda hesaplanan gerekli debiyi karşılamalı. Gerekli debi Taze Hava Debisi gibi bir tasarım modülünden gelir."
      formula="Marj = Völçülen − Vgerekli"
      fields={[
        { key: "olculenDebi_L_s", label: "Ölçülen Debi (L/s)", type: "number", min: 0.1, step: 1 },
        { key: "gerekliDebi_L_s", label: "Gerekli Debi (L/s)", type: "number", min: 0.1, step: 1 },
      ]}
      defaults={{ olculenDebi_L_s: 45, gerekliDebi_L_s: 40 }}
      mainUnit="L/s"
      mainValueKey="marj_L_s"
      intermediateLabels={{
        olculenDebi_L_s: "Ölçülen Debi (L/s)",
        gerekliDebi_L_s: "Gerekli Debi (L/s)",
      }}
    />
  );
}
