"use client";

import { motorGirisGucu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MotorGirisGucuPage() {
  return (
    <CalcPage
      module={motorGirisGucu}
      standardsLabel="Fiziksel Formül"
      description="Hat gerilimine, akımına ve güç faktörüne göre üç fazlı motorun şebekeden çektiği gerçek gücü hesaplar."
      formula="P = √3 × V × I × cosφ"
      engineeringNote="Bu, şebekeden çekilen giriş gücüdür; mil (mekanik çıkış) gücü bu değerin motor verimiyle çarpılmasıyla bulunur."
      fields={[
        { key: "hatGerilimi_V_V", label: "Hat Gerilimi V (V)", type: "number", min: 1, step: 10 },
        { key: "hatAkimi_I_A", label: "Hat Akımı I (A)", type: "number", min: 0.1, step: 1 },
        {
          key: "gucFaktoru_cosfi",
          label: "Güç Faktörü (cosφ)",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
      ]}
      defaults={{ hatGerilimi_V_V: 400, hatAkimi_I_A: 50, gucFaktoru_cosfi: 0.85 }}
      mainUnit="kW"
      mainValueKey="girisGucu_kW"
      intermediateLabels={{ gucFaktoru_cosfi: "Güç Faktörü (cosφ)" }}
    />
  );
}
