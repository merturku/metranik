"use client";

import { akuSarjSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AkuSarjSuresiPage() {
  return (
    <CalcPage
      module={akuSarjSuresi}
      standardsLabel="Fiziksel Formül"
      description="Batarya kapasitesine, şarj akımına ve şarj verimine göre akünün tam şarj süresini hesaplar."
      formula="t = C / (I × η)"
      engineeringNote="Şarj verimi (η) batarya kimyasına göre değişir; kurşun-asit için ~0.8-0.85, lityum-iyon için ~0.95-0.98 tipik değerlerdir."
      fields={[
        {
          key: "bataryaKapasitesi_C_Ah",
          label: "Batarya Kapasitesi C (Ah)",
          type: "number",
          min: 0.1,
          step: 1,
        },
        { key: "sarjAkimi_I_A", label: "Şarj Akımı I (A)", type: "number", min: 0.1, step: 0.5 },
        {
          key: "sarjVerimi_eta",
          label: "Şarj Verimi η (0-1)",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
      ]}
      defaults={{ bataryaKapasitesi_C_Ah: 100, sarjAkimi_I_A: 10, sarjVerimi_eta: 0.85 }}
      mainUnit="saat"
      mainValueKey="sarjSuresi_saat"
      intermediateLabels={{ sarjVerimi_eta: "Şarj Verimi (η)" }}
    />
  );
}
