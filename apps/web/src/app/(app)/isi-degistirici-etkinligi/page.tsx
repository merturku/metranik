"use client";
import { CalcPage } from "@/components/calc-page";
import { isiDegistiricietkinligi } from "@metranik/core-calc";

export default function Page() {
  return <CalcPage module={isiDegistiricietkinligi} fields={[{name:"sicak_giris_C",label:"Sıcak Giriş (°C)"},{name:"sicak_cikis_C",label:"Sıcak Çıkış (°C)"},{name:"soguk_giris_C",label:"Soğuk Giriş (°C)"}]} defaults={{sicak_giris_C:80,sicak_cikis_C:65,soguk_giris_C:20}} description="EN 12815: Isı değiştirici etkinliği" formula="ε = ΔT_fiili / ΔT_max" engineeringNote="Etkinlik arttıkça sistem performansı iyileşir." />;
}
