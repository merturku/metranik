"use client";

import { kanalSacAgirligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalSacAgirligiPage() {
  return (
    <CalcPage
      module={kanalSacAgirligi}
      standardsLabel="SMACNA — sac kalınlığı tablosu (girdi) / geometrik ağırlık"
      description="Dikdörtgen hava kanalının sac yüzey alanını ve galvaniz sac ağırlığını hesaplar; fire payı ekleyerek sipariş miktarını verir."
      formula="A = 2(a + b)·L;   m = A·t·7850·(1 + fire)"
      engineeringNote="Sac kalınlığı kanal büyük kenarına ve basınç sınıfına göre SMACNA veya üretici tablosundan girilir. Flanş, köşebent, bağlantı elemanları, yalıtım ve çinko kaplama ağırlığı dahil değildir. Askı yükü için Kanal Askı Malzeme Metrajı ve Askılama Hesabı modüllerine bakın."
      fields={[
        { key: "genislik_mm", label: "Kanal Genişliği a (mm)", type: "number", min: 50, step: 50 },
        { key: "yukseklik_mm", label: "Kanal Yüksekliği b (mm)", type: "number", min: 50, step: 50 },
        { key: "uzunluk_m", label: "Kanal Uzunluğu (m)", type: "number", min: 0.1, step: 1 },
        { key: "sacKalinligi_mm", label: "Sac Kalınlığı t (mm)", type: "number", min: 0.3, step: 0.1 },
        { key: "fireYuzde", label: "Fire Payı (%)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ genislik_mm: 600, yukseklik_mm: 400, uzunluk_m: 10, sacKalinligi_mm: 0.8, fireYuzde: 10 }}
      mainUnit="kg (fireli sac ağırlığı)"
      mainValueKey="agirlik_kg"
      mainDecimals={1}
      intermediateLabels={{
        sac_alani_m2: "Sac Alanı (m²)",
        net_agirlik_kg: "Net Ağırlık (kg)",
        birim_uzunluk_agirligi_kgm: "Birim Uzunluk Ağırlığı (kg/m)",
        birim_alan_agirligi_kgm2: "Birim Alan Ağırlığı (kg/m²)",
      }}
    />
  );
}
