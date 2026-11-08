"use client";

import { pompaManometrikYukseklikOlcumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaManometrikYukseklikOlcumuPage() {
  return (
    <CalcPage
      module={pompaManometrikYukseklikOlcumu}
      standardsLabel="Bernoulli · ISO 9906"
      description="Pompa emme ve basma manometre okumalarından, kot farkı ve hız yüksekliği farkını da katarak manometrik (toplam) yüksekliği hesaplar."
      formula="H = (p_b − p_e)/(ρ·g) + (z_b − z_e) + (v_b² − v_e²)/(2g)"
      engineeringNote="Okumalar gösterge basıncıdır (bar); emme tarafında vakum negatif girilir. Kot farkı manometre eksenleri arasıdır. Hızlar Q/A ile bulunur. Sonucu aynı debide üretici eğrisiyle karşılaştırın (ISO 9906 toleransı); Pompa Hidrolik Gücü modülüne H girdisi olur."
      fields={[
        { key: "basmaBasinci_bar", label: "Basma Manometresi (bar)", type: "number", step: 0.1 },
        { key: "emmeBasinci_bar", label: "Emme Manometresi (bar)", type: "number", step: 0.1 },
        { key: "kotFarki_m", label: "Manometre Kot Farkı (m)", type: "number", step: 0.1 },
        { key: "basmaHizi_ms", label: "Basma Hızı (m/s)", type: "number", step: 0.1, min: 0 },
        { key: "emmeHizi_ms", label: "Emme Hızı (m/s)", type: "number", step: 0.1, min: 0 },
        { key: "yogunluk_kgm3", label: "Akışkan Yoğunluğu (kg/m³)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ basmaBasinci_bar: 5, emmeBasinci_bar: 0.5, kotFarki_m: 0.4, basmaHizi_ms: 2.5, emmeHizi_ms: 1.5, yogunluk_kgm3: 998 }}
      mainUnit="m"
      mainValueKey="manometrikYukseklik_m"
      mainDecimals={2}
      intermediateLabels={{
        basinc_yuksekligi_m: "Basınç Yüksekliği (m)",
        kot_farki_m: "Kot Farkı (m)",
        hiz_yuksekligi_farki_m: "Hız Yüksekliği Farkı (m)",
        toplam_basinc_farki_bar: "Eşdeğer Basınç Farkı (bar)",
      }}
    />
  );
}
