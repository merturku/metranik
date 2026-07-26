"use client";

import { isiYalitimKalinligiHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiYalitimKalinligiHesabiPage() {
  return (
    <CalcPage
      module={isiYalitimKalinligiHesabi}
      standardsLabel="TS 825"
      description="Mevcut duvar direncine ve hedef U değerine göre gerekli ek yalıtım kalınlığını hesaplar."
      formula="d = (1/Uhedef − Rmevcut) × λ"
      engineeringNote="Hedef U değeri TS 825'te bölge ve yapı elemanına göre tablo halinde verilir; bu modülde gömülü değildir."
      fields={[
        {
          key: "mevcutDuvarDirenci_m2KW",
          label: "Mevcut Duvar Direnci R (m²K/W)",
          type: "number",
          min: 0.05,
          step: 0.05,
        },
        {
          key: "hedefUDegeri_WmK",
          label: "Hedef U Değeri (W/m²K)",
          type: "number",
          min: 0.05,
          step: 0.05,
        },
        {
          key: "yalitimIletkenligi_WmK",
          label: "Yalıtım Isı İletkenliği λ (W/mK)",
          type: "number",
          min: 0.01,
          step: 0.005,
        },
      ]}
      defaults={{
        mevcutDuvarDirenci_m2KW: 0.5,
        hedefUDegeri_WmK: 0.4,
        yalitimIletkenligi_WmK: 0.035,
      }}
      mainUnit="cm"
      mainValueKey="gerekliKalinlik_cm"
      intermediateLabels={{
        hedefDirenc_m2KW: "Hedef Direnç (m²K/W)",
        ekYalitimDirenci_m2KW: "Ek Yalıtım Direnci (m²K/W)",
      }}
    />
  );
}
