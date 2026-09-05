"use client";

import { yanginDolabiHortumMenzilKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanginDolabiHortumMenzilKontroluPage() {
  return (
    <CalcPage
      module={yanginDolabiHortumMenzilKontrolu}
      standardsLabel="Geometrik Kapsama Kontrolü"
      description="Hortum uzunluğu ve su jeti menzilinden yangın dolabının sağladığı toplam menzili hesaplar, kapsanması gereken mesafeyle karşılaştırır."
      formula="Sağlanan Menzil = Hortum Uzunluğu + Su Jeti Menzili"
      engineeringNote="Yangın Dolabı Debi/Basınç modülünün ürettiği debi/basıncın fiziksel olarak en uzak noktaya (oda/koridor köşegen mesafesi) ulaşıp ulaşmadığının geometrik kontrolüdür."
      fields={[
        {
          key: "hortumUzunlugu_m",
          label: "Hortum Uzunluğu (m)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "suJetiMenzili_m",
          label: "Su Jeti Menzili (m)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "kapsanmasiGerekenMesafe_m",
          label: "Kapsanması Gereken Mesafe (m)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        hortumUzunlugu_m: 15,
        suJetiMenzili_m: 6,
        kapsanmasiGerekenMesafe_m: 18,
      }}
      mainUnit="m"
      mainValueKey="saglananMenzil_m"
      mainDecimals={1}
      intermediateLabels={{
        kapsanmasiGerekenMesafe_m: "Kapsanması Gereken Mesafe (m)",
      }}
    />
  );
}
