"use client";

import { elektrikFaturaTahmini } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ElektrikFaturaTahminiPage() {
  return (
    <CalcPage
      module={elektrikFaturaTahmini}
      standardsLabel="Basit Tahmin"
      description="Aylık tüketim ve birim fiyata göre elektrik faturanızın kaba tutarını tahmin eder."
      formula="Tutar = Tüketim (kWh) × Birim Fiyat (TL/kWh)"
      engineeringNote="Bu basit hesap dağıtım bedeli, kademeli tarife ve vergileri (BTV, KDV) içermez; gerçek fatura genellikle bu tahminden daha yüksek çıkar. Kesin tutar için dağıtım şirketinizin güncel tarife tablosunu kullanın."
      fields={[
        {
          key: "aylikTuketim_kWh",
          label: "Aylık Tüketim (kWh)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "birimFiyat_TLkWh",
          label: "Birim Fiyat (TL/kWh)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
      ]}
      defaults={{ aylikTuketim_kWh: 350, birimFiyat_TLkWh: 2.85 }}
      mainUnit="TL"
      mainValueKey="tahminiTutar_TL"
      intermediateLabels={{ birimFiyat_TLkWh: "Birim Fiyat (TL/kWh)" }}
    />
  );
}
