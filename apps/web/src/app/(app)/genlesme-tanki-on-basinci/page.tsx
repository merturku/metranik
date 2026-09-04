"use client";

import { genlesmeTankiOnBasinci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GenlesmeTankiOnBasinciPage() {
  return (
    <CalcPage
      module={genlesmeTankiOnBasinci}
      standardsLabel="Hidrostatik Basınç"
      description="Sistemin en üst noktasındaki statik su yüksekliğinden ve bir güvenlik marjından, genleşme tankının ön (hava yastığı) basıncını hesaplar."
      formula="P0 = H/10.2 + marj"
      engineeringNote="10.2 m su kolonu ≈ 1 bar. Bu basınç, tankın sistem devreye girmeden önceki minimum işletme basıncını sağlar; Genleşme Tankı (hacim) modülünün tamamlayıcısıdır."
      fields={[
        {
          key: "statikYukseklik_H_m",
          label: "Statik Yükseklik H (m)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "guvenlikMarji_bar",
          label: "Güvenlik Marjı (bar)",
          type: "number",
          min: 0,
          step: 0.1,
        },
      ]}
      defaults={{
        statikYukseklik_H_m: 15,
        guvenlikMarji_bar: 0.3,
      }}
      mainUnit="bar"
      mainValueKey="onBasinc_P0_bar"
      mainDecimals={3}
      intermediateLabels={{
        statikBasinc_bar: "Statik Basınç (bar)",
      }}
    />
  );
}
