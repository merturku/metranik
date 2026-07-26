"use client";

import { gerilimDusumuKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GerilimDusumuKontroluPage() {
  return (
    <CalcPage
      module={gerilimDusumuKontrolu}
      standardsLabel="IEC 60364-5-52"
      description="Ölçülen gerilim düşümü yüzdesi, izin verilen sınırı (tipik: aydınlatmada %3, diğer kullanımlarda %5) aşmamalı."
      fields={[
        {
          key: "olculenGerilimDusumu_yuzde",
          label: "Ölçülen Gerilim Düşümü (%)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        { key: "izinVerilenYuzde", label: "İzin Verilen (%)", type: "number", min: 0.1, step: 0.5 },
      ]}
      defaults={{ olculenGerilimDusumu_yuzde: 1.64, izinVerilenYuzde: 3 }}
      mainUnit="%"
      mainValueKey="marj_yuzde"
      intermediateLabels={{
        olculenGerilimDusumu_yuzde: "Ölçülen Düşüm (%)",
        izinVerilenYuzde: "İzin Verilen (%)",
      }}
    />
  );
}
