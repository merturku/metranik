"use client";

import { engellenmisIsilGerilme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EngellenmisIsilGerilmePage() {
  return (
    <CalcPage
      module={engellenmisIsilGerilme}
      standardsLabel="Hooke yasası"
      description="Sıcaklık değişiminde genleşmesi engellenmiş çubuk, boru veya rayda oluşan gerilmeyi ve eksenel kuvveti akma dayanımıyla karşılaştırır."
      formula="ε = α·ΔT;  σ = E·α·ΔT;  F = σ·A"
      engineeringNote="Tam engellenme üst sınır gerilmesini verir; gerçek mesnetler kısmen esnektir. Basınç durumunda burkulma ayrıca kontrol edilmelidir (Euler Kritik Burkulma Yükü modülü). Çelik için E ≈ 210000 MPa, α ≈ 12·10⁻⁶ 1/K."
      fields={[
        { key: "elastisiteModulu_MPa", label: "Elastisite Modülü E (MPa)", type: "number", step: 1000, min: 1 },
        { key: "genlesmeKatsayisi_1e6", label: "Genleşme Katsayısı α (10⁻⁶ 1/K)", type: "number", step: 0.5, min: 0.01 },
        { key: "sicaklikFarki_K", label: "Sıcaklık Farkı ΔT (K)", type: "number", step: 1 },
        { key: "kesitAlani_mm2", label: "Kesit Alanı (mm²)", type: "number", step: 10, min: 1 },
        { key: "akmaDayanimi_MPa", label: "Akma Dayanımı (MPa)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ elastisiteModulu_MPa: 210000, genlesmeKatsayisi_1e6: 12, sicaklikFarki_K: 40, kesitAlani_mm2: 1000, akmaDayanimi_MPa: 235 }}
      mainUnit="MPa"
      mainValueKey="gerilme_MPa"
      mainDecimals={1}
      intermediateLabels={{
        isil_sekil_degistirme: "Isıl Şekil Değiştirme",
        eksenel_kuvvet_kN: "Eksenel Kuvvet (kN)",
        akma_orani: "Gerilme / Akma",
        etki: "Etki",
      }}
    />
  );
}
