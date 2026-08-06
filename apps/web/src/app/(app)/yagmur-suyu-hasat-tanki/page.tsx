"use client";

import { yagmurSuyuHasatTanki } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YagmurSuyuHasatTankiPage() {
  return (
    <CalcPage
      module={yagmurSuyuHasatTanki}
      standardsLabel="Fiziksel Formül"
      description="Çatı alanı ve yağış miktarından, çatı malzemesine bağlı akış (runoff) kayıplarını hesaba katarak toplanabilecek yağmur suyu hacmini hesaplar."
      formula="Hasat Hacmi = Çatı Alanı × Yağış Miktarı × Akış Katsayısı"
      engineeringNote="1mm yağış × 1m² alan = 1 litre su (birim dönüşümü). Akış katsayısı çatı malzemesine göre değişir: kiremit ~0.8-0.9, düz/membran çatı ~0.7-0.8."
      fields={[
        {
          key: "catiAlani_m2",
          label: "Çatı Alanı (m²)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "yagisMiktari_mm",
          label: "Yağış Miktarı (mm)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "akisKatsayisi",
          label: "Akış (Runoff) Katsayısı (0-1)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
      ]}
      defaults={{
        catiAlani_m2: 120,
        yagisMiktari_mm: 50,
        akisKatsayisi: 0.85,
      }}
      mainUnit="L"
      mainValueKey="hasatHacmi_L"
      intermediateLabels={{ teorikHacim_L: "Teorik Hacim (L)" }}
    />
  );
}
