"use client";
import { CalcPage } from "@/components/calc-page";
import { evEnerjiTahminYillik } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={evEnerjiTahminYillik}
      standardsLabel="Tüketim × Birim Fiyat"
      description="Ortalama aylık elektrik tüketimi ve birim fiyattan yıllık faturayı, varsa peşin ödeme indirimiyle birlikte tahmin eder."
      formula="Fatura = Aylık tüketim × 12 × Birim fiyat × (1 − İndirim/100)"
      engineeringNote="Birim fiyata vergi ve fonları dahil edin. Kademeli tarifelerde ve mevsimsel tüketim farkı büyükse aylık ortalama yerine ay ay hesap daha doğru sonuç verir."
      fields={[
        { key: "ortalama_tüketim_kwh_ay", label: "Ortalama Aylık Tüketim (kWh)", type: "number", min: 1, step: 10 },
        { key: "birim_fiyat_tlkwh", label: "Birim Fiyat (TL/kWh)", type: "number", min: 0.01, step: 0.1 },
        { key: "peşin_indirim_yuzde", label: "Peşin Ödeme İndirimi (%)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{
        ortalama_tüketim_kwh_ay: 250,
        birim_fiyat_tlkwh: 3,
        peşin_indirim_yuzde: 0,
      }}
      mainUnit="TL"
      mainValueKey="net_fatura_TL"
      mainDecimals={0}
      intermediateLabels={{
        yillik_tuketim_kWh: "Yıllık Tüketim (kWh)",
        brut_fatura_TL: "İndirimsiz Fatura (TL)",
        indirim_yuzde: "İndirim (%)",
      }}
    />
  );
}
