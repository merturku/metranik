"use client";

import { betonSuCimentoOrani } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonSuCimentoOraniPage() {
  return (
    <CalcPage
      module={betonSuCimentoOrani}
      standardsLabel="TS 802"
      description="Hedef su/çimento oranına ve çimento dozajına göre gerekli karışım suyu miktarını hesaplar."
      formula="Su = (Su/Çimento Oranı) × Çimento Dozajı"
      engineeringNote="Düşük su/çimento oranı dayanımı artırır ama işlenebilirliği azaltır; TS 802'de dayanıklılık sınıfına göre azami su/çimento oranları tanımlanır."
      fields={[
        {
          key: "suCimentoOrani",
          label: "Su/Çimento Oranı",
          type: "number",
          min: 0.2,
          step: 0.01,
        },
        {
          key: "cimentoDozaji_kg_m3",
          label: "Çimento Dozajı (kg/m³)",
          type: "number",
          min: 100,
          step: 10,
        },
      ]}
      defaults={{ suCimentoOrani: 0.5, cimentoDozaji_kg_m3: 350 }}
      mainUnit="kg/m³"
      mainValueKey="suMiktari_kg_m3"
      intermediateLabels={{ suCimentoOrani: "Su/Çimento Oranı" }}
    />
  );
}
