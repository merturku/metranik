"use client";

import { dogalgazFaturaTahmini } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DogalgazFaturaTahminiPage() {
  return (
    <CalcPage
      module={dogalgazFaturaTahmini}
      standardsLabel="Standart atfı yok"
      description="Aylık doğalgaz tüketimini (m³) enerjiye (kWh) çevirip birim fiyat, sabit bedel ve vergiyle fatura tutarını tahmin eder."
      formula="kWh = m³·Hu;  Tutar = (kWh·fiyat + sabit bedel)·(1 + vergi)"
      engineeringNote="Alt ısıl değer ve birim fiyat dağıtım şirketinin faturasından alınmalıdır; varsayılan Hu ≈ 9,59 kWh/m³ (≈ 8250 kcal/m³) yaklaşık değerdir. Fiyatlar ve vergiler tarife dönemine göre değişir; tahmin amaçlıdır."
      fields={[
        { key: "tuketim_m3", label: "Tüketim (m³)", type: "number", step: 1, min: 0 },
        { key: "isilDeger_kWhm3", label: "Isıl Değer Hu (kWh/m³)", type: "number", step: 0.01, min: 1 },
        { key: "birimFiyat_TLkWh", label: "Birim Fiyat (₺/kWh)", type: "number", step: 0.01, min: 0 },
        { key: "sabitBedel_TL", label: "Sabit Bedel (₺)", type: "number", step: 1, min: 0 },
        { key: "vergi_yuzde", label: "Vergi (KDV vb., %)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ tuketim_m3: 100, isilDeger_kWhm3: 9.59, birimFiyat_TLkWh: 2.5, sabitBedel_TL: 0, vergi_yuzde: 20 }}
      mainUnit="₺"
      mainValueKey="toplamTutar_TL"
      mainDecimals={2}
      intermediateLabels={{
        enerji_kWh: "Enerji (kWh)",
        vergisiz_tutar_TL: "Vergisiz Tutar (₺)",
        vergi_tutari_TL: "Vergi Tutarı (₺)",
        m3_basina_maliyet_TL: "m³ Başına Maliyet (₺)",
      }}
    />
  );
}
