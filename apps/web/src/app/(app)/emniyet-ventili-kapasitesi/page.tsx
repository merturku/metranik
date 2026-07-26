"use client";

import { emniyetVentiliKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EmniyetVentiliKapasitesiPage() {
  return (
    <CalcPage
      module={emniyetVentiliKapasitesi}
      standardsLabel="TS EN 12828"
      description="Kazan tam güçte çalışırken emniyet ventilinin tahliye etmesi gereken kütlesel debiyi hesaplar."
      formula="Q = P × 3600 / hfg"
      engineeringNote="hfg (buharlaşma gizli ısısı), 100°C'de atmosferik basınçta suyun buharlaşma ısısı için tipik olarak ~2257 kJ/kg alınır."
      fields={[
        { key: "kazanGucu_P_kW", label: "Kazan Gücü P (kW)", type: "number", min: 1, step: 10 },
        {
          key: "buharlasmaGizliIsisi_hfg_kJkg",
          label: "Buharlaşma Gizli Isısı hfg (kJ/kg)",
          type: "number",
          min: 100,
          step: 1,
        },
      ]}
      defaults={{ kazanGucu_P_kW: 500, buharlasmaGizliIsisi_hfg_kJkg: 2257 }}
      mainUnit="kg/h"
      mainValueKey="tahliyeKapasitesi_kgh"
      intermediateLabels={{ buharlasmaGizliIsisi_hfg_kJkg: "Buharlaşma Gizli Isısı (kJ/kg)" }}
    />
  );
}
