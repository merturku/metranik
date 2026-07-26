"use client";

import { buharHatCapi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BuharHatCapiPage() {
  return (
    <CalcPage
      module={buharHatCapi}
      standardsLabel="Fiziksel Formül"
      description="Kütlesel debi, buhar özgül hacmi ve hedef buhar hızına göre gerekli boru çapını hesaplar."
      formula="D = √(4Q/(π·v)), Q = ṁ·vg"
      engineeringNote="Buhar hızı düşük basınç hatlarında tipik 25-35 m/s, yüksek basınç hatlarında 35-50 m/s alınır; özgül hacim (vg) buhar basıncına göre buhar tablolarından okunur."
      fields={[
        {
          key: "kutleselDebi_kgh",
          label: "Kütlesel Debi (kg/h)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "ozgulHacim_vg_m3kg",
          label: "Özgül Hacim vg (m³/kg)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        { key: "buharHizi_v_ms", label: "Buhar Hızı v (m/s)", type: "number", min: 1, step: 1 },
      ]}
      defaults={{ kutleselDebi_kgh: 1000, ozgulHacim_vg_m3kg: 0.6, buharHizi_v_ms: 30 }}
      mainUnit="mm"
      mainValueKey="boruCapi_mm"
      intermediateLabels={{ hacimselDebi_m3s: "Hacimsel Debi (m³/s)" }}
    />
  );
}
