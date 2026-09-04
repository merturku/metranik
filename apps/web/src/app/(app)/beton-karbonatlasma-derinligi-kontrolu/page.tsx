"use client";

import { betonKarbonatlasmaDerinligiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonKarbonatlasmaDerinligiKontroluPage() {
  return (
    <CalcPage
      module={betonKarbonatlasmaDerinligiKontrolu}
      standardsLabel="√t Yasası"
      description="Karbonatlaşma katsayısı ve geçen süreden beton karbonatlaşma derinliğini tahmin eder, pas payıyla karşılaştırarak donatı korozyonu başlama riskini kontrol eder."
      formula="d = k×√t"
      engineeringNote="k, beton kalitesine/çevre koşullarına bağlı karbonatlaşma katsayısıdır (deneyim/ölçümle girilir). Karbonatlaşma cephesi pas payına ulaştığında korozyon başlama riski oluşur."
      fields={[
        {
          key: "karbonatlasmaKatsayisi_k_mmYilYariKuvvet",
          label: "Karbonatlaşma Katsayısı k (mm/√yıl)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
        {
          key: "gecenSure_t_yil",
          label: "Geçen Süre t (yıl)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "pasPayi_mm",
          label: "Pas Payı (mm)",
          type: "number",
          min: 1,
          step: 5,
        },
      ]}
      defaults={{
        karbonatlasmaKatsayisi_k_mmYilYariKuvvet: 5,
        gecenSure_t_yil: 30,
        pasPayi_mm: 30,
      }}
      mainUnit="mm"
      mainValueKey="karbonatlasmaDerinligi_d_mm"
      mainDecimals={2}
      intermediateLabels={{
        pasPayi_mm: "Pas Payı (mm)",
      }}
    />
  );
}
