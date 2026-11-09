"use client";

import { suYogunluguIsilGenlesmeHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SuYogunluguIsilGenlesmeHacmiPage() {
  return (
    <CalcPage
      module={suYogunluguIsilGenlesmeHacmi}
      standardsLabel="Tanaka vd. (2001)"
      description="Saf suyun sıcaklığa göre yoğunluğunu ve kapalı devrede ısınmayla oluşan genleşme hacmini hesaplar."
      formula="ρ(T) = 999,975·[1 − (T + 288,9414)/(508929,2·(T + 68,12963))·(T − 3,9863)²];  ΔV = V·(ρ₁/ρ₂ − 1)"
      engineeringNote="Saf su içindir; glikol/inhibitör katkısı yoğunluğu değiştirir. Genleşme tankı boyutlandırması için Genleşme Tankı modülünü, ön basınç için Genleşme Tankı Ön Basıncı modülünü kullanın."
      fields={[
        { key: "sistemHacmi_L", label: "Sistem Su Hacmi (L)", type: "number", step: 10, min: 1 },
        { key: "baslangicSicakligi_C", label: "Başlangıç Sıcaklığı (°C)", type: "number", step: 1, min: 0 },
        { key: "sonSicaklik_C", label: "Son Sıcaklık (°C)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ sistemHacmi_L: 1000, baslangicSicakligi_C: 10, sonSicaklik_C: 80 }}
      mainUnit="L"
      mainValueKey="genlesmeHacmi_L"
      mainDecimals={1}
      intermediateLabels={{
        baslangic_yogunlugu_kgm3: "Başlangıç Yoğunluğu (kg/m³)",
        son_yogunluk_kgm3: "Son Yoğunluk (kg/m³)",
        genlesme_orani_yuzde: "Genleşme Oranı (%)",
      }}
    />
  );
}
