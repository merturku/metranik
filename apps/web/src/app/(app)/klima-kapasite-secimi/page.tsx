"use client";

import { klimaKapasiteSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KlimaKapasiteSecimiPage() {
  return (
    <CalcPage
      module={klimaKapasiteSecimi}
      standardsLabel="Sektör Kuralı"
      description="Oda alanına ve kişi sayısına göre gerekli klima (split) soğutma kapasitesini ön boyutlandırma kuralıyla hesaplar."
      formula="BTU = Alan × Katsayı + Kişi Sayısı × 600"
      engineeringNote="600 BTU/m² sektörde yaygın bir ön boyutlandırma kuralıdır; güneşlenme, yalıtım ve tavan yüksekliği gerçek ihtiyacı değiştirebilir."
      fields={[
        { key: "alan_m2", label: "Oda Alanı (m²)", type: "number", min: 1, step: 1 },
        {
          key: "katsayi_BTU_m2",
          label: "BTU/m² Katsayısı (standart 600)",
          type: "number",
          min: 100,
          step: 50,
        },
        { key: "ekKisiSayisi", label: "Ek Kişi Sayısı", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ alan_m2: 20, katsayi_BTU_m2: 600, ekKisiSayisi: 0 }}
      mainUnit="BTU/h"
      mainValueKey="gerekliKapasite_BTU"
      intermediateLabels={{
        temelKapasite_BTU: "Temel Kapasite (BTU)",
        kisiEklemesi_BTU: "Kişi Eklemesi (BTU)",
      }}
    />
  );
}
