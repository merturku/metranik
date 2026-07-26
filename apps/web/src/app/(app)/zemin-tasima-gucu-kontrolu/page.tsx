"use client";

import { zeminTasimaGucuKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminTasimaGucuKontroluPage() {
  return (
    <CalcPage
      module={zeminTasimaGucuKontrolu}
      standardsLabel="Geoteknik Rapor"
      description="Temel altında uygulanan gerilme, zeminin emniyetli taşıma gücünü aşmamalı."
      formula="Marj = qemniyet − quygulanan"
      engineeringNote="Zemin emniyet gerilmesi geoteknik rapordan alınır; bu modülde gömülü değildir."
      fields={[
        {
          key: "uygulananGerilme_kPa",
          label: "Uygulanan Gerilme (kPa)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "zeminEmniyetGerilmesi_kPa",
          label: "Zemin Emniyet Gerilmesi (kPa)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ uygulananGerilme_kPa: 150, zeminEmniyetGerilmesi_kPa: 200 }}
      mainUnit="kPa"
      mainValueKey="marj_kPa"
      intermediateLabels={{
        uygulananGerilme_kPa: "Uygulanan Gerilme (kPa)",
        zeminEmniyetGerilmesi_kPa: "Zemin Emniyet Gerilmesi (kPa)",
      }}
    />
  );
}
