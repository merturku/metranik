"use client";
import { CalcPage } from "@/components/calc-page";
import { trafoImpedansGerilim } from "@metranik/core-calc";

export default function Page() {
  return <CalcPage module={trafoImpedansGerilim} fields={[{name:"guc_kVA",label:"Güç (kVA)"},{name:"kisa_devre_kaybi_kW",label:"Kısa Devre Kaybı (kW)"},{name:"voltaj_birincil_kV",label:"Voltaj Birincil (kV)"}]} defaults={{guc_kVA:630,kisa_devre_kaybi_kW:6,voltaj_birincil_kV:10}} description="IEC 60076: Trafo empedans gerilim düşümü" formula="Z% = (Pksa×Zbase)/(V²×10)" engineeringNote="Trafo seçiminde empedans değeri elektrik şebekenin stabilitesi açısından önemlidir." />;
}
