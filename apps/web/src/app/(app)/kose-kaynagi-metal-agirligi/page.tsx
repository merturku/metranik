"use client";

import { koseKaynagiMetalAgirligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KoseKaynagiMetalAgirligiPage() {
  return (
    <CalcPage
      module={koseKaynagiMetalAgirligi}
      standardsLabel="Dikiş geometrisi"
      description="Köşe (fileto) kaynağı dikişinin kenar uzunluğu ve boyundan kaynak metali hacmini, ağırlığını ve elektrot/tel sarfiyatını hesaplar."
      formula="A = z²/2·pay;  m = A·L·7850;  sarfiyat = m/verim;  a = z/√2"
      engineeringNote="Yüzey payı gerçek dikişteki taşma (kabartı) içindir (1,0–1,2). Örtülü elektrotta verim ≈ %60–70, dolgulu/MAG telde ≈ %90–95 (girdi). İki taraflı dikişte dikiş sayısını 2 girin. Dikiş dayanımı için Köşe Kaynağı Dikiş Kapasitesi modülünü kullanın."
      fields={[
        { key: "kenarUzunlugu_z_mm", label: "Dikiş Kenar Uzunluğu z (mm)", type: "number", step: 0.5, min: 1 },
        { key: "dikisBoyu_mm", label: "Dikiş Boyu (mm)", type: "number", step: 100, min: 1 },
        { key: "dikisSayisi", label: "Dikiş Sayısı", type: "number", step: 1, min: 1 },
        { key: "yuzeyPayi", label: "Yüzey Payı (1–1,5)", type: "number", step: 0.05, min: 1 },
        { key: "kaynakVerimi_yuzde", label: "Elektrot/Tel Verimi (%)", type: "number", step: 5, min: 30 },
      ]}
      defaults={{ kenarUzunlugu_z_mm: 6, dikisBoyu_mm: 1000, dikisSayisi: 1, yuzeyPayi: 1.1, kaynakVerimi_yuzde: 65 }}
      mainUnit="kg"
      mainValueKey="kaynakMetaliAgirligi_kg"
      mainDecimals={3}
      intermediateLabels={{
        dikis_kesit_alani_mm2: "Dikiş Kesit Alanı (mm²)",
        bogaz_kalinligi_a_mm: "Boğaz Kalınlığı a (mm)",
        kaynak_metali_hacmi_cm3: "Kaynak Metali Hacmi (cm³)",
        elektrot_tel_sarfiyati_kg: "Elektrot/Tel Sarfiyatı (kg)",
        birim_boy_agirligi_kg_m: "Birim Boy Ağırlığı (kg/m)",
      }}
    />
  );
}
