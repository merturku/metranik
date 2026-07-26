"use client";

import { panoSicaklikArtisiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PanoSicaklikArtisiKontroluPage() {
  return (
    <CalcPage
      module={panoSicaklikArtisiKontrolu}
      standardsLabel="IEC 61439"
      description="Pano içi ölçülen sıcaklık ile ortam sıcaklığı farkı, izin verilen sıcaklık artışını (K) aşmamalı."
      fields={[
        { key: "ortamSicakligi_C", label: "Ortam Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "olculenSicaklik_C", label: "Ölçülen Sıcaklık (°C)", type: "number", step: 1 },
        {
          key: "izinVerilenSicaklikArtisi_K",
          label: "İzin Verilen Sıcaklık Artışı (K)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ ortamSicakligi_C: 25, olculenSicaklik_C: 70, izinVerilenSicaklikArtisi_K: 65 }}
      mainUnit="K"
      mainValueKey="marj_K"
      intermediateLabels={{
        sicaklikArtisi_K: "Sıcaklık Artışı (K)",
        izinVerilenSicaklikArtisi_K: "İzin Verilen Artış (K)",
      }}
    />
  );
}
