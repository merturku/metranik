"use client";

import { hidronikSuDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HidronikSuDebisiPage() {
  return (
    <CalcPage
      module={hidronikSuDebisi}
      standardsLabel="Enerji Korunumu"
      description="Isı yükü ve gidiş-dönüş sıcaklık farkına (ΔT) göre gerekli su debisini hesaplar (Q = ṁ · cp · ΔT)."
      fields={[
        { key: "isiYuku", label: "Isı Yükü (kW)", type: "number", min: 0.1, step: 0.1 },
        { key: "deltaT", label: "ΔT (°C)", type: "number", min: 0.1, step: 0.1 },
      ]}
      defaults={{ isiYuku: 10, deltaT: 10 }}
      mainUnit="m³/h"
      mainValueKey="debi_m3h"
      intermediateLabels={{
        kutleselDebi_kg_s: "Kütlesel Debi (kg/s)",
        ozgulIsi_kJ_kgK: "Özgül Isı (kJ/kg·K)",
        yogunluk_kg_m3: "Yoğunluk (kg/m³)",
      }}
    />
  );
}
