"use client";
import { CalcPage } from "@/components/calc-page";
import { kompressorAspirasyanBasincKaybi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={kompressorAspirasyanBasincKaybi}
      standardsLabel="ISO 4414, EN 60204-32"
      description="Basınçlı hava kompresörü emme hattında, akış ve boru boyutlarından basınç kaybını hesaplar."
      formula="ΔP = f × (L/D) × (ρ × V²/2) [Darcy-Weisbach]"
      engineeringNote="Aspirasyon basınç kaybı 5 kPa'dan fazla olmamalı. Emme borusu çapı yetersizse kompresör verimliliği düşer."
      fields={[
        { name: "debi_m3min", label: "Debi (m³/min)", type: "number" },
        { name: "emme_boru_capı_mm", label: "Emme Borusu Çapı (mm)", type: "number" },
        { name: "emme_boru_uzunlugu_m", label: "Emme Borusu Uzunluğu (m)", type: "number" },
        { name: "max_basinc_kaybi_kPa", label: "Max. Basınç Kaybı (kPa)", type: "number" },
      ]}
      defaults={{
        debi_m3min: 100,
        emme_boru_capı_mm: 50,
        emme_boru_uzunlugu_m: 2,
        max_basinc_kaybi_kPa: 5,
      }}
    />
  );
}
