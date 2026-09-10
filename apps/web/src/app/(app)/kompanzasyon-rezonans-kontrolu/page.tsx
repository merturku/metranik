"use client";

import { kompanzasyonRezonansKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KompanzasyonRezonansKontroluPage() {
  return (
    <CalcPage
      module={kompanzasyonRezonansKontrolu}
      standardsLabel="Paralel Rezonans"
      description="Bara kısa devre gücü ve kompanzasyon reaktif gücünden rezonans harmonik mertebesini hesaplar, tesiste yaygın bir harmonik kaynağının mertebesine ne kadar yakın olduğunu kontrol eder."
      formula="h = √(Ssc/Qc)"
      engineeringNote="Kompanzasyon kondansatör bankası, şebeke endüktansıyla birlikte paralel rezonans oluşturabilir. Hesaplanan mertebe, tesiste yaygın bulunan bir harmonik kaynağının (örn. 5. veya 7. harmonik, sürücüler/doğrultucular) mertebesine çok yakınsa amplifikasyon riski oluşur."
      fields={[
        {
          key: "kisaDevreGucu_Ssc_kVA",
          label: "Kısa Devre Gücü Ssc (kVA)",
          type: "number",
          min: 100,
          step: 100,
        },
        {
          key: "kompanzasyonGucu_Qc_kVAr",
          label: "Kompanzasyon Gücü Qc (kVAr)",
          type: "number",
          min: 10,
          step: 10,
        },
        {
          key: "riskliHarmonikMertebe_h",
          label: "Riskli Harmonik Mertebe h",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "toleransOrani",
          label: "Tolerans Oranı (0-1)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
      ]}
      defaults={{
        kisaDevreGucu_Ssc_kVA: 5000,
        kompanzasyonGucu_Qc_kVAr: 500,
        riskliHarmonikMertebe_h: 5,
        toleransOrani: 0.1,
      }}
      mainUnit=""
      mainValueKey="rezonansHarmonikMertebesi_h"
      mainDecimals={3}
      intermediateLabels={{
        bagilFark_yuzde: "Bağıl Fark (%)",
      }}
    />
  );
}
