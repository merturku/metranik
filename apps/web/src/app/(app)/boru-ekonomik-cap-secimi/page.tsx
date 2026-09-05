"use client";

import { boruEkonomikCapSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruEkonomikCapSecimiPage() {
  return (
    <CalcPage
      module={boruEkonomikCapSecimi}
      standardsLabel="Ekonomik Hız Yöntemi"
      description="Debi ve ekonomik akış hızından, süreklilik denklemiyle gerekli boru çapını hesaplar."
      formula="D = √(4Q/(πV))"
      engineeringNote="Küçük çap düşük yatırım ama yüksek pompa/işletme maliyeti getirir, büyük çap tersi — ekonomik hız (uygulamaya göre tipik 1-3 m/s) bu dengeyi temsil eder. Boru Basınç Kaybı modülünün doğrudan girdi olarak aldığı çapı üretir."
      fields={[
        {
          key: "debi_Q_m3s",
          label: "Debi Q (m³/s)",
          type: "number",
          min: 0.001,
          step: 0.005,
        },
        {
          key: "ekonomikHiz_V_ms",
          label: "Ekonomik Hız V (m/s)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        debi_Q_m3s: 0.05,
        ekonomikHiz_V_ms: 2,
      }}
      mainUnit="mm"
      mainValueKey="gerekliCap_D_mm"
      mainDecimals={1}
      intermediateLabels={{
        gerekliCap_m: "Gerekli Çap (m)",
      }}
    />
  );
}
