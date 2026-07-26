"use client";

import { aydinlatmaDiregiRuzgarYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AydinlatmaDiregiRuzgarYukuPage() {
  return (
    <CalcPage
      module={aydinlatmaDiregiRuzgarYuku}
      standardsLabel="TS EN 1991-1-4"
      description="Tepe hız basıncına, kuvvet katsayısına ve etkili yüzey alanına göre aydınlatma direğine etkiyen rüzgar kuvvetini hesaplar."
      formula="Fw = qp × Cf × A"
      engineeringNote="Kuvvet katsayısı (Cf) direk kesitine göre değişir: silindirik direkler için ~1.2, kare/dikdörtgen kesitler için ~2.0 tipik alınır (TS EN 1991-1-4)."
      fields={[
        {
          key: "tepeHizBasinci_qp_Pa",
          label: "Tepe Hız Basıncı qp (Pa)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "kuvvetKatsayisi_Cf",
          label: "Kuvvet Katsayısı Cf",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "etkiliYuzeyAlani_A_m2",
          label: "Etkili Yüzey Alanı A (m²)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
      ]}
      defaults={{ tepeHizBasinci_qp_Pa: 1225, kuvvetKatsayisi_Cf: 1.2, etkiliYuzeyAlani_A_m2: 0.5 }}
      mainUnit="N"
      mainValueKey="ruzgarKuvveti_N"
      intermediateLabels={{ kuvvetKatsayisi_Cf: "Kuvvet Katsayısı (Cf)" }}
    />
  );
}
