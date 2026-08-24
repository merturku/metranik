"use client";

import { sogutmaKulesiKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SogutmaKulesiKapasitesiPage() {
  return (
    <CalcPage
      module={sogutmaKulesiKapasitesi}
      standardsLabel="Enerji Dengesi + Boyle Yasası"
      description="Su debisi ile giriş/çıkış sıcaklıklarından soğutma kulesinin attığı ısıyı (Range) ve yaklaşma sıcaklığını (Approach) hesaplar, yaklaşma sıcaklığının pratik alt sınırını kontrol eder."
      formula="Range = Tgiriş - Tçıkış, Approach = Tçıkış - Tyaş, Q = ṁ×cp×Range"
      engineeringNote="Yaklaşma sıcaklığı (Approach), çıkış suyunun yaş termometre sıcaklığına ne kadar yaklaştığını gösterir; fiziksel olarak negatif olamaz ve pratikte ~2-3°C altına inmesi kule boyutunu ekonomik olmayan ölçüde büyütür."
      fields={[
        {
          key: "suDebisi_m3h",
          label: "Su Debisi (m³/h)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "girisSuSicakligi_C",
          label: "Giriş Su Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "cikisSuSicakligi_C",
          label: "Çıkış Su Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "yasTermometreSicakligi_C",
          label: "Yaş Termometre Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
      ]}
      defaults={{
        suDebisi_m3h: 100,
        girisSuSicakligi_C: 35,
        cikisSuSicakligi_C: 29,
        yasTermometreSicakligi_C: 24,
      }}
      mainUnit="kW"
      mainValueKey="atilanIsi_kW"
      mainDecimals={1}
      intermediateLabels={{
        range_C: "Range (°C)",
        approach_C: "Approach (°C)",
        kutleselDebi_kgs: "Kütlesel Debi (kg/s)",
      }}
    />
  );
}
