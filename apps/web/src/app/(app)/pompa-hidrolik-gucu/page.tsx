"use client";

import { pompaHidrolikGucu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaHidrolikGucuPage() {
  return (
    <CalcPage
      module={pompaHidrolikGucu}
      standardsLabel="Fiziksel Formül"
      description="Akışkan yoğunluğuna, debiye, basma yüksekliğine ve pompa verimine göre gerekli pompa mil gücünü hesaplar."
      formula="P = ρ×g×Q×H / η"
      engineeringNote="η pompa verimidir (tipik santrifüj pompalarda 0.5-0.8); motor gücü seçilirken ayrıca motor verimi ve güvenlik payı (%10-20) eklenmelidir."
      fields={[
        {
          key: "yogunluk_rho_kgm3",
          label: "Akışkan Yoğunluğu ρ (kg/m³)",
          type: "number",
          min: 1,
          step: 10,
        },
        { key: "debi_Q_m3h", label: "Debi Q (m³/h)", type: "number", min: 0.1, step: 1 },
        {
          key: "basmaYuksekligi_H_m",
          label: "Basma Yüksekliği H (m)",
          type: "number",
          min: 0.1,
          step: 1,
        },
        {
          key: "pompaVerimi_eta",
          label: "Pompa Verimi η (0-1)",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
      ]}
      defaults={{
        yogunluk_rho_kgm3: 1000,
        debi_Q_m3h: 72,
        basmaYuksekligi_H_m: 30,
        pompaVerimi_eta: 0.7,
      }}
      mainUnit="kW"
      mainValueKey="milGucu_kW"
      intermediateLabels={{
        debi_m3s: "Debi (m³/s)",
        hidrolikGuc_kW: "Hidrolik Güç (kW)",
        pompaVerimi_eta: "Pompa Verimi (η)",
      }}
    />
  );
}
