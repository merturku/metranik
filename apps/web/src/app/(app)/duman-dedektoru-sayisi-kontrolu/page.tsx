"use client";

import { dumanDedektoruSayisiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DumanDedektoruSayisiKontroluPage() {
  return (
    <CalcPage
      module={dumanDedektoruSayisiKontrolu}
      standardsLabel="NFPA 72"
      description="Alan ve birim kapsama alanından gerekli duman dedektörü sayısını hesaplar, mevcut sayıyla karşılaştırır."
      formula="Gerekli Sayı = ⌈Alan / Birim Kapsama Alanı⌉"
      engineeringNote="Konut tipi noktasal duman dedektörlerinde tipik kapsama alanı ~40 m² (yaklaşık 9 m aralık kuralına karşılık gelir). Yangın Söndürücü Sayısı ve Kapsama Kontrolü modülüyle aynı mantığı, farklı bir yaşam güvenliği ekipmanına uygular."
      fields={[
        {
          key: "alan_m2",
          label: "Alan (m²)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "birimKapsamaAlani_m2",
          label: "Birim Kapsama Alanı (m²)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "mevcutDedektorSayisi",
          label: "Mevcut Dedektör Sayısı",
          type: "number",
          min: 0,
          step: 1,
        },
      ]}
      defaults={{
        alan_m2: 120,
        birimKapsamaAlani_m2: 40,
        mevcutDedektorSayisi: 3,
      }}
      mainUnit="adet"
      mainValueKey="gerekliSayi"
      mainDecimals={0}
      intermediateLabels={{
        mevcutDedektorSayisi: "Mevcut Dedektör Sayısı",
      }}
    />
  );
}
