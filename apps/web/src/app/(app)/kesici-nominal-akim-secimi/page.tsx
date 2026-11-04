"use client";

import { kesiciNominalAkimSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KesiciNominalAkimSecimiPage() {
  return (
    <CalcPage
      module={kesiciNominalAkimSecimi}
      standardsLabel="IEC 60898-1 — tercihli nominal akımlar"
      description="Tasarım akımından uygun modüler kesici nominal akımını seçer."
      formula="In = min{In ∈ seri : In ≥ Ib}"
      engineeringNote="Ib ≤ In ≤ Iz koşulunun ikincisi (kablo Iz) ayrıca Kablo Aşırı Yük Koruma Koordinasyonu modülüyle kontrol edilmelidir. Kesme kapasitesi (Icn) kısa devre akımına göre ayrıca seçilmelidir. Motor/trafo gibi kalkış akımlı yüklerde eğri tipini (B/C/D) göz önüne alın."
      fields={[
        { key: "tasarimAkimi_A", label: "Tasarım Akımı Ib (A)", type: "number", step: 1, min: 0.1 },
      ]}
      defaults={{ tasarimAkimi_A: 27 }}
      mainUnit="A"
      mainValueKey="nominalAkim_A"
      mainDecimals={0}
      intermediateLabels={{
        yuklenme_yuzde: "Yüklenme Ib/In (%)",
        rezerv_A: "Rezerv In − Ib (A)",
      }}
    />
  );
}
