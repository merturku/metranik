"use client";

import { basincliHavaBoruCapi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BasincliHavaBoruCapiPage() {
  return (
    <CalcPage
      module={basincliHavaBoruCapi}
      standardsLabel="Fiziksel Formül"
      description="Hedef akış hızına göre basınçlı hava hattının gerekli iç çapını süreklilik denkleminden hesaplar."
      formula="D = √(4×Q / (π×v))"
      engineeringNote="Ana dağıtım hatlarında tipik hız 6-10 m/s, tali/branşman hatlarında 15-20 m/s tutulur; yüksek hız basınç kaybını ve gürültüyü artırır."
      fields={[
        { key: "debi_Q_Ls", label: "Debi Q (L/s, serbest hava)", type: "number", min: 1, step: 1 },
        {
          key: "hedefHiz_v_ms",
          label: "Hedef Hat Hızı v (m/s)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ debi_Q_Ls: 50, hedefHiz_v_ms: 15 }}
      mainUnit="mm"
      mainValueKey="ic_cap_mm"
      intermediateLabels={{ debi_m3s: "Debi (m³/s)", hedefHiz_v_ms: "Hedef Hız (m/s)" }}
    />
  );
}
