"use client";

import { kolonDonatiOraniKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KolonDonatiOraniKontroluPage() {
  return (
    <CalcPage
      module={kolonDonatiOraniKontrolu}
      standardsLabel="TS 500 §7.4.1"
      description="Boyuna donatı alanına ve brüt beton kesit alanına göre kolonda donatı oranını hesaplar ve TS 500'ün asgari/azami sınırlarıyla karşılaştırır."
      formula="ρ = As / Ac (TS 500: ρmin=0.01, ρmax=0.04)"
      engineeringNote="TS 500 §7.4.1'e göre kolonlarda boyuna donatı oranı brüt beton kesitinin %1'inden az, %4'ünden fazla olamaz; deprem bölgelerinde TBDY 2018 ek sınırlar getirebilir."
      fields={[
        {
          key: "boyunaDonatiAlani_As_mm2",
          label: "Boyuna Donatı Alanı As (mm²)",
          type: "number",
          min: 1,
          step: 50,
        },
        {
          key: "brutBetonKesitAlani_Ac_mm2",
          label: "Brüt Beton Kesit Alanı Ac (mm²)",
          type: "number",
          min: 1,
          step: 1000,
        },
      ]}
      defaults={{ boyunaDonatiAlani_As_mm2: 2400, brutBetonKesitAlani_Ac_mm2: 160000 }}
      mainUnit=""
      mainValueKey="donatiOrani_ro"
      intermediateLabels={{
        ro_min: "TS 500 ρmin",
        ro_max: "TS 500 ρmax",
        donatiOrani_yuzde: "Donatı Oranı (%)",
      }}
    />
  );
}
