"use client";

import { havaKurutucuKapasiteSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavaKurutucuKapasiteSecimiPage() {
  return (
    <CalcPage
      module={havaKurutucuKapasiteSecimi}
      standardsLabel="Üretici Düzeltme Katsayıları"
      description="Kompresör debisini, referans şartlardan (tipik 7 bar / 35°C giriş / 25°C ortam) sapan gerçek işletme şartlarına göre düzeltip gerekli kurutucu nominal kapasitesini bulur."
      formula="Gerekli Kapasite = Kompresör Debisi × Ksıcaklık × Kbasınç"
      engineeringNote="Düzeltme katsayıları üretici seçim tablolarından (giriş sıcaklığı, çalışma basıncı, ortam sıcaklığı için) alınır; referans şartlara ne kadar uzaksanız katsayılar o kadar büyür."
      fields={[
        {
          key: "kompresorDebisi_m3h",
          label: "Kompresör Debisi (m³/h)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "sicaklikDuzeltmeKatsayisi_K1",
          label: "Sıcaklık Düzeltme Katsayısı K1",
          type: "number",
          min: 0.5,
          step: 0.05,
        },
        {
          key: "basincDuzeltmeKatsayisi_K2",
          label: "Basınç Düzeltme Katsayısı K2",
          type: "number",
          min: 0.5,
          step: 0.05,
        },
      ]}
      defaults={{
        kompresorDebisi_m3h: 500,
        sicaklikDuzeltmeKatsayisi_K1: 1.2,
        basincDuzeltmeKatsayisi_K2: 0.9,
      }}
      mainUnit="m³/h"
      mainValueKey="gerekliKapasite_m3h"
      intermediateLabels={{ toplamDuzeltmeKatsayisi: "Toplam Düzeltme Katsayısı" }}
    />
  );
}
