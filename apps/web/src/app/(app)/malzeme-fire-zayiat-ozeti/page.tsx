"use client";

import { malzemeFireZayiatOzeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MalzemeFireZayiatOzetiPage() {
  return (
    <CalcPage
      module={malzemeFireZayiatOzeti}
      standardsLabel="Pratik Formül"
      description="Teorik (net) malzeme miktarı üzerine kesim, kırılma ve artık kayıplarını karşılayan fire oranı ekleyerek satın alınması gereken brüt miktarı hesaplar."
      formula="Gerekli Miktar = Teorik Miktar × (1 + Fire Oranı)"
      engineeringNote="Fire oranı malzeme tipine ve uygulama yöntemine göre değişir (örn. seramik kesimi %5-10, demir donatı bindirme %3-5); proje şartnamesindeki değer esas alınmalıdır."
      fields={[
        {
          key: "teorikMiktar",
          label: "Teorik (Net) Miktar",
          type: "number",
          min: 0.1,
          step: 1,
        },
        {
          key: "fireOrani_yuzde",
          label: "Fire Oranı (%)",
          type: "number",
          min: 0,
          step: 0.5,
        },
      ]}
      defaults={{ teorikMiktar: 1000, fireOrani_yuzde: 8 }}
      mainUnit="birim"
      mainValueKey="gerekliMiktar"
      intermediateLabels={{ fireMiktari: "Fire Miktarı" }}
    />
  );
}
