"use client";

import { radyantIsiticiKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function RadyantIsiticiKapasitesiPage() {
  return (
    <CalcPage
      module={radyantIsiticiKapasitesi}
      standardsLabel="Sektör Kuralı"
      description="Isıtılacak alana göre radyant ısıtıcının gerekli kapasitesini ön boyutlandırma kuralıyla hesaplar."
      formula="Q = Alan × Katsayı"
      engineeringNote="Katsayı (W/m²) mekanın kullanım tipine, tavan yüksekliğine ve dış ortam koşullarına göre değişir; açık alanlarda daha yüksek değerler gerekir."
      fields={[
        { key: "alan_m2", label: "Alan (m²)", type: "number", min: 1, step: 1 },
        {
          key: "katsayi_Wm2",
          label: "Katsayı (W/m²)",
          type: "number",
          min: 50,
          step: 10,
        },
      ]}
      defaults={{ alan_m2: 10, katsayi_Wm2: 350 }}
      mainUnit="W"
      mainValueKey="gerekliKapasite_W"
      intermediateLabels={{ katsayi_Wm2: "Katsayı (W/m²)" }}
    />
  );
}
