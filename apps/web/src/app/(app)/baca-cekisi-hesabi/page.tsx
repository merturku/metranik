"use client";

import { bacaCekisiHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BacaCekisiHesabiPage() {
  return (
    <CalcPage
      module={bacaCekisiHesabi}
      standardsLabel="Baca Etkisi (Stack Effect)"
      description="Sıcak baca gazı ile soğuk dış hava arasındaki yoğunluk farkının oluşturduğu doğal çekiş basıncını hesaplar."
      formula="ρdış = P/(R·Tdış), Δp = g·H·ρdış·(Tbaca-Tdış)/Tbaca"
      engineeringNote="Doğal çekiş, baca yüksekliği ve sıcaklık farkıyla artar; sistem tasarımında bacadaki sürtünme kayıpları da ayrıca hesaba katılmalıdır, bu modül yalnızca kaldırma (buoyancy) etkisini verir."
      fields={[
        {
          key: "bacaYuksekligi_H_m",
          label: "Baca Yüksekliği H (m)",
          type: "number",
          min: 1,
          step: 0.5,
        },
        {
          key: "disOrtamSicakligi_Tdis_C",
          label: "Dış Ortam Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "bacaGaziSicakligi_Tbaca_C",
          label: "Baca Gazı Sıcaklığı (°C)",
          type: "number",
          step: 5,
        },
        {
          key: "atmosferBasinci_P_Pa",
          label: "Atmosfer Basıncı (Pa)",
          type: "number",
          min: 50000,
          step: 100,
        },
      ]}
      defaults={{
        bacaYuksekligi_H_m: 15,
        disOrtamSicakligi_Tdis_C: 15,
        bacaGaziSicakligi_Tbaca_C: 200,
        atmosferBasinci_P_Pa: 101325,
      }}
      mainUnit="Pa"
      mainValueKey="cekisBasinci_Pa"
      intermediateLabels={{ disOrtamYogunlugu_kg_m3: "Dış Ortam Yoğunluğu (kg/m³)" }}
    />
  );
}
