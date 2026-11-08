"use client";

import { boruDonmaSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruDonmaSuresiPage() {
  return (
    <CalcPage
      module={boruDonmaSuresi}
      standardsLabel="Toplu kapasite modeli"
      description="Durgun su dolu borunun, dış sıcaklığa maruz kaldığında donma sıcaklığına inme süresini ısıl zaman sabitiyle hesaplar."
      formula="C' = ρ·c·A;  τ = C'/U';  t = τ·ln[(Tᵢ − Tₑ)/(T_f − Tₑ)]"
      engineeringNote="Yalnız 0 °C'ye ulaşma süresidir; gizli ısı nedeniyle tam donma daha uzun sürer ancak çatlama riski 0 °C'den itibaren başlar. U' boyca ısı kaybı katsayısıdır (W/m·K); izolasyonlu boru için Boru Isı Kaybı modülüyle bulunabilir, rüzgâr U'yu artırır. Boru çeperi ısı kapasitesi ihmal edilmiştir. 6 ve 24 saat eşikleri pratik değerlerdir."
      fields={[
        { key: "icCap_mm", label: "Boru İç Çapı (mm)", type: "number", step: 1, min: 1 },
        { key: "boyIsiKaybiKatsayisi_WmK", label: "Boyca Isı Kaybı U' (W/m·K)", type: "number", step: 0.05, min: 0.001 },
        { key: "baslangicSicakligi_C", label: "Başlangıç Su Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "disSicaklik_C", label: "Dış Ortam Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "donmaSicakligi_C", label: "Donma Sıcaklığı (°C)", type: "number", step: 1 },
      ]}
      defaults={{ icCap_mm: 25, boyIsiKaybiKatsayisi_WmK: 0.5, baslangicSicakligi_C: 15, disSicaklik_C: -10, donmaSicakligi_C: 0 }}
      mainUnit="saat"
      mainValueKey="sure_saat"
      mainDecimals={2}
      intermediateLabels={{
        zaman_sabiti_saat: "Zaman Sabiti τ (saat)",
        boy_basina_isil_kapasite_JmK: "Boy Başına Isıl Kapasite (J/m·K)",
        sure_dakika: "Süre (dk)",
        not: "Not",
      }}
    />
  );
}
