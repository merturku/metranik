"use client";

import { sprinklerNfpa13 } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SprinklerPage() {
  return (
    <CalcPage
      module={sprinklerNfpa13}
      standardsLabel="NFPA 13"
      description="Sprinkler orifis debisini K-faktör ve basınca göre hesaplar (Q = K√P). Tehlike sınıfı tasarım yoğunluğunu siz belirlersiniz."
      fields={[
        { key: "kFaktoru", label: "K-Faktörü", type: "number", min: 1, step: 1 },
        { key: "basinc_bar", label: "Basınç (bar)", type: "number", min: 0.1, step: 0.1 },
      ]}
      defaults={{ kFaktoru: 80, basinc_bar: 1 }}
      mainUnit="L/dk"
      mainValueKey="debi_L_dk"
      intermediateLabels={{ kFaktoru: "K-Faktörü", basinc_bar: "Basınç (bar)" }}
    />
  );
}
