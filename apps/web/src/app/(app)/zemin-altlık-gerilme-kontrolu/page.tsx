"use client";
import { CalcPage } from "@/components/calc-page";
import { zeminAltlıkGerilmeKontrolu } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={zeminAltlıkGerilmeKontrolu}
      fields={[
        { name: "yuk_kN", label: "Yük (kN)" },
        { name: "temel_alani_m2", label: "Temel Alanı (m²)" },
      ]}
      defaults={{ yuk_kN: 1000, temel_alani_m2: 10 }}
      description="TS EN 1997-1: Altlık gerilmesi kontrolü"
      formula="σ = N/A ± M/W"
      engineeringNote="Eksantrik yüklerde moment etkisini göz önüne al."
    />
  );
}
