"use client";

import { jeneratorYakitTuketimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function JeneratorYakitTuketimiPage() {
  return (
    <CalcPage
      module={jeneratorYakitTuketimi}
      standardsLabel="Fiziksel Formül"
      description="Üretilen güce ve özgül yakıt tüketimine (SFC) göre jeneratörün yakıt tüketim debisini hesaplar."
      formula="Yakıt Debisi = Güç × SFC"
      engineeringNote="Özgül yakıt tüketimi (SFC) yük yüzdesine göre değişir; tam yükte tipik dizel jeneratörler için ~0.25-0.3 L/kWh, düşük yükte oran artar."
      fields={[
        { key: "guc_kW", label: "Güç (kW)", type: "number", min: 1, step: 10 },
        {
          key: "ozgulYakitTuketimi_SFC_Lkwh",
          label: "Özgül Yakıt Tüketimi SFC (L/kWh)",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
      ]}
      defaults={{ guc_kW: 100, ozgulYakitTuketimi_SFC_Lkwh: 0.27 }}
      mainUnit="L/h"
      mainValueKey="yakitDebisi_Lh"
      intermediateLabels={{ ozgulYakitTuketimi_SFC_Lkwh: "Özgül Yakıt Tüketimi (L/kWh)" }}
    />
  );
}
