"use client";
import { CalcPage } from "@/components/calc-page";
import { betonAğirlikHesabi } from "@metranik/core-calc";

export default function Page() {
  return <CalcPage module={betonAğirlikHesabi} fields={[{name:"hacim_m3",label:"Hacim (m³)"}]} defaults={{hacim_m3:10}} description="TS EN 206: Beton ağırlık hesabı" formula="M = V × ρ" engineeringNote="Ortalama beton yoğunluğu 2400 kg/m³'tür." />;
}
