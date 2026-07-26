"use client";

import { boruTermalGenlesmePayi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruTermalGenlesmePayiPage() {
  return (
    <CalcPage
      module={boruTermalGenlesmePayi}
      standardsLabel="Fiziksel Formül"
      description="Boru malzemesinin genleşme katsayısına, uzunluğuna ve sıcaklık farkına göre termal genleşme payını hesaplar."
      formula="ΔL = α × L × ΔT"
      engineeringNote="Genleşme katsayısı (α) malzemeye göre değişir: çelik ~0.012 mm/mK, bakır ~0.017, PPR/plastik borularda çok daha yüksek (~0.15-0.18) olabilir."
      fields={[
        {
          key: "genlesmeKatsayisi_alpha_mmMK",
          label: "Genleşme Katsayısı α (mm/m·K)",
          type: "number",
          min: 0.001,
          step: 0.001,
        },
        { key: "boruUzunlugu_L_m", label: "Boru Uzunluğu L (m)", type: "number", min: 0.1, step: 1 },
        {
          key: "sicaklikFarki_dT_C",
          label: "Sıcaklık Farkı ΔT (°C)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ genlesmeKatsayisi_alpha_mmMK: 0.012, boruUzunlugu_L_m: 50, sicaklikFarki_dT_C: 60 }}
      mainUnit="mm"
      mainValueKey="genlesme_mm"
      intermediateLabels={{ sicaklikFarki_dT_C: "Sıcaklık Farkı (°C)" }}
    />
  );
}
