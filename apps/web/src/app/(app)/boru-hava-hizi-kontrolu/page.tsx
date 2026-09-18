"use client";

import { boruHavaHiziKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruHavaHiziKontroluPage() {
  return (
    <CalcPage
      module={boruHavaHiziKontrolu}
      standardsLabel="ISO 4414"
      description="Basınçlı hava hattı çapından geçen hava hızını hesaplar ve ISO 4414 standardında önerilen aralıkla karşılaştırır."
      formula="V = Q / A"
      engineeringNote="ISO 4414 (Pnömatik sistem kuralları) çerçevesinde hava hızı genellikle 2–6 m/s aralığında tutulur. Düşük hız aşırı basınç kaybına, yüksek hız gürültü ve erozyon riskine yol açar."
      fields={[
        {
          key: "volumetrik_debi_m3s",
          label: "Volumetrik Debi (m³/s)",
          type: "number",
          min: 0.0001,
          step: 0.0001,
        },
        {
          key: "boru_çapı_mm",
          label: "Boru Çapı (mm)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "hız_alt_sınır_ms",
          label: "Hız Alt Sınırı (m/s)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "hız_üst_sınır_ms",
          label: "Hız Üst Sınırı (m/s)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        volumetrik_debi_m3s: 0.002,
        boru_çapı_mm: 20,
        hız_alt_sınır_ms: 2,
        hız_üst_sınır_ms: 6,
      }}
      mainUnit="m/s"
      mainValueKey="hava_hızı_ms"
      mainDecimals={2}
      intermediateLabels={{
        boru_kesit_alanı_m2: "Boru Kesit Alanı (m²)",
      }}
    />
  );
}
