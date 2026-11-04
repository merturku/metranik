"use client";

import { basincBirimDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BasincBirimDonusumuPage() {
  return (
    <CalcPage
      module={basincBirimDonusumu}
      standardsLabel="Birim dönüşümü"
      description="Basıncı bar cinsinden kPa, Pa, psi, mSS, mmSS ve atm birimlerine çevirir."
      formula="kPa = 100·bar;   psi = 14,5038·bar;   mSS = 10,1972·bar"
      engineeringNote="mSS (metre su sütunu) 4 °C yakın saf su için g = 9,80665 m/s² ile alınmıştır. Manometre basıncı (bağıl) ile mutlak basıncı karıştırmayın."
      fields={[
        { key: "basinc_bar", label: "Basınç (bar)", type: "number", step: 0.5, min: 0.0001 },
      ]}
      defaults={{ basinc_bar: 1 }}
      mainUnit="kPa"
      mainValueKey="basinc_kPa"
      mainDecimals={2}
      intermediateLabels={{
        basinc_Pa: "Pa",
        basinc_psi: "psi",
        basinc_mSS: "mSS (m)",
        basinc_mmSS: "mmSS",
        basinc_atm: "atm",
      }}
    />
  );
}
