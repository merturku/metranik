"use client";

import { duvarUDegeriHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DuvarUDegeriHesabiPage() {
  return (
    <CalcPage
      module={duvarUDegeriHesabi}
      standardsLabel="TS 825"
      description="İç/dış yüzey dirençleri ve iki katmanlı duvar/çatı yapısının (ana malzeme + yalıtım) kalınlık/iletkenlik değerlerinden ısı geçirme katsayısını (U) hesaplar."
      formula="U = 1/(Rsi + d1/k1 + d2/k2 + Rse)"
      engineeringNote="Bu modül iki katmana sınırlıdır; daha karmaşık (çok katmanlı) duvarlarda ek katman dirençleri elle toplanmalıdır. Sonuç, Pencere/Duvar Isı Kaybı modülünün doğrudan girdi olarak aldığı U değerini üretir."
      fields={[
        {
          key: "icYuzeyDirenci_Rsi_m2KW",
          label: "İç Yüzey Direnci Rsi (m²K/W)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "disYuzeyDirenci_Rse_m2KW",
          label: "Dış Yüzey Direnci Rse (m²K/W)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "katman1Kalinligi_d1_m",
          label: "Katman 1 Kalınlığı d1 (m)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "katman1Iletkenlik_k1_WmK",
          label: "Katman 1 Isı İletkenliği k1 (W/mK)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "katman2Kalinligi_d2_m",
          label: "Katman 2 Kalınlığı d2 (m)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "katman2Iletkenlik_k2_WmK",
          label: "Katman 2 Isı İletkenliği k2 (W/mK)",
          type: "number",
          min: 0.001,
          step: 0.005,
        },
      ]}
      defaults={{
        icYuzeyDirenci_Rsi_m2KW: 0.13,
        disYuzeyDirenci_Rse_m2KW: 0.04,
        katman1Kalinligi_d1_m: 0.19,
        katman1Iletkenlik_k1_WmK: 0.72,
        katman2Kalinligi_d2_m: 0.05,
        katman2Iletkenlik_k2_WmK: 0.035,
      }}
      mainUnit="W/m²K"
      mainValueKey="isiGecirmeKatsayisi_U_Wm2K"
      mainDecimals={3}
      intermediateLabels={{
        katman1Direnci_m2KW: "Katman 1 Direnci (m²K/W)",
        katman2Direnci_m2KW: "Katman 2 Direnci (m²K/W)",
        toplamDirenc_m2KW: "Toplam Direnç (m²K/W)",
      }}
    />
  );
}
