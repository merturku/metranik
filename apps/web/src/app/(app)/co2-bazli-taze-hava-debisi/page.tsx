"use client";

import { co2BazliTazeHavaDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function Co2BazliTazeHavaDebisiPage() {
  return (
    <CalcPage
      module={co2BazliTazeHavaDebisi}
      standardsLabel="ASHRAE 62.1 (Ek C)"
      description="Talebe bağlı havalandırma (DCV) için, kişilerin ürettiği CO2'nin taze hava ile seyreltilerek iç ortam set noktasında tutulmasını sağlayan kararlı durum kütle dengesiyle gerekli taze hava debisini hesaplar."
      formula="Q(L/s) = N×G×10⁶ / (Cs-Co)"
      engineeringNote="G, kişi başına CO2 üretim debisidir (hafif aktivite için tipik ~0.0052 L/s/kişi); Cs iç ortam CO2 set noktası, Co dış ortam CO2 derişimidir (tipik ~400 ppm). Sabit kişi/alan bazlı statik yöntemin (Taze Hava Debisi modülü) dinamik alternatifidir."
      fields={[
        {
          key: "kisiSayisi",
          label: "Kişi Sayısı",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "kisiBasinaCo2Uretimi_Ls",
          label: "Kişi Başına CO2 Üretimi (L/s)",
          type: "number",
          min: 0.001,
          step: 0.0001,
        },
        {
          key: "icOrtamCo2SetNoktasi_ppm",
          label: "İç Ortam CO2 Set Noktası (ppm)",
          type: "number",
          min: 500,
          step: 50,
        },
        {
          key: "disOrtamCo2_ppm",
          label: "Dış Ortam CO2 Derişimi (ppm)",
          type: "number",
          min: 100,
          step: 10,
        },
      ]}
      defaults={{
        kisiSayisi: 20,
        kisiBasinaCo2Uretimi_Ls: 0.0052,
        icOrtamCo2SetNoktasi_ppm: 1000,
        disOrtamCo2_ppm: 400,
      }}
      mainUnit="m³/h"
      mainValueKey="tazeHavaDebisi_m3h"
      mainDecimals={0}
      intermediateLabels={{
        derisimFarki_ppm: "Derişim Farkı (ppm)",
        debisi_Ls: "Debi (L/s)",
      }}
    />
  );
}
