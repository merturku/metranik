"use client";

import { kesiciKisaDevreKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KesiciKisaDevreKontroluPage() {
  return (
    <CalcPage
      module={kesiciKisaDevreKontrolu}
      standardsLabel="IEC 60947-2"
      description="Kesicinin anma kısa devre kesme kapasitesi (Icu), hesaplanan olası kısa devre akımını karşılamalı."
      formula="Marj = Icu − Isc"
      fields={[
        {
          key: "hesaplananKisaDevreAkimi_kA",
          label: "Hesaplanan Kısa Devre Akımı (kA)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "kesiciAnmaKapasitesi_kA",
          label: "Kesici Anma Kapasitesi Icu (kA)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
      ]}
      defaults={{ hesaplananKisaDevreAkimi_kA: 24, kesiciAnmaKapasitesi_kA: 25 }}
      mainUnit="kA"
      mainValueKey="marj_kA"
      intermediateLabels={{
        hesaplananKisaDevreAkimi_kA: "Hesaplanan Akım (kA)",
        kesiciAnmaKapasitesi_kA: "Kesici Kapasitesi (kA)",
      }}
    />
  );
}
