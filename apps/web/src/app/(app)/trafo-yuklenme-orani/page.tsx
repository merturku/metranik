"use client";

import { trafoYuklenmeOrani } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TrafoYuklenmeOraniPage() {
  return (
    <CalcPage
      module={trafoYuklenmeOrani}
      standardsLabel="Fiziksel Formül"
      description="Ölçülen veya öngörülen yük gücünü trafonun anma gücüyle karşılaştırarak yüzde yüklenme oranını hesaplar."
      formula="Yüklenme % = (Syük / Snominal) × 100"
      engineeringNote="Sürekli işletmede %80'in altı güvenli kabul edilir; %80-100 arası sargı sıcaklığı ve yük profili izlenmelidir; %100'ün üstü anma gücü aşımı ve ömür kaybı riski taşır."
      fields={[
        { key: "yukGucu_S_kVA", label: "Yük Gücü S (kVA)", type: "number", min: 1, step: 10 },
        {
          key: "nominalGuc_Sn_kVA",
          label: "Trafo Anma Gücü Sn (kVA)",
          type: "number",
          min: 1,
          step: 10,
        },
      ]}
      defaults={{ yukGucu_S_kVA: 650, nominalGuc_Sn_kVA: 800 }}
      mainUnit="%"
      mainValueKey="yuklenmeOrani_yuzde"
      intermediateLabels={{ nominalGuc_Sn_kVA: "Trafo Anma Gücü (kVA)" }}
    />
  );
}
