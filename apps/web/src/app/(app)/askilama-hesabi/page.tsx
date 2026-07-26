"use client";

import { askilamaHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AskilamaHesabiPage() {
  return (
    <CalcPage
      module={askilamaHesabi}
      standardsLabel="Fiziksel Formül"
      description="Askı noktası yükünü boru ve akışkan ağırlığından, askı aralığına göre hesaplar."
      formula="F = (wboru + wsu) × Askı Aralığı"
      fields={[
        { key: "boruAgirligi_kg_m", label: "Boru Ağırlığı (kg/m)", type: "number", min: 0.1, step: 0.1 },
        { key: "suAgirligi_kg_m", label: "Akışkan Ağırlığı (kg/m)", type: "number", min: 0, step: 0.1 },
        { key: "askiAraligi_m", label: "Askı Aralığı (m)", type: "number", min: 0.1, step: 0.5 },
      ]}
      defaults={{ boruAgirligi_kg_m: 5, suAgirligi_kg_m: 3, askiAraligi_m: 3 }}
      mainUnit="kg"
      mainValueKey="askiYuku_kg"
      intermediateLabels={{
        toplamDogrusalAgirlik_kg_m: "Toplam Doğrusal Ağırlık (kg/m)",
        askiYuku_N: "Askı Yükü (N)",
      }}
    />
  );
}
