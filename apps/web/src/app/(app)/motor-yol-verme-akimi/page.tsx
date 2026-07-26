"use client";

import { motorYolVermeAkimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MotorYolVermeAkimiPage() {
  return (
    <CalcPage
      module={motorYolVermeAkimi}
      standardsLabel="Fiziksel Formül"
      description="Motorun nominal akımına ve yol verme yöntemine göre kalkış (inrush) akımını hesaplar."
      formula="Ikalkış = Inom × Başlama Oranı"
      engineeringNote="Başlama oranı yol verme yöntemine göre değişir: doğrudan yol verme (DOL) ~6-8, yıldız-üçgen ~2-3, yumuşak yol verici değişken."
      fields={[
        { key: "nominalAkim_A", label: "Nominal Akım (A)", type: "number", min: 0.1, step: 0.1 },
        {
          key: "baslamaOrani",
          label: "Başlama Oranı (örn. DOL için 7)",
          type: "number",
          min: 1,
          step: 0.5,
        },
      ]}
      defaults={{ nominalAkim_A: 50, baslamaOrani: 7 }}
      mainUnit="A"
      mainValueKey="kalkisAkimi_A"
      intermediateLabels={{ baslamaOrani: "Başlama Oranı" }}
    />
  );
}
