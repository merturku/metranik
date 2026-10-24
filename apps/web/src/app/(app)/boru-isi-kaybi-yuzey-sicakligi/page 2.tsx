"use client";
import { CalcPage } from "@/components/calc-page";
import { boruIsiKaybiYuzeySicakligi } from "@metranik/core-calc";

export default function Page() {
  return <CalcPage module={boruIsiKaybiYuzeySicakligi} fields={[{name:"ic_sicaklik_C",label:"İç Sıcaklık (°C)"},{name:"ortam_sicakligi_C",label:"Ortam Sıcaklığı (°C)"},{name:"isolasyon_kalınligi_mm",label:"İzolasyon Kalınlığı (mm)"}]} defaults={{ic_sicaklik_C:80,ortam_sicakligi_C:20,isolasyon_kalınligi_mm:50}} description="ASTM C1055: Yüzey sıcaklığı kontrolü" formula="T_yüzey = T_iç - Q×R_isi/(R_isi+R_taşınım)" engineeringNote="Dokunma güvenliği sınırı (60°C) aşılmamalı." />;
}
