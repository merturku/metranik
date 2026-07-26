"use client";

import { kabloEkonomikKesit } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloEkonomikKesitPage() {
  return (
    <CalcPage
      module={kabloEkonomikKesit}
      standardsLabel="Fiziksel Formül"
      description="Akıma ve ekonomik akım yoğunluğuna göre yatırım ile enerji kaybı maliyetlerini dengeleyen kablo kesitini hesaplar."
      formula="A = I / Je"
      engineeringNote="Ekonomik akım yoğunluğu (Je), yıllık kullanım süresine ve enerji birim fiyatına göre değişir; bu modülde kullanıcı tarafından girilir, akım taşıma kapasitesi kriteri ayrıca kontrol edilmelidir."
      fields={[
        { key: "akim_I_A", label: "Akım I (A)", type: "number", min: 1, step: 10 },
        {
          key: "ekonomikAkimYogunlugu_Je_Amm2",
          label: "Ekonomik Akım Yoğunluğu Je (A/mm²)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{ akim_I_A: 200, ekonomikAkimYogunlugu_Je_Amm2: 3 }}
      mainUnit="mm²"
      mainValueKey="ekonomikKesit_mm2"
      intermediateLabels={{ ekonomikAkimYogunlugu_Je_Amm2: "Ekonomik Akım Yoğunluğu (A/mm²)" }}
    />
  );
}
