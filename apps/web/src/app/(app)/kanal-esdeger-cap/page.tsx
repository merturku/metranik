"use client";

import { kanalEsdegerCap } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalEsdegerCapPage() {
  return (
    <CalcPage
      module={kanalEsdegerCap}
      standardsLabel="ASHRAE/SMACNA Eşit Sürtünme Yöntemi"
      description="Dikdörtgen kanal kenar ölçülerinden, aynı debide aynı birim uzunluk sürtünme kaybını veren dairesel eşdeğer çapı hesaplar."
      formula="Deq = 1.30×(a×b)^0.625 / (a+b)^0.25"
      engineeringNote="Kanal Boyutlandırma modülü dairesel kanal çapını doğrudan süreklilik denkleminden (Q=V×A) hesaplar; bu modül alan kısıtı nedeniyle seçilen dikdörtgen kanalın sürtünme kaybı hesaplarında (Kanal Sürtünme Basınç Kaybı) kullanılacak eşdeğer çapı üretir."
      fields={[
        {
          key: "kanalGenisligi_a_mm",
          label: "Kanal Genişliği a (mm)",
          type: "number",
          min: 50,
          step: 10,
        },
        {
          key: "kanalYuksekligi_b_mm",
          label: "Kanal Yüksekliği b (mm)",
          type: "number",
          min: 50,
          step: 10,
        },
      ]}
      defaults={{
        kanalGenisligi_a_mm: 400,
        kanalYuksekligi_b_mm: 300,
      }}
      mainUnit="mm"
      mainValueKey="esdegerCap_Deq_mm"
      mainDecimals={1}
      intermediateLabels={{
        kesitAlani_mm2: "Kesit Alanı (mm²)",
      }}
    />
  );
}
