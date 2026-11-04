"use client";

import { sogutmaKapasitesiBirimDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SogutmaKapasitesiBirimDonusumuPage() {
  return (
    <CalcPage
      module={sogutmaKapasitesiBirimDonusumu}
      standardsLabel="Birim dönüşümü (1 TR = 3,51685 kW)"
      description="Soğutma kapasitesini kW cinsinden TR, BTU/h, kcal/h ve W birimlerine çevirir."
      formula="TR = kW/3,51685;   BTU/h = kW·3412,14;   kcal/h = kW·1000/1,163"
      engineeringNote="1 TR (ton of refrigeration) = 12 000 BTU/h olarak alınmıştır. Klima etiketlerindeki BTU değerleri çoğunlukla nominal soğutma kapasitesidir; seçim için gerçek yük hesabını (Soğutma Yükü) kullanın."
      fields={[
        { key: "kapasite_kW", label: "Kapasite (kW)", type: "number", step: 1, min: 0.001 },
      ]}
      defaults={{ kapasite_kW: 35.1685 }}
      mainUnit="TR"
      mainValueKey="kapasite_TR"
      mainDecimals={2}
      intermediateLabels={{
        kapasite_BTUh: "BTU/h",
        kapasite_kcalh: "kcal/h",
        kapasite_kBTUh: "kBTU/h",
        kapasite_W: "W",
      }}
    />
  );
}
