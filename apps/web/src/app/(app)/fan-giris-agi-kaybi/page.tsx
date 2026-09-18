"use client";

import { fanGirisAgiKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FanGirisAgiKaybiPage() {
  return (
    <CalcPage
      module={fanGirisAgiKaybi}
      standardsLabel="ASHRAE"
      description="Fan giriş ağı (filter, silencer vb) geçiş direncinden kaynaklanan statik basınç kaybını hesaplar."
      formula="ΔP = ζ × (ρ × V² / 2)"
      engineeringNote="Direnç katsayısı ζ tipik değerler: temiz filtre 0.3-0.5, kir tutmuş filtre 0.8-1.5, silencer 0.5-1.0. Fan mill gücü hesabında giriş ağı kaybı dikkate alınmalıdır."
      fields={[
        {
          key: "direnç_katsayisi_zeta",
          label: "Direnç Katsayısı ζ",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "hava_hizi_ms",
          label: "Hava Hızı (m/s)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
        {
          key: "hava_yoğunluğu_kgm3",
          label: "Hava Yoğunluğu (kg/m³)",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
      ]}
      defaults={{
        direnç_katsayisi_zeta: 0.8,
        hava_hizi_ms: 5,
        hava_yoğunluğu_kgm3: 1.2,
      }}
      mainUnit="Pa"
      mainValueKey="basınç_kaybı_Pa"
      mainDecimals={1}
      intermediateLabels={{
        dinamik_basınç_Pa: "Dinamik Basınç (Pa)",
      }}
    />
  );
}
