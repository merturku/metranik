"use client";
import { CalcPage } from "@/components/calc-page";
import { kompresörHavaDebisiSecimi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={kompresörHavaDebisiSecimi}
      fields={[
        { name: "debi_m3min", label: "İhtiyaç Debisi (m³/min)" },
      ]}
      defaults={{ debi_m3min: 7 }}
      description="ISO 1217: FAD (Free Air Delivery) hesabı"
      formula="FAD = Debi / Eşzamanlılık"
      engineeringNote="Kompresör seçiminde motor güçlendirmesini de dikkate al."
    />
  );
}
