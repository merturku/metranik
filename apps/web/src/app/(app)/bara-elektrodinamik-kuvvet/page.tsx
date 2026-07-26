"use client";

import { baraElektrodinamikKuvvet } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BaraElektrodinamikKuvvetPage() {
  return (
    <CalcPage
      module={baraElektrodinamikKuvvet}
      standardsLabel="IEC 60865-1"
      description="Tepe kısa devre akımına göre paralel bara/iletkenler arasında oluşan elektrodinamik kuvveti hesaplar."
      formula="F = (μ0 × Ip² × L) / (2π × d)"
      engineeringNote="Bu kuvvet, bara ve destek izolatörlerinin mekanik dayanım kontrolünde kullanılır; gerçek tasarımda dinamik büyütme faktörü ve destek sayısı da IEC 60865-1'e göre ayrıca değerlendirilmelidir."
      fields={[
        {
          key: "tepeKisaDevreAkimi_Ip_A",
          label: "Tepe Kısa Devre Akımı Ip (A)",
          type: "number",
          min: 1,
          step: 100,
        },
        {
          key: "destekAcikligi_L_m",
          label: "Destekler Arası Açıklık L (m)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "iletkenlerArasiMesafe_d_m",
          label: "İletkenler Arası Mesafe d (m)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
      ]}
      defaults={{
        tepeKisaDevreAkimi_Ip_A: 20000,
        destekAcikligi_L_m: 1,
        iletkenlerArasiMesafe_d_m: 0.15,
      }}
      mainUnit="N"
      mainValueKey="kuvvet_F_N"
      intermediateLabels={{
        destekAcikligi_L_m: "Destek Açıklığı (m)",
        iletkenlerArasiMesafe_d_m: "İletkenler Arası Mesafe (m)",
      }}
    />
  );
}
