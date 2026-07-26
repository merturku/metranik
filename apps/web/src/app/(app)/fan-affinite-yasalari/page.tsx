"use client";

import { fanAffiniteYasalari } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FanAffiniteYasalariPage() {
  return (
    <CalcPage
      module={fanAffiniteYasalari}
      standardsLabel="Fan Afinite Yasaları"
      description="Fan devri değiştiğinde yeni debi, basınç ve güç değerlerini afinite (benzerlik) yasalarıyla hesaplar."
      formula="Q2=Q1(N2/N1), P2=P1(N2/N1)², Güç2=Güç1(N2/N1)³"
      engineeringNote="Bu yasalar aynı fan/sistem eğrisi için geçerlidir; fan tipi veya çark çapı değişirse uygulanamaz."
      fields={[
        {
          key: "referansDebi_Q1_m3h",
          label: "Referans Debi Q1 (m³/h)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "referansBasinc_P1_Pa",
          label: "Referans Basınç P1 (Pa)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "referansGuc_Guc1_kW",
          label: "Referans Güç (kW)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "referansDevir_N1_rpm",
          label: "Referans Devir N1 (rpm)",
          type: "number",
          min: 1,
          step: 10,
        },
        { key: "yeniDevir_N2_rpm", label: "Yeni Devir N2 (rpm)", type: "number", min: 1, step: 10 },
      ]}
      defaults={{
        referansDebi_Q1_m3h: 1000,
        referansBasinc_P1_Pa: 500,
        referansGuc_Guc1_kW: 2,
        referansDevir_N1_rpm: 1450,
        yeniDevir_N2_rpm: 1160,
      }}
      mainUnit="m³/h"
      mainValueKey="yeniDebi_Q2_m3h"
      intermediateLabels={{
        devirOrani: "Devir Oranı (N2/N1)",
        yeniBasinc_P2_Pa: "Yeni Basınç P2 (Pa)",
        yeniGuc_Guc2_kW: "Yeni Güç (kW)",
      }}
    />
  );
}
