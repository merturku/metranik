"use client";

import { enerjiCo2Emisyonu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EnerjiCo2EmisyonuPage() {
  return (
    <CalcPage
      module={enerjiCo2Emisyonu}
      standardsLabel="IPCC 2006 Guidelines — yakıt yanması emisyon faktörleri"
      description="Yıllık elektrik ve doğalgaz tüketiminden kaynaklanan CO₂ emisyonunu emisyon faktörleriyle hesaplar."
      formula="E = kWh·f_elektrik + m³·f_doğalgaz"
      engineeringNote="Doğalgaz faktörü IPCC 2006'daki 56,1 kgCO₂/GJ ve yaklaşık 34,5 MJ/m³ değerinden ≈ 1,935 kgCO₂/m³'tür. Elektrik şebeke faktörü ülkeye ve yıla göre değişir; resmi güncel yayından (ör. ulusal enerji bakanlığı/şebeke işletmecisi) girilmelidir, varsayılan yalnız örnektir. Kapsam 2 (şebeke) ve doğrudan yanma dışındaki emisyonlar dahil değildir."
      fields={[
        { key: "elektrik_kWh", label: "Yıllık Elektrik (kWh)", type: "number", min: 0, step: 100 },
        { key: "elektrikFaktoru_kgkWh", label: "Elektrik Emisyon Faktörü (kgCO₂/kWh)", type: "number", min: 0, step: 0.01 },
        { key: "dogalgaz_m3", label: "Yıllık Doğalgaz (m³)", type: "number", min: 0, step: 50 },
        { key: "dogalgazFaktoru_kgm3", label: "Doğalgaz Emisyon Faktörü (kgCO₂/m³)", type: "number", min: 0, step: 0.01 },
      ]}
      defaults={{ elektrik_kWh: 3000, elektrikFaktoru_kgkWh: 0.45, dogalgaz_m3: 1000, dogalgazFaktoru_kgm3: 1.935 }}
      mainUnit="kgCO₂/yıl"
      mainValueKey="toplamEmisyon_kg"
      mainDecimals={0}
      intermediateLabels={{
        elektrik_emisyonu_kg: "Elektrik Emisyonu (kg)",
        dogalgaz_emisyonu_kg: "Doğalgaz Emisyonu (kg)",
        toplam_ton: "Toplam (ton CO₂)",
        elektrik_payi_yuzde: "Elektrik Payı (%)",
      }}
    />
  );
}
