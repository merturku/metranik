"use client";
import { CalcPage } from "@/components/calc-page";
import { kanalDifuzorAgiDebisi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={kanalDifuzorAgiDebisi}
      fields={[
        { name: "difuzor_alanı_m2", label: "Difüzör Alanı (m²)" },
      ]}
      defaults={{ difuzor_alanı_m2: 0.1 }}
      description="ASHRAE 62.1: Havalandırma difüzörü debisi"
      formula="Q = v × A"
      engineeringNote="Hız aşırı yüksek olursa gürültü artar. 3-5 m/s önerilir."
    />
  );
}
