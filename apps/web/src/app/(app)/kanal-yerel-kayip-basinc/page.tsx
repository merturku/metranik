"use client";

import { kanalYerelKayipBasinc } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalYerelKayipBasincPage() {
  return (
    <CalcPage
      module={kanalYerelKayipBasinc}
      standardsLabel="ASHRAE Fundamentals — Duct Design"
      description="Kanal fitinglerinin (dirsek, çatal, daralma) toplam kayıp katsayısından ve hızdan yerel basınç kaybını hesaplar."
      formula="v = Q/A;  ΔP = ΣC · ρv²/2"
      engineeringNote="C katsayıları ilgili fiting tablosundan okunup toplanır (mühendis girdisi). Sürtünme kaybı Kanal Sürtünme Basınç Kaybı modülündedir; fan seçimi için ikisi toplanır. Hız her fiting için farklıysa fiting başına hesaplayıp toplayın."
      fields={[
        { key: "debi_m3h", label: "Debi (m³/h)", type: "number", step: 50, min: 1 },
        { key: "kesitAlani_m2", label: "Kanal Kesit Alanı (m²)", type: "number", step: 0.01, min: 0.0001 },
        { key: "kayipKatsayilariToplami", label: "Toplam Kayıp Katsayısı ΣC", type: "number", step: 0.1, min: 0 },
        { key: "yogunluk_kgm3", label: "Hava Yoğunluğu (kg/m³)", type: "number", step: 0.01, min: 0.5 },
      ]}
      defaults={{ debi_m3h: 3600, kesitAlani_m2: 0.25, kayipKatsayilariToplami: 1.5, yogunluk_kgm3: 1.2 }}
      mainUnit="Pa"
      mainValueKey="yerelKayip_Pa"
      mainDecimals={1}
      intermediateLabels={{
        hiz_ms: "Hava Hızı (m/s)",
        dinamik_basinc_Pa: "Dinamik Basınç (Pa)",
      }}
    />
  );
}
