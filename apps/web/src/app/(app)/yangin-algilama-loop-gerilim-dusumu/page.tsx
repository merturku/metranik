"use client";

import { yanginAlgilamaLoopGerilimDusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanginAlgilamaLoopGerilimDusumuPage() {
  return (
    <CalcPage
      module={yanginAlgilamaLoopGerilimDusumu}
      standardsLabel="EN 54 / NFPA 72"
      description="Yangın algılama loop hattının sonundaki eleman gerilimini hesaplar ve asgari çalışma gerilimiyle karşılaştırır."
      formula="Uç = Ukaynak − 2·ρ·L·I/A"
      engineeringNote="24V sistemlerde tipik asgari uç eleman gerilimi ~17V'tur; kesin değer cihaz üreticisinin teknik verisinden alınmalıdır."
      fields={[
        { key: "kaynakGerilimi_V", label: "Kaynak Gerilimi (V)", type: "number", min: 1, step: 1 },
        { key: "hatUzunlugu_m", label: "Hat Uzunluğu (m)", type: "number", min: 1, step: 10 },
        { key: "akim_A", label: "Akım (A)", type: "number", min: 0.001, step: 0.01 },
        { key: "kesit_mm2", label: "Kesit (mm²)", type: "number", min: 0.1, step: 0.1 },
        {
          key: "minimumUcElemanGerilimi_V",
          label: "Asgari Uç Eleman Gerilimi (V)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        kaynakGerilimi_V: 24,
        hatUzunlugu_m: 500,
        akim_A: 0.05,
        kesit_mm2: 1.5,
        minimumUcElemanGerilimi_V: 17,
      }}
      mainUnit="V"
      mainValueKey="ucElemanGerilimi_V"
      intermediateLabels={{
        gerilimDusumu_V: "Gerilim Düşümü (V)",
        minimumUcElemanGerilimi_V: "Asgari Uç Eleman Gerilimi (V)",
        marj_V: "Marj (V)",
      }}
    />
  );
}
