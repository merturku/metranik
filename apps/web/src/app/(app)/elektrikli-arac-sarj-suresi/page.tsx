"use client";

import { elektrikliAracSarjSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ElektrikliAracSarjSuresiPage() {
  return (
    <CalcPage
      module={elektrikliAracSarjSuresi}
      standardsLabel="Enerji-Güç İlişkisi"
      description="Batarya kapasitesi, mevcut şarj oranı, şarj gücü ve şarj veriminden elektrikli aracın tam şarj olması için gereken süreyi hesaplar."
      formula="t = E/(P×η), E = Kapasite×(1-mevcut şarj oranı)"
      engineeringNote="Şarj verimi (η), AC-DC dönüşüm ve batarya yönetim sistemi kayıplarını temsil eder; tipik ev tipi (Level 2) şarj cihazlarında ~%85-95 aralığındadır."
      fields={[
        {
          key: "bataryaKapasitesi_kWh",
          label: "Batarya Kapasitesi (kWh)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "mevcutSarjOrani",
          label: "Mevcut Şarj Oranı (0-1)",
          type: "number",
          min: 0,
          step: 0.05,
        },
        {
          key: "sarjGucu_P_kW",
          label: "Şarj Gücü P (kW)",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
        {
          key: "sarjVerimi_eta",
          label: "Şarj Verimi η (0-1)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
      ]}
      defaults={{
        bataryaKapasitesi_kWh: 60,
        mevcutSarjOrani: 0.2,
        sarjGucu_P_kW: 7.4,
        sarjVerimi_eta: 0.9,
      }}
      mainUnit="saat"
      mainValueKey="sarjSuresi_saat"
      mainDecimals={2}
      intermediateLabels={{
        gerekliEnerji_kWh: "Gerekli Enerji (kWh)",
      }}
    />
  );
}
