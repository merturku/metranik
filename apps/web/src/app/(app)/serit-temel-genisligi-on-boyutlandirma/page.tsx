"use client";

import { seritTemelGenisligiOnBoyutlandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SeritTemelGenisligiOnBoyutlandirmaPage() {
  return (
    <CalcPage
      module={seritTemelGenisligiOnBoyutlandirma}
      standardsLabel="Emniyet Gerilmesi Yöntemi"
      description="Birim uzunluk başına gelen yük ve zeminin emniyetli taşıma gerilmesinden, şerit temel için gereken genişliği ön boyutlandırma amacıyla hesaplar."
      formula="B = N/qemniyet"
      engineeringNote="Temel Taşıma Kapasitesi (Meyerhof) ve Zemin Taşıma Gücü Kontrolü modülleri verilen bir B için kapasiteyi kontrol eder; bu modül tam tersi yönde çalışır — istenen yük için gereken B'yi üretir. Nihai tasarımda kapasite kontrolüyle doğrulanmalıdır."
      fields={[
        {
          key: "birimUzunlukYuku_N_kNm",
          label: "Birim Uzunluk Yükü N (kN/m)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "zeminEmniyetGerilmesi_qEmniyet_kNm2",
          label: "Zemin Emniyet Gerilmesi qemniyet (kN/m²)",
          type: "number",
          min: 10,
          step: 10,
        },
      ]}
      defaults={{
        birimUzunlukYuku_N_kNm: 150,
        zeminEmniyetGerilmesi_qEmniyet_kNm2: 150,
      }}
      mainUnit="m"
      mainValueKey="gerekliGenislik_B_m"
      mainDecimals={2}
      intermediateLabels={{
        zeminEmniyetGerilmesi_kNm2: "Zemin Emniyet Gerilmesi (kN/m²)",
      }}
    />
  );
}
