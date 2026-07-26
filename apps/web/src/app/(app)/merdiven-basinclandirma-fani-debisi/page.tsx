"use client";

import { merdivenBasinclandirmaFaniDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MerdivenBasinclandirmaFaniDebisiPage() {
  return (
    <CalcPage
      module={merdivenBasinclandirmaFaniDebisi}
      standardsLabel="NFPA 92"
      description="Açık kapı(lar)dan kaçan hava debisine göre merdiven basınçlandırma fanının gerekli debisini hesaplar."
      formula="Q = Cd × A × √(2ΔP/ρ) × n"
      engineeringNote="Basınçlandırma basıncı (ΔP) yönetmeliğe göre tipik 12.5-50 Pa arasında seçilir; açık kapı sayısı (n) senaryo bazlı belirlenir (genelde en olumsuz kapı sayısı)."
      fields={[
        {
          key: "kapiKacakAlani_A_m2",
          label: "Kapı Kaçak Alanı A (m²)",
          type: "number",
          min: 0.001,
          step: 0.001,
        },
        {
          key: "basinclandirmaBasinci_dP_Pa",
          label: "Basınçlandırma Basıncı ΔP (Pa)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "debiKatsayisi_Cd",
          label: "Debi Katsayısı Cd",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        { key: "acikKapiSayisi_n", label: "Açık Kapı Sayısı n", type: "number", min: 1, step: 1 },
      ]}
      defaults={{
        kapiKacakAlani_A_m2: 0.01,
        basinclandirmaBasinci_dP_Pa: 50,
        debiKatsayisi_Cd: 0.6,
        acikKapiSayisi_n: 1,
      }}
      mainUnit="m³/h"
      mainValueKey="gerekliDebi_m3h"
      intermediateLabels={{ terminalHiz_ms: "Terminal Hız (m/s)" }}
    />
  );
}
