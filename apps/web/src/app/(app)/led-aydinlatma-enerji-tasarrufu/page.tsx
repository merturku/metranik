"use client";

import { ledAydinlatmaEnerjiTasarrufu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function LedAydinlatmaEnerjiTasarrufuPage() {
  return (
    <CalcPage
      module={ledAydinlatmaEnerjiTasarrufu}
      standardsLabel="Basit Enerji Tasarrufu Hesabı"
      description="Eski ve yeni armatür gücü, günlük çalışma süresi ve birim fiyata göre LED dönüşümünün yıllık enerji ve maliyet tasarrufunu hesaplar."
      formula="Yıllık Tasarruf = (Peski-Pyeni) × günlük saat × yıllık gün × Birim Fiyat"
      engineeringNote="Aynı ortam aydınlık düzeyini (lüks) korumak için armatür seçimi ışık akısına (lümen) göre yapılmalıdır; sadece güç karşılaştırması yeterli değildir."
      fields={[
        {
          key: "eskiArmaturGucu_W",
          label: "Eski Armatür Gücü (W)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "yeniArmaturGucu_W",
          label: "Yeni (LED) Armatür Gücü (W)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "gunlukCalismaSuresi_saat",
          label: "Günlük Çalışma Süresi (saat)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "yillikGunSayisi",
          label: "Yıllık Çalışma Gün Sayısı",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "birimFiyat_TLkWh",
          label: "Birim Fiyat (TL/kWh)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
      ]}
      defaults={{
        eskiArmaturGucu_W: 60,
        yeniArmaturGucu_W: 9,
        gunlukCalismaSuresi_saat: 5,
        yillikGunSayisi: 365,
        birimFiyat_TLkWh: 2.85,
      }}
      mainUnit="TL/yıl"
      mainValueKey="yillikTasarruf_TL"
      intermediateLabels={{
        gucFarki_kW: "Güç Farkı (kW)",
        yillikEnerji_kWh: "Yıllık Enerji Tasarrufu (kWh)",
      }}
    />
  );
}
