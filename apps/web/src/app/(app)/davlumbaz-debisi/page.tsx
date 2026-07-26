"use client";

import { davlumbazDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DavlumbazDebisiPage() {
  return (
    <CalcPage
      module={davlumbazDebisi}
      standardsLabel="ACGIH"
      description="Yakalama hızı prensibine göre davlumbaz açıklık alanından gerekli egzoz debisini hesaplar."
      formula="Q = v × A"
      engineeringNote="Yakalama hızı (v) kirletici kaynağın tehlike derecesine göre değişir; hafif buhar/koku için ~0.25-0.5 m/s, ağır dumanda daha yüksek değerler kullanılır (ACGIH Industrial Ventilation Manual)."
      fields={[
        {
          key: "yakalamaHizi_v_ms",
          label: "Yakalama Hızı v (m/s)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        { key: "aciklikAlani_A_m2", label: "Açıklık Alanı A (m²)", type: "number", min: 0.1, step: 0.1 },
      ]}
      defaults={{ yakalamaHizi_v_ms: 0.5, aciklikAlani_A_m2: 1.2 }}
      mainUnit="m³/h"
      mainValueKey="debi_m3h"
      intermediateLabels={{ debi_m3s: "Debi (m³/s)" }}
    />
  );
}
