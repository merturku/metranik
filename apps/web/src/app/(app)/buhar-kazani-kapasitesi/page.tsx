"use client";

import { buharKazaniKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BuharKazaniKapasitesiPage() {
  return (
    <CalcPage
      module={buharKazaniKapasitesi}
      standardsLabel="Fiziksel Formül"
      description="Kazanın ısıl gücünü, suyun buharlaşma gizli ısısını kullanarak kütlesel buhar üretim kapasitesine (kg/h) çevirir."
      formula="Buhar Kapasitesi = Güç × 3600 / Gizli Buharlaşma Isısı"
      engineeringNote="Gizli buharlaşma ısısı basınca göre değişir; atmosferik basınçta (100°C) yaklaşık 2257 kJ/kg'dır, doymuş buhar tablolarından işletme basıncına göre teyit edilmelidir."
      fields={[
        {
          key: "isilGuc_kW",
          label: "Isıl Güç (kW)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "gizliBuharlasmaIsisi_kJkg",
          label: "Gizli Buharlaşma Isısı (kJ/kg)",
          type: "number",
          min: 100,
          step: 1,
        },
      ]}
      defaults={{ isilGuc_kW: 500, gizliBuharlasmaIsisi_kJkg: 2257 }}
      mainUnit="kg/h"
      mainValueKey="buharKapasitesi_kgh"
      intermediateLabels={{ isilGuc_kJh: "Isıl Güç (kJ/h)" }}
    />
  );
}
