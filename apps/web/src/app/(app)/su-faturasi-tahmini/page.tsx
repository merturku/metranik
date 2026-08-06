"use client";

import { suFaturasiTahmini } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SuFaturasiTahminiPage() {
  return (
    <CalcPage
      module={suFaturasiTahmini}
      standardsLabel="Pratik Formül"
      description="Aylık su tüketimi ve birim fiyata göre basit bir fatura tahmini yapar."
      formula="Tutar = Tüketim (m³) × Birim Fiyat (TL/m³)"
      engineeringNote="Atık su/kanalizasyon bedeli ve kademeli tarife bu basit hesaba dahil değildir; gerçek fatura bu kalemlerle daha yüksek çıkar."
      fields={[
        {
          key: "aylikTuketim_m3",
          label: "Aylık Tüketim (m³)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "birimFiyat_TLm3",
          label: "Birim Fiyat (TL/m³)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ aylikTuketim_m3: 15, birimFiyat_TLm3: 45 }}
      mainUnit="TL"
      mainValueKey="tahminiTutar_TL"
      intermediateLabels={{ birimFiyat_TLm3: "Birim Fiyat (TL/m³)" }}
    />
  );
}
