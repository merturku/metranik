"use client";

import { yanginDolabiDebiBasinc } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanginDolabiDebiBasincPage() {
  return (
    <CalcPage
      module={yanginDolabiDebiBasinc}
      standardsLabel="TS 9811"
      description="Yangın dolabı lülesinden çıkan debiyi mevcut basınca göre hesaplar ve asgari gerekli debiyle karşılaştırır."
      formula="Q = Cd × A × √(2 × ΔP / ρ)"
      engineeringNote="TS 9811 asgari debi/basınç değerleri dolap tipine (25mm/50mm) göre değişir; asgari değeri projeye göre siz girin."
      fields={[
        { key: "luleCapi_mm", label: "Lüle Çapı (mm)", type: "number", min: 1, step: 0.5 },
        { key: "basinc_bar", label: "Basınç (bar)", type: "number", min: 0.1, step: 0.1 },
        {
          key: "debiKatsayisi_Cd",
          label: "Debi Katsayısı Cd (örn. 0.97)",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
        {
          key: "izinVerilenMinimumDebi_Lmin",
          label: "Asgari Gerekli Debi (L/min)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        luleCapi_mm: 13,
        basinc_bar: 2,
        debiKatsayisi_Cd: 0.97,
        izinVerilenMinimumDebi_Lmin: 100,
      }}
      mainUnit="L/min"
      mainValueKey="debi_Lmin"
      intermediateLabels={{
        luleAlani_m2: "Lüle Alanı (m²)",
        izinVerilenMinimumDebi_Lmin: "Asgari Gerekli Debi (L/min)",
        marj_Lmin: "Marj (L/min)",
      }}
    />
  );
}
