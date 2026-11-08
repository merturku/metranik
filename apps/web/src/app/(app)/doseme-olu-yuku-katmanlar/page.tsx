"use client";

import { dosemeOluYukuKatmanlar } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DosemeOluYukuKatmanlarPage() {
  return (
    <CalcPage
      module={dosemeOluYukuKatmanlar}
      standardsLabel="TS 498 · TS 500"
      description="Döşeme ve kaplama katmanlarının kalınlık ve birim hacim ağırlıklarından ölü yükü (kN/m²) ve tasarım yükünü hesaplar."
      formula="g = Σ(tᵢ·γᵢ);  Pd = 1,4g + 1,6q (TS 500);  1,35g + 1,5q (TS EN 1990)"
      engineeringNote="Birim hacim ağırlıkları TS 498'den alınmalıdır (tipik: betonarme 25, şap 22, seramik 27, sıva 20 kN/m³). Boş katman için kalınlık 0 girin. Tavan asma, tesisat ve bölme duvar yükünü ayrıca ekleyin. Düşey Yük Kombinasyonu modülü g ve q'yu doğrudan alır."
      fields={[
        { key: "katman1_mm", label: "Katman 1 Kalınlık (mm)", type: "number", step: 5, min: 0 },
        { key: "katman1_gamma", label: "Katman 1 γ (kN/m³)", type: "number", step: 0.5, min: 0 },
        { key: "katman2_mm", label: "Katman 2 Kalınlık (mm)", type: "number", step: 5, min: 0 },
        { key: "katman2_gamma", label: "Katman 2 γ (kN/m³)", type: "number", step: 0.5, min: 0 },
        { key: "katman3_mm", label: "Katman 3 Kalınlık (mm)", type: "number", step: 5, min: 0 },
        { key: "katman3_gamma", label: "Katman 3 γ (kN/m³)", type: "number", step: 0.5, min: 0 },
        { key: "katman4_mm", label: "Katman 4 Kalınlık (mm)", type: "number", step: 5, min: 0 },
        { key: "katman4_gamma", label: "Katman 4 γ (kN/m³)", type: "number", step: 0.5, min: 0 },
        { key: "hareketliYuk_kNm2", label: "Hareketli Yük q (kN/m²)", type: "number", step: 0.5, min: 0 },
      ]}
      defaults={{ katman1_mm: 150, katman1_gamma: 25, katman2_mm: 50, katman2_gamma: 22, katman3_mm: 15, katman3_gamma: 27, katman4_mm: 20, katman4_gamma: 20, hareketliYuk_kNm2: 2 }}
      mainUnit="kN/m²"
      mainValueKey="oluYuk_kNm2"
      mainDecimals={3}
      intermediateLabels={{
        katman1_kNm2: "Katman 1 (kN/m²)",
        katman2_kNm2: "Katman 2 (kN/m²)",
        katman3_kNm2: "Katman 3 (kN/m²)",
        katman4_kNm2: "Katman 4 (kN/m²)",
        tasarim_yuku_TS500_kNm2: "Tasarım Yükü TS 500 (kN/m²)",
        tasarim_yuku_EN1990_kNm2: "Tasarım Yükü EN 1990 (kN/m²)",
      }}
    />
  );
}
