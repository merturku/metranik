"use client";

import { duvarYukuKirisUzeri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DuvarYukuKirisUzeriPage() {
  return (
    <CalcPage
      module={duvarYukuKirisUzeri}
      standardsLabel={"TS 498 (birim hacim ağırlıkları)"}
      description={"Duvar kalınlığı, yüksekliği, malzeme ve sıva birim ağırlığından kirişe gelen çizgisel duvar yükünü, boşluk (kapı-pencere) oranı düşülerek hesaplar."}
      formula={"q = (γd·t + 2·ts·γs)·h·(1 − boşluk oranı)"}
      engineeringNote={"Birim hacim ağırlıkları TS 498 tablolarından (tuğla, gazbeton, harç, sıva türüne göre) teyit edilerek girilmelidir; yaygın değerler boşluklu tuğla ≈ 8–9, gazbeton ≈ 5–7, sıva ≈ 19–21 kN/m³. İki yüzde sıva kalınlığı ts alınır. Kapı-pencere boşlukları için düşüm tutarlı bir yaklaşımdır; kiriş üstü yüksek yüklerde yerinde hesap gerekir."}
      fields={[
        { key: "kalinlik_m", label: "Duvar Kalınlığı t (m)", type: "number", step: 0.01, min: 0.05 },
        { key: "yukseklik_m", label: "Duvar Yüksekliği h (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "duvarGamma", label: "Duvar Birim Ağırlığı γd (kN/m³)", type: "number", step: 0.5, min: 1 },
        { key: "sivaKalinligi_m", label: "Sıva Kalınlığı / Yüz ts (m)", type: "number", step: 0.005, min: 0 },
        { key: "sivaGamma", label: "Sıva Birim Ağırlığı γs (kN/m³)", type: "number", step: 0.5, min: 1 },
        { key: "bosluk", label: "Kapı-Pencere Boşluk Oranı (0–1)", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ kalinlik_m: 0.19, yukseklik_m: 2.8, duvarGamma: 8, sivaKalinligi_m: 0.02, sivaGamma: 20, bosluk: 0.2 }}
      mainUnit={"kN/m"}
      mainValueKey={"duvarYuku_kNm"}
      mainDecimals={2}
      intermediateLabels={{
        birim_alan_yuku_kNm2: "Birim Alan Yükü (kN/m²)",
        bosluksuz_yuk_kNm: "Boşluksuz Yük (kN/m)",
      }}
    />
  );
}
