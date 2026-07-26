"use client";

import { baraAkimTasimaKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BaraAkimTasimaKapasitesiPage() {
  return (
    <CalcPage
      module={baraAkimTasimaKapasitesi}
      standardsLabel="Fiziksel Formül"
      description="Akım yoğunluğu yöntemiyle bara (busbar) akım taşıma kapasitesini hesaplar."
      formula="I = J × A"
      engineeringNote="Bakır bara için havada doğal soğutmada tipik akım yoğunluğu J ~1.6-2 A/mm²; kapalı pano içinde ve zorlanmış havalandırmada değer değişir."
      fields={[
        {
          key: "akimYogunlugu_J_Amm2",
          label: "Akım Yoğunluğu J (A/mm²)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "baraKesitAlani_mm2",
          label: "Bara Kesit Alanı (mm²)",
          type: "number",
          min: 1,
          step: 10,
        },
      ]}
      defaults={{ akimYogunlugu_J_Amm2: 1.6, baraKesitAlani_mm2: 500 }}
      mainUnit="A"
      mainValueKey="akimTasimaKapasitesi_A"
      intermediateLabels={{ akimYogunlugu_J_Amm2: "Akım Yoğunluğu (A/mm²)" }}
    />
  );
}
