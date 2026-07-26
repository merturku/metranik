"use client";

import { perdeDuvarKalinligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PerdeDuvarKalinligiPage() {
  return (
    <CalcPage
      module={perdeDuvarKalinligi}
      standardsLabel="TBDY 2018"
      description="Kat yüksekliğine göre perde duvar için asgari kalınlık ön kabulünü hesaplar."
      formula="tmin = h / n"
      engineeringNote="TBDY 2018'de perde duvarlar için asgari kalınlık genelde 200mm'den az olmamak üzere h/n oranıyla belirlenir; n tipik 15-20 arasında alınır. Bu ön kabul, kesme/eksenel yük kontrolünün yerine geçmez."
      fields={[
        {
          key: "katYuksekligi_h_m",
          label: "Kat Yüksekliği h (m)",
          type: "number",
          min: 1,
          step: 0.1,
        },
        { key: "katsayi_n", label: "Katsayı n (tipik 15-20)", type: "number", min: 5, step: 1 },
      ]}
      defaults={{ katYuksekligi_h_m: 3, katsayi_n: 20 }}
      mainUnit="cm"
      mainValueKey="minimumKalinlik_cm"
      intermediateLabels={{ katsayi_n: "Katsayı (n)" }}
    />
  );
}
