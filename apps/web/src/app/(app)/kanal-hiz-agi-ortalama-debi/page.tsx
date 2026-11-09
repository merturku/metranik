"use client";

import { kanalHizAgiOrtalamaDebi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalHizAgiOrtalamaDebiPage() {
  return (
    <CalcPage
      module={kanalHizAgiOrtalamaDebi}
      standardsLabel="ISO 3966 · ASHRAE 111"
      description="Kanal kesitinde ölçülen nokta hızlarından ortalama hızı, debiyi ve hız dağılımının düzgünlüğünü hesaplar; tasarım debisiyle karşılaştırır."
      formula="V̄ = Σvᵢ/n;  Q = V̄·A;  CV = σ/V̄"
      engineeringNote="Ölçüm noktaları eşit alanlı bölgelerde veya log-Tchebycheff dağılımıyla alınmalı, düz kanal bölümünde (akış yönünde ≥ 7,5D, öncesinde ≥ 3D) ölçülmelidir. Sıfır girilen noktalar sayılmaz. Tasarım debisinden ±%10 uygun, ±%15'e kadar sınırdadır. Nokta hızları için Pitot Tüpü modülünü kullanın."
      fields={[
        { key: "kesitAlani_m2", label: "Kanal Kesit Alanı (m²)", type: "number", step: 0.01, min: 0.001 },
        { key: "v1", label: "Nokta 1 Hızı (m/s)", type: "number", step: 0.1, min: 0 },
        { key: "v2", label: "Nokta 2 Hızı (m/s)", type: "number", step: 0.1, min: 0 },
        { key: "v3", label: "Nokta 3 Hızı (m/s)", type: "number", step: 0.1, min: 0 },
        { key: "v4", label: "Nokta 4 Hızı (m/s)", type: "number", step: 0.1, min: 0 },
        { key: "v5", label: "Nokta 5 Hızı (m/s)", type: "number", step: 0.1, min: 0 },
        { key: "v6", label: "Nokta 6 Hızı (m/s)", type: "number", step: 0.1, min: 0 },
        { key: "tasarimDebisi_m3h", label: "Tasarım Debisi (m³/h, 0 = kıyas yok)", type: "number", step: 100, min: 0 },
      ]}
      defaults={{ kesitAlani_m2: 0.3, v1: 5, v2: 6, v3: 7, v4: 6, v5: 5, v6: 7, tasarimDebisi_m3h: 6480 }}
      mainUnit="m³/h"
      mainValueKey="debi_m3h"
      mainDecimals={0}
      intermediateLabels={{
        nokta_sayisi: "Nokta Sayısı",
        ortalama_hiz_ms: "Ortalama Hız (m/s)",
        standart_sapma_ms: "Standart Sapma (m/s)",
        degisim_katsayisi_yuzde: "Değişim Katsayısı (%)",
        debi_m3s: "Debi (m³/s)",
        tasarim_debisinden_sapma_yuzde: "Tasarımdan Sapma (%)",
        not: "Not",
      }}
    />
  );
}
