"use client";

import { yanginSondurucuSayisiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanginSondurucuSayisiKontroluPage() {
  return (
    <CalcPage
      module={yanginSondurucuSayisiKontrolu}
      standardsLabel="NFPA 10"
      description="Alan ve birim kapsama alanından gerekli portatif yangın söndürücü sayısını hesaplar, mevcut sayıyla karşılaştırır."
      formula="Gerekli Sayı = ⌈Alan / Birim Kapsama Alanı⌉"
      engineeringNote="Birim kapsama alanı, tehlike sınıfına (hafif/orta/ağır) ve söndürücü kapasitesine göre değişir; tipik hafif tehlike (konut) için 2A sınıfı söndürücüde ~280 m². Yerelde TS 862/Binaların Yangından Korunması Yönetmeliği de benzer mantığı kullanır."
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
          step: 10,
        },
        {
          key: "mevcutSonducuruSayisi",
          label: "Mevcut Söndürücü Sayısı",
          type: "number",
          min: 0,
          step: 1,
        },
      ]}
      defaults={{
        alan_m2: 350,
        birimKapsamaAlani_m2: 280,
        mevcutSonducuruSayisi: 2,
      }}
      mainUnit="adet"
      mainValueKey="gerekliSayi"
      mainDecimals={0}
      intermediateLabels={{
        mevcutSonducuruSayisi: "Mevcut Söndürücü Sayısı",
      }}
    />
  );
}
