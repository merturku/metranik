"use client";

import { havaDeposuBoyutlandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavaDeposuBoyutlandirmaPage() {
  return (
    <CalcPage
      module={havaDeposuBoyutlandirma}
      standardsLabel="Pratik Formül"
      description="Kısa süreli yüksek talep anında depo basıncının izin verilen alt sınırın altına düşmemesi için gerekli basınçlı hava deposu (receiver tank) hacmini hesaplar."
      formula="V = (Q × t × Pa) / (P1 - P2)"
      engineeringNote="P1 kompresörün devreye girmediği üst basınç, P2 talep sırasında düşmesine izin verilen alt basınç sınırıdır; aradaki fark ne kadar dar tutulursa depo o kadar büyük çıkar."
      fields={[
        {
          key: "talepDebisi_Q_Ldk",
          label: "Talep Debisi Q (L/dk, serbest hava)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "talepSuresi_t_dk",
          label: "Talep Süresi t (dk)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "atmosferBasinci_Pa_bar",
          label: "Atmosfer Basıncı Pa (bar, mutlak)",
          type: "number",
          min: 0.5,
          step: 0.05,
        },
        {
          key: "depoUstBasinc_P1_bar",
          label: "Depo Üst Basınç P1 (bar)",
          type: "number",
          min: 1,
          step: 0.5,
        },
        {
          key: "depoAltBasinc_P2_bar",
          label: "Depo Alt Basınç P2 (bar)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
      ]}
      defaults={{
        talepDebisi_Q_Ldk: 500,
        talepSuresi_t_dk: 1,
        atmosferBasinci_Pa_bar: 1,
        depoUstBasinc_P1_bar: 8,
        depoAltBasinc_P2_bar: 6,
      }}
      mainUnit="L"
      mainValueKey="gerekliHacim_L"
      intermediateLabels={{ basincFarki_bar: "Basınç Farkı (bar)" }}
    />
  );
}
