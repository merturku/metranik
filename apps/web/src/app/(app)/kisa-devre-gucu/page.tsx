"use client";

import { kisaDevreGucu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KisaDevreGucuPage() {
  return (
    <CalcPage
      module={kisaDevreGucu}
      standardsLabel="Fiziksel Formül"
      description="Hat gerilimine ve kısa devre akımına göre üç fazlı kısa devre gücünü hesaplar."
      formula="S = √3 × V × I"
      engineeringNote="Kısa devre gücü, şalt cihazlarının kesme kapasitesi (Icu/Ics) seçiminde referans değerdir."
      fields={[
        { key: "hatGerilimi_V_V", label: "Hat Gerilimi V (V)", type: "number", min: 1, step: 10 },
        {
          key: "kisaDevreAkimi_I_A",
          label: "Kısa Devre Akımı I (A)",
          type: "number",
          min: 1,
          step: 100,
        },
      ]}
      defaults={{ hatGerilimi_V_V: 400, kisaDevreAkimi_I_A: 10000 }}
      mainUnit="kVA"
      mainValueKey="kisaDevreGucu_kVA"
      intermediateLabels={{ kisaDevreGucu_VA: "Kısa Devre Gücü (VA)" }}
    />
  );
}
