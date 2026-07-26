"use client";

import { boylerIsinmaSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoylerIsinmaSuresiPage() {
  return (
    <CalcPage
      module={boylerIsinmaSuresi}
      standardsLabel="Fiziksel Formül"
      description="Su kütlesine, hedef sıcaklık farkına ve ısıtıcı gücüne göre boylerin ısınma süresini hesaplar."
      formula="t = (m × cp × ΔT) / (P × 3600)"
      engineeringNote="Bu hesap ısı kayıplarını (tank izolasyonu) ihmal eder; gerçek ısınma süresi hesaplanandan biraz daha uzun olabilir."
      fields={[
        { key: "suKutlesi_m_kg", label: "Su Kütlesi (kg)", type: "number", min: 1, step: 5 },
        {
          key: "sicaklikFarki_dT_C",
          label: "Sıcaklık Farkı ΔT (°C)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "isiticiGucu_P_kW",
          label: "Isıtıcı Gücü P (kW)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
      ]}
      defaults={{ suKutlesi_m_kg: 150, sicaklikFarki_dT_C: 45, isiticiGucu_P_kW: 3 }}
      mainUnit="saat"
      mainValueKey="isinmaSuresi_saat"
      intermediateLabels={{ gerekliEnerji_kJ: "Gerekli Enerji (kJ)" }}
    />
  );
}
