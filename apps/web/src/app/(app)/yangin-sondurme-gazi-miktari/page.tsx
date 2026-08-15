"use client";

import { yanginSondurmeGaziMiktari } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanginSondurmeGaziMiktariPage() {
  return (
    <CalcPage
      module={yanginSondurmeGaziMiktari}
      standardsLabel="NFPA 2001"
      description="Korunan hacim, ajanın özgül buhar hacmi ve tasarım konsantrasyonuna göre gerekli temiz gaz (FM-200, Novec 1230, CO2 vb.) miktarını hesaplar."
      formula="W = (V/s) × [C / (100-C)]"
      engineeringNote="Özgül buhar hacmi (s), ajan tipine ve söndürme sıcaklığına göre değişir; NFPA 2001'in ilgili ajana ait tablosundan alınmalıdır. Tasarım konsantrasyonu (C) da hazard sınıfına ve ajana göre değişir (tipik olarak %6-10 aralığı)."
      fields={[
        {
          key: "korunanHacim_V_m3",
          label: "Korunan Hacim V (m³)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "ozgulBuharHacmi_s_m3kg",
          label: "Özgül Buhar Hacmi s (m³/kg)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "tasarimKonsantrasyonu_C_yuzde",
          label: "Tasarım Konsantrasyonu C (%)",
          type: "number",
          min: 1,
          step: 0.5,
        },
      ]}
      defaults={{
        korunanHacim_V_m3: 150,
        ozgulBuharHacmi_s_m3kg: 0.15,
        tasarimKonsantrasyonu_C_yuzde: 10,
      }}
      mainUnit="kg"
      mainValueKey="gerekliAjanMiktari_kg"
      intermediateLabels={{ hacimSelBuharOrani_kg: "Hacim / Özgül Buhar Hacmi (kg)" }}
    />
  );
}
