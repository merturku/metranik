"use client";

import { yanginPompasiPerformansKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanginPompasiPerformansKontroluPage() {
  return (
    <CalcPage
      module={yanginPompasiPerformansKontrolu}
      standardsLabel="NFPA 20"
      description="Anma debisinde ölçülen basınç, gerekli (anma) basıncını karşılamalı."
      formula="Marj = Pölçülen − Pgerekli"
      engineeringNote="Tam churn/overload eğrisi bu modülde gömülü değildir, yalnız anma noktası karşılaştırılır."
      fields={[
        { key: "olculenBasinc_bar", label: "Ölçülen Basınç (bar)", type: "number", min: 0.1, step: 0.1 },
        { key: "gerekliBasinc_bar", label: "Gerekli Basınç (bar)", type: "number", min: 0.1, step: 0.1 },
      ]}
      defaults={{ olculenBasinc_bar: 9.5, gerekliBasinc_bar: 9 }}
      mainUnit="bar"
      mainValueKey="marj_bar"
      intermediateLabels={{
        olculenBasinc_bar: "Ölçülen Basınç (bar)",
        gerekliBasinc_bar: "Gerekli Basınç (bar)",
      }}
    />
  );
}
