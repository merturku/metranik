"use client";

import { kompanzasyon } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KompanzasyonPage() {
  return (
    <CalcPage
      module={kompanzasyon}
      standardsLabel="Trigonometri"
      description="Mevcut ve hedef güç faktörüne (cosφ) göre gerekli kapasitör gücünü hesaplar."
      formula="Qc = P × (tan φ1 − tan φ2)"
      fields={[
        { key: "aktifGuc_kW", label: "Aktif Güç (kW)", type: "number", min: 0.1, step: 0.1 },
        { key: "mevcutCosPhi", label: "Mevcut cosφ", type: "number", min: 0.01, step: 0.01 },
        { key: "hedefCosPhi", label: "Hedef cosφ", type: "number", min: 0.01, step: 0.01 },
      ]}
      defaults={{ aktifGuc_kW: 100, mevcutCosPhi: 0.75, hedefCosPhi: 0.95 }}
      mainUnit="kVAr"
      mainValueKey="kapasitorGucu_kVAr"
      intermediateLabels={{ tanPhi1: "tanφ1 (mevcut)", tanPhi2: "tanφ2 (hedef)" }}
    />
  );
}
