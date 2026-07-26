"use client";

import { boruBasincKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruBasincKaybiPage() {
  return (
    <CalcPage
      module={boruBasincKaybi}
      standardsLabel="Darcy-Weisbach"
      description="Debi, çap, uzunluk ve sürtünme katsayısına göre boru hattındaki basınç kaybını hesaplar."
      formula="ΔP = f × (L/D) × (ρV² / 2)"
      engineeringNote="Sürtünme katsayısı (f) Moody diyagramı/Colebrook denkleminden alınmalıdır; burada mühendis girdisidir."
      fields={[
        { key: "debi", label: "Debi (m³/s)", type: "number", min: 0.001, step: 0.001 },
        { key: "capD", label: "Boru İç Çapı (m)", type: "number", min: 0.01, step: 0.01 },
        { key: "uzunluk", label: "Boru Uzunluğu (m)", type: "number", min: 1, step: 1 },
        {
          key: "surtunmeKatsayisi",
          label: "Sürtünme Katsayısı (f)",
          type: "number",
          min: 0.001,
          step: 0.001,
        },
      ]}
      defaults={{ debi: 0.01, capD: 0.1, uzunluk: 50, surtunmeKatsayisi: 0.02 }}
      mainUnit="kPa"
      mainDecimals={3}
      mainValueKey="basincKaybi_kPa"
      intermediateLabels={{
        kesitAlani_m2: "Kesit Alanı (m²)",
        hiz_m_s: "Hız (m/s)",
        basincKaybi_Pa: "Basınç Kaybı (Pa)",
      }}
    />
  );
}
