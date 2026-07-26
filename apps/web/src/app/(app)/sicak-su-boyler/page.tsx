"use client";

import { sicakSuBoylerDin4708 } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SicakSuBoylerPage() {
  return (
    <CalcPage
      module={sicakSuBoylerDin4708}
      standardsLabel="Enerji Korunumu"
      description="Pik talep ile ısıtıcının pik süre boyunca karşılayabildiği hacim farkından gerekli boyler deposunu hesaplar."
      formula="Recovery = P × 860 / ΔT; Depo = Pik Talep − (Recovery × Süre)"
      engineeringNote="DIN 4708'in 'Bedarfskennzahl' referans tabloları gömülü değildir; pik talep mühendis girdisidir."
      fields={[
        { key: "pikTalep_L", label: "Pik Talep (L)", type: "number", min: 1, step: 1 },
        { key: "pikSuresi_saat", label: "Pik Süresi (saat)", type: "number", min: 0.1, step: 0.1 },
        { key: "isiticiGucu_kW", label: "Isıtıcı Gücü (kW)", type: "number", min: 0.1, step: 0.1 },
        { key: "deltaT", label: "ΔT (°C)", type: "number", min: 1, step: 1 },
      ]}
      defaults={{ pikTalep_L: 500, pikSuresi_saat: 1, isiticiGucu_kW: 10, deltaT: 35 }}
      mainUnit="L"
      mainValueKey="depoHacmi_L"
      intermediateLabels={{ isiticiRecoveryDebisi_L_saat: "Isıtıcı Recovery Debisi (L/saat)" }}
    />
  );
}
