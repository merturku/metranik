"use client";

import { suYalitimMembranBindirmeKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SuYalitimMembranBindirmeKontroluPage() {
  return (
    <CalcPage
      module={suYalitimMembranBindirmeKontrolu}
      standardsLabel="DIN 18533"
      description="Su yalıtım membranı bindirme mesafesini yüzey eğimine göre asgari değerle karşılaştırır."
      formula="Marj = Ölçülen Bindirme − Asgari Bindirme"
      engineeringNote="Asgari bindirme yüzey eğimine göre değişir: yatay yüzeyde ≥10 cm, eğimli yüzeyde ≥15 cm (DIN 18533)."
      fields={[
        {
          key: "olculenBindirme_cm",
          label: "Ölçülen Bindirme (cm)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "yuzeyTipi",
          label: "Yüzey Tipi",
          type: "select",
          options: [
            { value: "yatay", label: "Yatay" },
            { value: "egimli", label: "Eğimli" },
          ],
        },
      ]}
      defaults={{ olculenBindirme_cm: 12, yuzeyTipi: "yatay" }}
      mainUnit="cm"
      mainValueKey="marj_cm"
      intermediateLabels={{ asgariBindirme_cm: "Asgari Bindirme (cm)" }}
    />
  );
}
