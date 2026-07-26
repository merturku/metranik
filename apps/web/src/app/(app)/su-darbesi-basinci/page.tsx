"use client";

import { suDarbesiBasinci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SuDarbesiBasinciPage() {
  return (
    <CalcPage
      module={suDarbesiBasinci}
      standardsLabel="Joukowsky Denklemi"
      description="Ani vana kapanmasında akış hızı değişimine göre oluşan su darbesi (water hammer) basınç artışını hesaplar."
      formula="ΔP = ρ × c × Δv"
      engineeringNote="Basınç dalgası hızı (c) boru malzemesine ve çapına göre değişir; çelik borularda tipik 1000-1400 m/s, plastik borularda daha düşüktür (~300-500 m/s)."
      fields={[
        {
          key: "suYogunlugu_rho_kgm3",
          label: "Su Yoğunluğu ρ (kg/m³)",
          type: "number",
          min: 900,
          step: 10,
        },
        {
          key: "basincDalgasiHizi_c_ms",
          label: "Basınç Dalgası Hızı c (m/s)",
          type: "number",
          min: 100,
          step: 50,
        },
        {
          key: "hizDegisimi_dv_ms",
          label: "Hız Değişimi Δv (m/s)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{ suYogunlugu_rho_kgm3: 1000, basincDalgasiHizi_c_ms: 1000, hizDegisimi_dv_ms: 2 }}
      mainUnit="bar"
      mainValueKey="basincArtisi_bar"
      intermediateLabels={{ basincArtisi_Pa: "Basınç Artışı (Pa)" }}
    />
  );
}
