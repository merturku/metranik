"use client";

import { istinatCoulombAktifBasinc } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IstinatCoulombAktifBasincPage() {
  return (
    <CalcPage
      module={istinatCoulombAktifBasinc}
      standardsLabel="Coulomb teorisi"
      description="Duvar sürtünmesi ile eğimli duvar/dolgu yüzeyini dikkate alan Coulomb aktif toprak basıncı katsayısını ve kuvvetini hesaplar."
      formula="Ka = cos²(φ−θ)/{cos²θ·cos(δ+θ)·[1+√(sin(φ+δ)sin(φ−β)/(cos(δ+θ)cos(θ−β)))]²};  Pa = ½·γ·H²·Ka"
      engineeringNote="δ duvar–zemin sürtünme açısıdır (tipik 2/3·φ), θ duvar arkasının düşeyden eğimi, β dolgu yüzeyi eğimidir (β < φ olmalı). θ = β = δ = 0 için Rankine ile aynıdır. Pa duvara δ açısıyla etkir; yatay ve düşey bileşenler verilir. Devrilme ve kayma modüllerine girdi olur."
      fields={[
        { key: "birimHacimAgirlik_kNm3", label: "Birim Hacim Ağırlık γ (kN/m³)", type: "number", step: 0.5, min: 1 },
        { key: "yukseklik_m", label: "Duvar Yüksekliği H (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "icSurtunmeAcisi_derece", label: "İç Sürtünme Açısı φ (°)", type: "number", step: 1, min: 10 },
        { key: "duvarSurtunmeAcisi_derece", label: "Duvar Sürtünme Açısı δ (°)", type: "number", step: 1, min: 0 },
        { key: "duvarEgimi_derece", label: "Duvar Eğimi θ (°)", type: "number", step: 1, min: -30 },
        { key: "yuzeyEgimi_derece", label: "Dolgu Yüzeyi Eğimi β (°)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ birimHacimAgirlik_kNm3: 18, yukseklik_m: 4, icSurtunmeAcisi_derece: 30, duvarSurtunmeAcisi_derece: 20, duvarEgimi_derece: 0, yuzeyEgimi_derece: 0 }}
      mainUnit="kN/m"
      mainValueKey="aktifKuvvet_kNm"
      mainDecimals={2}
      intermediateLabels={{
        aktif_katsayi_Ka: "Aktif Katsayı Ka",
        yatay_bilesen_kNm: "Yatay Bileşen (kN/m)",
        dusey_bilesen_kNm: "Düşey Bileşen (kN/m)",
        etki_yuksekligi_m: "Etki Yüksekliği (taban üstü, m)",
        rankine_Ka_karsilastirma: "Rankine Ka (karşılaştırma)",
        not: "Not",
      }}
    />
  );
}
