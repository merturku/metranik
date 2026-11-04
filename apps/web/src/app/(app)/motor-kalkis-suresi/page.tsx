"use client";

import { motorKalkisSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MotorKalkisSuresiPage() {
  return (
    <CalcPage
      module={motorKalkisSuresi}
      standardsLabel="Dönel hareket denklemi"
      description="Toplam atalet momenti, devir ve ortalama ivmelendirici momentten motorun kalkış süresini hesaplar."
      formula="t = J·ω/T_ort;   ω = 2π·n/60"
      engineeringNote="T_ort motor momentinden yük momentinin çıkarılmasıyla elde edilen ortalama ivmelendirici momenttir (motor ve yük eğrilerinden okunur). Atalet momenti motor miline indirgenmelidir. Uzun kalkış süresi sargı ısınmasına yol açar; üretici izin verilen kalkış süresiyle karşılaştırın."
      fields={[
        { key: "toplamAtalet_kgm2", label: "Toplam Atalet Momenti J (kg·m²)", type: "number", step: 0.5, min: 0.001 },
        { key: "devir_rpm", label: "Nominal Devir (dev/dk)", type: "number", step: 50, min: 1 },
        { key: "ortalamaIvmeMomenti_Nm", label: "Ortalama İvmelendirici Moment (N·m)", type: "number", step: 10, min: 0.1 },
      ]}
      defaults={{ toplamAtalet_kgm2: 2, devir_rpm: 1500, ortalamaIvmeMomenti_Nm: 100 }}
      mainUnit="saniye"
      mainValueKey="kalkisSuresi_s"
      mainDecimals={2}
      intermediateLabels={{
        acisal_hiz_rad_s: "Açısal Hız (rad/s)",
        kinetik_enerji_kJ: "Kinetik Enerji (kJ)",
        ortalama_ivme_rad_s2: "Ortalama Açısal İvme (rad/s²)",
      }}
    />
  );
}
