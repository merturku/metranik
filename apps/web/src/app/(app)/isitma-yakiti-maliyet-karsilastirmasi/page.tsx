"use client";

import { isitmaYakitiMaliyetKarsilastirmasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsitmaYakitiMaliyetKarsilastirmasiPage() {
  return (
    <CalcPage
      module={isitmaYakitiMaliyetKarsilastirmasi}
      standardsLabel="Faydalı ısı birim maliyeti (fiyat / (Hu·η))"
      description="Doğalgaz, elektrik, ısı pompası, pelet ve LPG için faydalı ısının kWh başına maliyetini hesaplar ve en ucuz seçeneği gösterir."
      formula="c = fiyat/(Hu·η);   elektrik direnç: fiyat;   ısı pompası: fiyat/SCOP   (Hu: gaz 9,59 kWh/m³, pelet 4,6, LPG 12,8 kWh/kg)"
      engineeringNote="Girilen fiyatlar yalnız örnektir; güncel tarife ve fiyatlarla değiştirin. Karşılaştırma yakıt maliyetidir — yatırım, bakım ve altyapı (baca, depo) maliyetleri ayrıca değerlendirilmelidir. Isı pompası SCOP'u Isı Pompası Mevsimsel Performans modülüyle belirlenebilir."
      fields={[
        { key: "dogalgazFiyati_TLm3", label: "Doğalgaz Fiyatı (₺/m³)", type: "number", min: 0, step: 0.5 },
        { key: "kombiVerimi", label: "Kombi Verimi (0–1)", type: "number", min: 0.1, step: 0.01 },
        { key: "elektrikFiyati_TLkWh", label: "Elektrik Fiyatı (₺/kWh)", type: "number", min: 0, step: 0.1 },
        { key: "isiPompasiSCOP", label: "Isı Pompası SCOP", type: "number", min: 1.1, step: 0.1 },
        { key: "peletFiyati_TLkg", label: "Pelet Fiyatı (₺/kg)", type: "number", min: 0, step: 0.5 },
        { key: "peletVerimi", label: "Pelet Sistem Verimi (0–1)", type: "number", min: 0.1, step: 0.01 },
        { key: "lpgFiyati_TLkg", label: "LPG Fiyatı (₺/kg)", type: "number", min: 0, step: 1 },
        { key: "lpgVerimi", label: "LPG Cihaz Verimi (0–1)", type: "number", min: 0.1, step: 0.01 },
      ]}
      defaults={{ dogalgazFiyati_TLm3: 8, kombiVerimi: 0.92, elektrikFiyati_TLkWh: 3, isiPompasiSCOP: 3.5, peletFiyati_TLkg: 10, peletVerimi: 0.85, lpgFiyati_TLkg: 40, lpgVerimi: 0.9 }}
      mainUnit="₺/kWh (en ucuz seçenek)"
      mainValueKey="enUcuzBirimMaliyet_TLkWh"
      mainDecimals={2}
      intermediateLabels={{
        en_ucuz_secenek: "En Ucuz Seçenek",
        dogalgaz_TLkWh: "Doğalgaz (₺/kWh)",
        elektrik_direnc_TLkWh: "Elektrik Direnç (₺/kWh)",
        isi_pompasi_TLkWh: "Isı Pompası (₺/kWh)",
        pelet_TLkWh: "Pelet (₺/kWh)",
        lpg_TLkWh: "LPG (₺/kWh)",
        en_pahali_enucuz_orani: "En Pahalı / En Ucuz",
      }}
    />
  );
}
