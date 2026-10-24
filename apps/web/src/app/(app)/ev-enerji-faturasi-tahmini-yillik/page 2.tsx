"use client";
import { CalcPage } from "@/components/calc-page";
import { evEnerjiTahminYillik } from "@metranik/core-calc";

export default function Page() {
  return <CalcPage module={evEnerjiTahminYillik} fields={[{name:"ortalama_tüketim_kwh_ay",label:"Aylık Ortalama Tüketim (kWh)"},{name:"birim_fiyat_tlkwh",label:"Birim Fiyat (TL/kWh)"}]} defaults={{ortalama_tüketim_kwh_ay:100,birim_fiyat_tlkwh:5}} description="Yıllık enerji faturası tahmini" formula="Fatura = Yıllık_Tüketim × Birim_Fiyat" engineeringNote="Mevsimsel dalgalanmaları göz önüne almayı unutma." />;
}
