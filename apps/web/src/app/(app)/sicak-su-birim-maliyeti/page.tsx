"use client";

import { sicakSuBirimMaliyeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SicakSuBirimMaliyetiPage() {
  return (
    <CalcPage
      module={sicakSuBirimMaliyeti}
      standardsLabel="Enerji dengesi (m·cp·ΔT/η)"
      description="Şebeke suyunu hedef sıcaklığa ısıtmanın birim maliyetini (₺/m³, ₺/litre) ve aylık enerji ile maliyeti hesaplar."
      formula="E = ρ·cp·ΔT/(3600·η)   [kWh/m³];   Maliyet = E × fiyat"
      engineeringNote="Doğalgaz için fiyatı kWh'e çevirin (₺/m³ ÷ ~9,59 kWh/m³); elektrikli boylerde verim ≈ 0,95, yoğuşmalı kombide ≈ 0,9–1,0 alınabilir. Depo ve dolaşım kayıpları ayrıca eklenmelidir (Boyler Isınma Süresi, Boru Isı Kaybı modülleri). Enerji tarifesi güncel fatura veya tarife tablosundan girilmelidir."
      fields={[
        { key: "soguklukSuSicakligi_C", label: "Şebeke Suyu Sıcaklığı (°C)", type: "number", min: 0, step: 1 },
        { key: "sicakSuSicakligi_C", label: "Hedef Sıcak Su Sıcaklığı (°C)", type: "number", min: 30, step: 1 },
        { key: "cihazVerimi", label: "Cihaz Verimi (0–1)", type: "number", min: 0.1, step: 0.05 },
        { key: "enerjiFiyati_TLkWh", label: "Enerji Birim Fiyatı (₺/kWh)", type: "number", min: 0, step: 0.1 },
        { key: "aylikSicakSuHacmi_m3", label: "Aylık Sıcak Su Hacmi (m³)", type: "number", min: 0.1, step: 0.5 },
      ]}
      defaults={{ soguklukSuSicakligi_C: 10, sicakSuSicakligi_C: 55, cihazVerimi: 0.9, enerjiFiyati_TLkWh: 3, aylikSicakSuHacmi_m3: 4 }}
      mainUnit="₺/m³ (sıcak su)"
      mainValueKey="birimMaliyet_TLm3"
      mainDecimals={1}
      intermediateLabels={{
        sicaklik_farki_K: "Sıcaklık Farkı (K)",
        birim_enerji_kWh_m3: "Birim Enerji (kWh/m³)",
        litre_basi_maliyet_TL: "Litre Başı Maliyet (₺)",
        aylik_enerji_kWh: "Aylık Enerji (kWh)",
        aylik_maliyet_TL: "Aylık Maliyet (₺)",
      }}
    />
  );
}
