"use client";

import { duvarTuglasiMetraji } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DuvarTuglasiMetrajiPage() {
  return (
    <CalcPage
      module={duvarTuglasiMetraji}
      standardsLabel="Geometrik Formül"
      description="Tuğla ölçüleri ve derz kalınlığından tuğlanın kapladığı birim alanı, duvar alanından da gerekli tuğla adedini hesaplar."
      formula="Birim Alan = (L+derz)×(Y+derz), Adet = ⌈Duvar Alanı / Birim Alan × (1+Fire)⌉"
      engineeringNote="Derz kalınlığı tipik olarak 10mm alınır; fire oranı kesim/kırılma kayıplarını karşılar, tipik değer %3-8 arasındadır."
      fields={[
        {
          key: "tuglaUzunlugu_mm",
          label: "Tuğla Uzunluğu (mm)",
          type: "number",
          min: 50,
          step: 5,
        },
        {
          key: "tuglaYuksekligi_mm",
          label: "Tuğla Yüksekliği (mm)",
          type: "number",
          min: 20,
          step: 5,
        },
        {
          key: "derzKalinligi_mm",
          label: "Derz Kalınlığı (mm)",
          type: "number",
          min: 0,
          step: 1,
        },
        {
          key: "duvarAlani_m2",
          label: "Duvar Alanı (m²)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "fireOrani",
          label: "Fire Oranı (0-1)",
          type: "number",
          min: 0,
          step: 0.01,
        },
      ]}
      defaults={{
        tuglaUzunlugu_mm: 190,
        tuglaYuksekligi_mm: 90,
        derzKalinligi_mm: 10,
        duvarAlani_m2: 50,
        fireOrani: 0.05,
      }}
      mainUnit="adet"
      mainValueKey="gerekliTuglaAdedi"
      mainDecimals={0}
      intermediateLabels={{
        tuglaBirimAlani_m2: "Tuğla Birim Alanı (m²)",
        teorikAdet: "Teorik Adet",
      }}
    />
  );
}
