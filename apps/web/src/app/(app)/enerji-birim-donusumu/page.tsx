"use client";

import { enerjiBirimDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EnerjiBirimDonusumuPage() {
  return (
    <CalcPage
      module={enerjiBirimDonusumu}
      standardsLabel="Birim dönüşümü"
      description="Enerjiyi kWh cinsinden MJ, GJ, kcal, BTU, therm ve doğalgaz m³ eşdeğerine çevirir."
      formula="MJ = 3,6·kWh;   kcal = kWh·3,6·10⁶/4186,8;   m³ gaz = kWh/Hu"
      engineeringNote="Doğalgaz alt ısıl değeri Hu = 9,59 kWh/m³ (≈ 8250 kcal/m³) örnek değerdir; fatura/dağıtım şirketinin açıkladığı değeri kullanın. kcal Uluslararası Tablo kalorisidir (4,1868 kJ)."
      fields={[
        { key: "enerji_kWh", label: "Enerji (kWh)", type: "number", step: 10, min: 0.001 },
      ]}
      defaults={{ enerji_kWh: 100 }}
      mainUnit="MJ"
      mainValueKey="enerji_MJ"
      mainDecimals={1}
      intermediateLabels={{
        enerji_GJ: "GJ",
        enerji_kcal: "kcal",
        enerji_BTU: "BTU",
        dogalgaz_m3_Hu9_59: "Doğalgaz (m³, Hu 9,59)",
        enerji_therm: "therm",
      }}
    />
  );
}
