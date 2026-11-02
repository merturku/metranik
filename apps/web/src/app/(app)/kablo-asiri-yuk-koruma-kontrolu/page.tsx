"use client";

import { kabloAsiriYukKorumaKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloAsiriYukKorumaKontroluPage() {
  return (
    <CalcPage
      module={kabloAsiriYukKorumaKontrolu}
      standardsLabel="IEC 60364-4-43 §433.1 — Aşırı yük koruması"
      description="Kablonun akım taşıma kapasitesi ile koruma cihazının nominal ve konvansiyonel açma akımını karşılaştırır (Ib ≤ In ≤ Iz ve I2 ≤ 1,45·Iz)."
      formula="Ib ≤ In ≤ Iz   ve   I2 ≤ 1,45·Iz   (I2 = 1,45·In kesici, 1,6·In gG sigorta)"
      engineeringNote="Iz, kurulum koşullarına göre düzeltilmiş akım taşıma kapasitesidir (Kablo Akım Taşıma Kapasitesi Düzeltmesi modülüyle bulunur). I2 katsayıları IEC 60898-1 (kesici) ve IEC 60269-1 (gG sigorta, In ≥ 16 A) içindir; küçük akımlı sigortalarda katsayı farklıdır, üretici eğrisinden teyit edin. Kısa devre koruması (I²t) bu modülün kapsamı dışındadır."
      fields={[
        { key: "tasarimAkimi_A", label: "Tasarım Akımı Ib (A)", type: "number", min: 0.1, step: 1 },
        { key: "korumaNominalAkimi_A", label: "Koruma Nominal Akımı In (A)", type: "number", min: 0.1, step: 1 },
        { key: "kabloAkimTasima_A", label: "Kablo Akım Taşıma Kapasitesi Iz (A)", type: "number", min: 0.1, step: 1 },
        {
          key: "korumaTipi",
          label: "Koruma Cihazı",
          type: "select",
          options: [
            { value: "kesici", label: "Kesici / MCB (I2 = 1,45·In)" },
            { value: "sigorta", label: "gG Sigorta (I2 = 1,6·In)" },
          ],
        },
      ]}
      defaults={{ tasarimAkimi_A: 30, korumaNominalAkimi_A: 32, kabloAkimTasima_A: 36, korumaTipi: "kesici" }}
      mainUnit="A (konvansiyonel açma akımı I2)"
      mainValueKey="I2_A"
      mainDecimals={1}
      intermediateLabels={{
        k2_katsayisi: "I2/In Katsayısı",
        sinir_1_45_Iz_A: "1,45·Iz Sınırı (A)",
        azami_In_kosul2_A: "2. Koşuldan Azami In (A)",
        kosul_1: "Koşul 1 (Ib ≤ In ≤ Iz)",
        kosul_2: "Koşul 2 (I2 ≤ 1,45·Iz)",
      }}
    />
  );
}
