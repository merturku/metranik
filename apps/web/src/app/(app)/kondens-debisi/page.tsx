"use client";

import { kondensDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KondensDebisiPage() {
  return (
    <CalcPage
      module={kondensDebisi}
      standardsLabel="Fiziksel Formül"
      description="Buhar hattındaki ısı kaybına göre oluşan kondens debisini hesaplar."
      formula="ṁ = Qkayıp / hfg"
      engineeringNote="Yoğuşma gizli ısısı (hfg) buhar basıncına göre değişir; atmosferik basınçta ~2257 kJ/kg, yüksek basınçlarda daha düşük değerler alınır."
      fields={[
        {
          key: "hatIsiKaybi_Qkayip_kW",
          label: "Hat Isı Kaybı (kW)",
          type: "number",
          min: 0.1,
          step: 1,
        },
        {
          key: "yogusmaGizliIsisi_hfg_kJkg",
          label: "Yoğuşma Gizli Isısı hfg (kJ/kg)",
          type: "number",
          min: 100,
          step: 10,
        },
      ]}
      defaults={{ hatIsiKaybi_Qkayip_kW: 50, yogusmaGizliIsisi_hfg_kJkg: 2200 }}
      mainUnit="kg/h"
      mainValueKey="kondensDebisi_kgh"
      intermediateLabels={{ kondensDebisi_kgs: "Kondens Debisi (kg/s)" }}
    />
  );
}
