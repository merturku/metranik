"use client";

import { sivaHarcMiktari } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SivaHarcMiktariPage() {
  return (
    <CalcPage
      module={sivaHarcMiktari}
      standardsLabel="Pratik Formül"
      description="Sıva alanı, kalınlığı ve harç yoğunluğundan kuru harç kütlesini, ardından standart torba ağırlığına göre gerekli torba sayısını hesaplar."
      formula="Hacim = Alan × Kalınlık, Kütle = Hacim × Yoğunluk, Torba = ⌈Kütle / Torba Ağırlığı⌉"
      engineeringNote="Çimento esaslı sıva harcının kuru yoğunluğu tipik olarak 1600-1900 kg/m³ aralığındadır; ürün ambalajındaki teknik veri esas alınmalıdır."
      fields={[
        {
          key: "alan_m2",
          label: "Alan (m²)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "kalinlik_m",
          label: "Kalınlık (m)",
          type: "number",
          min: 0.005,
          step: 0.005,
        },
        {
          key: "yogunluk_kg_m3",
          label: "Yoğunluk (kg/m³)",
          type: "number",
          min: 500,
          step: 50,
        },
        {
          key: "torbaAgirligi_kg",
          label: "Torba Ağırlığı (kg)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        alan_m2: 100,
        kalinlik_m: 0.02,
        yogunluk_kg_m3: 1800,
        torbaAgirligi_kg: 25,
      }}
      mainUnit="torba"
      mainValueKey="gerekliTorbaSayisi"
      mainDecimals={0}
      intermediateLabels={{
        hacim_m3: "Hacim (m³)",
        kuruHarcKutlesi_kg: "Kuru Harç Kütlesi (kg)",
      }}
    />
  );
}
