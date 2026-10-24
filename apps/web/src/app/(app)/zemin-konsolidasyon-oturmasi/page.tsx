"use client";

import { zeminKonsolidasyonOturmasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminKonsolidasyonOturmasiPage() {
  return (
    <CalcPage
      module={zeminKonsolidasyonOturmasi}
      standardsLabel="Terzaghi Konsolidasyon Teorisi"
      description="Sıkışma katsayısına, tabaka kalınlığına ve gerilme artışına göre kil/silt tabakasındaki konsolidasyon oturmasını hesaplar."
      formula="Δh = (Cc·H)/(1+e0) × log10((σ0+Δσ)/σ0)"
      engineeringNote="Bu formül tek boyutlu (birincil) konsolidasyonu kapsar; ikincil konsolidasyon (sünme) ve tabakalar arası farklılıklar için ayrıca değerlendirme gerekir."
      fields={[
        {
          key: "sikismaKatsayisi_Cc",
          label: "Sıkışma Katsayısı Cc",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "tabakaKalinligi_H_m",
          label: "Tabaka Kalınlığı H (m)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
        {
          key: "ilkBosluklOrani_e0",
          label: "İlk Boşluk Oranı e0",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        {
          key: "ilkGerilme_sigma0_kPa",
          label: "İlk Efektif Gerilme σ0 (kPa)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "ekGerilme_dsigma_kPa",
          label: "Ek Gerilme Δσ (kPa)",
          type: "number",
          min: 1,
          step: 5,
        },
      ]}
      defaults={{
        sikismaKatsayisi_Cc: 0.3,
        tabakaKalinligi_H_m: 5,
        ilkBosluklOrani_e0: 0.8,
        ilkGerilme_sigma0_kPa: 100,
        ekGerilme_dsigma_kPa: 50,
      }}
      mainUnit="mm"
      mainValueKey="oturma_mm"
      intermediateLabels={{ gerilmeOrani: "Gerilme Oranı" }}
    />
  );
}
