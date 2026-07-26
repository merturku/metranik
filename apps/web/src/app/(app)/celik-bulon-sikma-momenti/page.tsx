"use client";

import { celikBulonSikmaMomenti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CelikBulonSikmaMomentiPage() {
  return (
    <CalcPage
      module={celikBulonSikmaMomenti}
      standardsLabel="TS EN 1090-2 / AWS D1.1"
      description="Çelik yapı bulonlarında gerekli ön germe kuvvetine göre sıkma momentini hesaplar."
      formula="M = k × d × Fp, Fp = 0.7 × As × fub"
      engineeringNote="Tork katsayısı k, bulon yüzey durumuna (kaplama, yağlama) göre tipik olarak 0.15-0.25 arasında alınır."
      fields={[
        { key: "bulonCapi_mm", label: "Bulon Çapı d (mm)", type: "number", min: 4, step: 1 },
        {
          key: "gerilmeAlani_mm2",
          label: "Gerilme Alanı As (mm²)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "nihaiCekmeDayanimi_fub_MPa",
          label: "Nihai Çekme Dayanımı fub (MPa)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "torkKatsayisi_k",
          label: "Tork Katsayısı k (örn. 0.2)",
          type: "number",
          min: 0.05,
          step: 0.01,
        },
      ]}
      defaults={{
        bulonCapi_mm: 16,
        gerilmeAlani_mm2: 157,
        nihaiCekmeDayanimi_fub_MPa: 800,
        torkKatsayisi_k: 0.2,
      }}
      mainUnit="Nm"
      mainValueKey="sikmaMomenti_Nm"
      intermediateLabels={{ onGermeKuvveti_kN: "Ön Germe Kuvveti (kN)" }}
    />
  );
}
