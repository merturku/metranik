"use client";

import { yakitTuketimiLpgPeletOdun } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YakitTuketimiLpgPeletOdunPage() {
  return (
    <CalcPage
      module={yakitTuketimiLpgPeletOdun}
      standardsLabel="EN ISO 17225-2 (pelet) — alt ısıl değerler tipik"
      description="Yıllık ısı ihtiyacından LPG, pelet veya odun miktarını, paket sayısını ve yıllık yakıt maliyetini hesaplar."
      formula="m = Q_yıllık/(Hu·η);   Hu: LPG 12,8, pelet 4,6, odun ≈ 4,0 kWh/kg"
      engineeringNote="Alt ısıl değerler tipiktir: LPG ≈ 46 MJ/kg, pelet EN ISO 17225-2 A1 asgari 4,6 kWh/kg, kuru odun (%15–20 nem) ≈ 4,0 kWh/kg; ürün etiketinden teyit edin. Sistem verimi soba/kazan sınıfına bağlıdır (pelet kazanı ≈ 0,85–0,92, odun sobası ≈ 0,7–0,8). Yıllık ısı ihtiyacı Isı Yükü ve İç Sıcaklık Düşürme modüllerinden tahmin edilebilir. Doğalgaz için Isıtma Yakıt Tüketimi & Maliyeti modülüne bakın."
      fields={[
        { key: "yillikIsiIhtiyaci_kWh", label: "Yıllık Isı İhtiyacı (kWh)", type: "number", min: 1, step: 500 },
        {
          key: "yakitTuru",
          label: "Yakıt Türü",
          type: "select",
          options: [
            { value: "pelet", label: "Ahşap Pelet (4,6 kWh/kg)" },
            { value: "lpg", label: "LPG (12,8 kWh/kg)" },
            { value: "odun", label: "Kuru Odun (4,0 kWh/kg)" },
          ],
        },
        { key: "sistemVerimi", label: "Sistem Verimi (0–1)", type: "number", min: 0.1, step: 0.05 },
        { key: "yakitFiyati_TLkg", label: "Yakıt Fiyatı (₺/kg)", type: "number", min: 0, step: 0.5 },
        { key: "paketAgirligi_kg", label: "Paket Ağırlığı (kg — tüp/torba)", type: "number", min: 1, step: 1 },
      ]}
      defaults={{ yillikIsiIhtiyaci_kWh: 15000, yakitTuru: "pelet", sistemVerimi: 0.85, yakitFiyati_TLkg: 10, paketAgirligi_kg: 15 }}
      mainUnit="kg/yıl (yakıt)"
      mainValueKey="yakitMiktari_kg"
      mainDecimals={0}
      intermediateLabels={{
        alt_isil_deger_kWhkg: "Alt Isıl Değer (kWh/kg)",
        yakit_ton: "Yakıt (ton)",
        paket_sayisi: "Paket (Tüp/Torba) Sayısı",
        yillik_maliyet_TL: "Yıllık Maliyet (₺)",
        birim_isi_maliyeti_TLkWh: "Birim Isı Maliyeti (₺/kWh)",
      }}
    />
  );
}
