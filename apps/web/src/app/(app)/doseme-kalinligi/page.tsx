"use client";

import { dosemeKalinligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DosemeKalinligiPage() {
  return (
    <CalcPage
      module={dosemeKalinligi}
      standardsLabel="TS 500 / TBDY 2018"
      description="Serbest açıklığa ve mesnet koşuluna göre sehim kontrolü için gerekli asgari döşeme kalınlığını hesaplar."
      formula="hmin = Ln / mn"
      engineeringNote="mn mesnet koşuluna göre değişir: basit mesnetli ~20, tek ucu sürekli ~24, iki ucu sürekli ~28, konsol ~10."
      fields={[
        {
          key: "serbestAciklik_Ln_m",
          label: "Serbest Açıklık Ln (m)",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
        {
          key: "mesnetKatsayisi_mn",
          label: "Mesnet Katsayısı mn",
          type: "number",
          min: 5,
          step: 1,
        },
      ]}
      defaults={{ serbestAciklik_Ln_m: 5, mesnetKatsayisi_mn: 28 }}
      mainUnit="cm"
      mainValueKey="minimumKalinlik_cm"
      intermediateLabels={{ mesnetKatsayisi_mn: "Mesnet Katsayısı (mn)" }}
    />
  );
}
