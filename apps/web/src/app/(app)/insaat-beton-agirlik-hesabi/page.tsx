"use client";
import { CalcPage } from "@/components/calc-page";
import { betonAğirlikHesabi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={betonAğirlikHesabi}
      standardsLabel="TS EN 206"
      description="Beton hacmi ve birim hacim ağırlığından toplam beton ağırlığını hesaplar."
      formula="G = V × ρ"
      engineeringNote="TS EN 206'ya göre normal beton 2000-2600 kg/m³ aralığındadır; donatılı betonarme için yük hesabında genellikle ~2500 kg/m³ (25 kN/m³) alınır. Hafif veya ağır agregalı betonlarda üretici değeri kullanılmalıdır."
      fields={[
        { key: "hacim_m3", label: "Beton Hacmi (m³)", type: "number", min: 0.1, step: 1 },
        { key: "yoğunluk_kgm3", label: "Birim Hacim Ağırlığı (kg/m³)", type: "number", min: 500, step: 50 },
      ]}
      defaults={{ hacim_m3: 10, yoğunluk_kgm3: 2400 }}
      mainUnit="ton"
      mainValueKey="agirlik_ton"
      mainDecimals={2}
      intermediateLabels={{ agirlik_kg: "Ağırlık (kg)", yogunluk_kgm3: "Birim Hacim Ağırlığı (kg/m³)" }}
    />
  );
}
