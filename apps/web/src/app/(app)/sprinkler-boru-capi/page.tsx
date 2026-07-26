"use client";

import { sprinklerBoruCapi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SprinklerBoruCapiPage() {
  return (
    <CalcPage
      module={sprinklerBoruCapi}
      standardsLabel="NFPA 13"
      description="Hedef debiye ve akış hızına göre gerekli sprinkler boru çapını hesaplar."
      formula="D = √(4Q/(π·v))"
      engineeringNote="NFPA 13, sprinkler hatlarında hız sınırlarını dolaylı olarak basınç kaybı üzerinden kontrol eder; 3-6 m/s aralığı yaygın bir ön tasarım referansıdır."
      fields={[
        { key: "debi_Q_Ls", label: "Debi Q (L/s)", type: "number", min: 0.1, step: 0.1 },
        { key: "akisHizi_v_ms", label: "Akış Hızı v (m/s)", type: "number", min: 0.5, step: 0.5 },
      ]}
      defaults={{ debi_Q_Ls: 5, akisHizi_v_ms: 3 }}
      mainUnit="mm"
      mainValueKey="boruCapi_mm"
      intermediateLabels={{ debi_m3s: "Debi (m³/s)" }}
    />
  );
}
