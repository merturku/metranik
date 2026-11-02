"use client";

import { donatiCeligiMetraji } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DonatiCeligiMetrajiPage() {
  return (
    <CalcPage
      module={donatiCeligiMetraji}
      standardsLabel="TS 708 — Betonarme çelikleri (nominal birim kütle)"
      description="Donatı çapı, adet ve boydan çelik ağırlığını hesaplar; fire/bindirme payıyla satın alma miktarını verir."
      formula="m = π/4·d²·7850·n·L·(1 + fire/100)   (≈ 0,00617·d² kg/m)"
      engineeringNote="Birim kütle teorik (7850 kg/m³) değerdir; TS 708 izin verilen kütle sapmalarını ayrıca tanımlar. Kanca, bindirme ve etriye boyları kesim listesinden girilmelidir. Farklı çaplar için ayrı hesaplayıp toplayın."
      fields={[
        { key: "cap_mm", label: "Donatı Çapı (mm)", type: "number", min: 6, step: 1 },
        { key: "adet", label: "Adet", type: "number", min: 1, step: 1 },
        { key: "boy_m", label: "Boy (m)", type: "number", min: 0.1, step: 0.5 },
        { key: "fireYuzde", label: "Fire / Bindirme Payı (%)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ cap_mm: 12, adet: 10, boy_m: 6, fireYuzde: 5 }}
      mainUnit="kg (brüt ağırlık)"
      mainValueKey="agirlik_kg"
      mainDecimals={1}
      intermediateLabels={{
        birim_agirlik_kgm: "Birim Ağırlık (kg/m)",
        toplam_boy_m: "Toplam Boy (m)",
        net_agirlik_kg: "Net Ağırlık (kg)",
        brut_agirlik_ton: "Brüt Ağırlık (ton)",
        fire_kg: "Fire (kg)",
      }}
    />
  );
}
