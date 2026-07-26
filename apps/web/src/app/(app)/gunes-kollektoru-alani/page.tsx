"use client";

import { gunesKollektoruAlani } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GunesKollektoruAlaniPage() {
  return (
    <CalcPage
      module={gunesKollektoruAlani}
      standardsLabel="Fiziksel Formül"
      description="Günlük enerji ihtiyacına ve güneş radyasyonuna göre gerekli güneş kollektörü alanını hesaplar."
      formula="A = Q / (I × verim)"
      engineeringNote="Güneş radyasyonu (I) bölgeye ve mevsime göre değişir; kollektör verimi tipine göre (düz plaka ~0.4-0.6, vakum tüplü ~0.5-0.7) alınır."
      fields={[
        {
          key: "gunlukEnerjiIhtiyaci_Q_kWh",
          label: "Günlük Enerji İhtiyacı (kWh)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
        {
          key: "gunesRadyasyonu_I_kWhm2gun",
          label: "Güneş Radyasyonu (kWh/m²gün)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "kollektorVerimi",
          label: "Kollektör Verimi (0-1)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
      ]}
      defaults={{ gunlukEnerjiIhtiyaci_Q_kWh: 10, gunesRadyasyonu_I_kWhm2gun: 5, kollektorVerimi: 0.5 }}
      mainUnit="m²"
      mainValueKey="gerekliAlan_m2"
      intermediateLabels={{ kollektorVerimi: "Kollektör Verimi" }}
    />
  );
}
