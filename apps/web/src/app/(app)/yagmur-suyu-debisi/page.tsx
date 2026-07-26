"use client";

import { yagmurSuyuDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YagmurSuyuDebisiPage() {
  return (
    <CalcPage
      module={yagmurSuyuDebisi}
      standardsLabel="Rasyonel Yöntem"
      description="Yağış şiddetine, alana ve akış katsayısına göre yağmur suyu toplama debisini hesaplar."
      formula="Q = 2.778 × C × I × A"
      engineeringNote="Yağış şiddeti (I) bölgeye ve tekerrür periyoduna göre meteorolojik verilerden alınır; akış katsayısı (C) yüzey geçirgenliğine bağlıdır (çatı ~0.9-1.0)."
      fields={[
        {
          key: "akisKatsayisi_C",
          label: "Akış Katsayısı C (0-1)",
          type: "number",
          min: 0.05,
          step: 0.05,
        },
        {
          key: "yagisSiddeti_I_mmh",
          label: "Yağış Şiddeti I (mm/h)",
          type: "number",
          min: 1,
          step: 1,
        },
        { key: "alan_A_ha", label: "Alan A (hektar)", type: "number", min: 0.001, step: 0.001 },
      ]}
      defaults={{ akisKatsayisi_C: 0.9, yagisSiddeti_I_mmh: 100, alan_A_ha: 0.05 }}
      mainUnit="L/s"
      mainValueKey="debi_Ls"
      intermediateLabels={{ rasyonelKatsayi: "Rasyonel Katsayı" }}
    />
  );
}
