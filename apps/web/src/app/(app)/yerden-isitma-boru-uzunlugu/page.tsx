"use client";

import { yerdenIsitmaBoruUzunlugu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YerdenIsitmaBoruUzunluguPage() {
  return (
    <CalcPage
      module={yerdenIsitmaBoruUzunlugu}
      standardsLabel="Fiziksel Formül"
      description="Isıtılacak alana ve boru aralığına göre yerden ısıtma devresinin toplam boru uzunluğunu hesaplar."
      formula="L = Alan / Aralık"
      engineeringNote="Boru aralığı ısı yüküne göre seçilir; yüksek ısı ihtiyacında daha sık aralık (örn. 10cm), düşük ihtiyaçta daha seyrek (20-30cm) kullanılır."
      fields={[
        {
          key: "isitilanAlan_m2",
          label: "Isıtılan Alan (m²)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "boruAraligi_m",
          label: "Boru Aralığı (m)",
          type: "number",
          min: 0.05,
          step: 0.01,
        },
      ]}
      defaults={{ isitilanAlan_m2: 20, boruAraligi_m: 0.15 }}
      mainUnit="m"
      mainValueKey="toplamBoruUzunlugu_m"
      intermediateLabels={{ boruAraligi_m: "Boru Aralığı (m)" }}
    />
  );
}
