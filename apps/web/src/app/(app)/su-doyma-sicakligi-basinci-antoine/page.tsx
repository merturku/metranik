"use client";

import { suDoymaSicakligiBasinciAntoine } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SuDoymaSicakligiBasinciAntoinePage() {
  return (
    <CalcPage
      module={suDoymaSicakligiBasinciAntoine}
      standardsLabel="Antoine denklemi"
      description="Su için doyma sıcaklığından doyma basıncını veya doyma basıncından sıcaklığı hesaplar."
      formula="log₁₀P[mmHg] = A − B/(C + T);  1–100 °C: 8,07131 / 1730,63 / 233,426;  99–374 °C: 8,14019 / 1810,94 / 244,485"
      engineeringNote="Basınç mutlaktır (kPa). Buhar tablolarına göre yaklaşık %0,2 (≤100 °C) ile %1 (150 °C) sapma beklenir; hassas buhar hesabı için IAPWS-IF97 tabloları kullanılmalıdır. Girdi sıcaklık (°C) veya basınç (kPa mutlak) olarak yorumlanır."
      fields={[
        { key: "yon", label: "Hesap Yönü", type: "select", options: [{ value: "sicakliktan-basinc", label: "Sıcaklık (°C) → Basınç (kPa)" }, { value: "basinctan-sicaklik", label: "Basınç (kPa mutlak) → Sıcaklık (°C)" }] },
        { key: "deger", label: "Değer", type: "number", step: 1, min: 0.01 },
      ]}
      defaults={{ yon: "sicakliktan-basinc", deger: 100 }}
      mainUnit=""
      mainValueKey="sonuc"
      mainDecimals={2}
      intermediateLabels={{
        birim: "Birim",
        basinc_bar: "Basınç (bar)",
        basinc_mmHg: "Basınç (mmHg)",
        kullanilan_aralik: "Kullanılan Aralık",
        not: "Not",
      }}
    />
  );
}
