"use client";

import { acilAydinlatmaBataryaSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AcilAydinlatmaBataryaSuresiPage() {
  return (
    <CalcPage
      module={acilAydinlatmaBataryaSuresi}
      standardsLabel="Fiziksel Formül"
      description="Batarya kapasitesine ve yük akımına göre acil aydınlatma armatürünün çalışma süresini hesaplar."
      formula="t = C / I"
      engineeringNote="Yönetmelikler genelde asgari 1 veya 3 saat çalışma süresi şartı koşar; batarya yaşlanma payı için gerçek kapasiteyi biraz düşük almak güvenli tarafta kalır."
      fields={[
        {
          key: "bataryaKapasitesi_C_Ah",
          label: "Batarya Kapasitesi C (Ah)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        { key: "yukAkimi_I_A", label: "Yük Akımı I (A)", type: "number", min: 0.001, step: 0.01 },
      ]}
      defaults={{ bataryaKapasitesi_C_Ah: 4, yukAkimi_I_A: 0.5 }}
      mainUnit="saat"
      mainValueKey="calismaSuresi_saat"
      intermediateLabels={{ calismaSuresi_dakika: "Çalışma Süresi (dakika)" }}
    />
  );
}
