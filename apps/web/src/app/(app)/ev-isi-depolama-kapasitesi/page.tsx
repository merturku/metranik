"use client";

import { evIsiDepolamaKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvIsiDepolamaKapasitesiPage() {
  return (
    <CalcPage
      module={evIsiDepolamaKapasitesi}
      standardsLabel="Standart atfı yok"
      description="Depo hacmi ve sıcaklık farkından depolanan kullanılabilir enerjiyi ve belirli güçte ısıtıcıyla şarj süresini hesaplar."
      formula="E = V·ρ·cp·(Tüst − Talt)/3600;  Net = E·η;  t = E/P"
      engineeringNote="ρ = 1000 kg/m³ ve cp = 4,186 kJ/kgK kabul edilir. Tabakalaşmayan depoda verim düşer; bekleme kayıpları ayrıca değerlendirilmelidir."
      fields={[
        { key: "hacim_L", label: "Depo Hacmi (L)", type: "number", step: 10, min: 1 },
        { key: "ustSicaklik_C", label: "Üst Sıcaklık (°C)", type: "number", step: 1 },
        { key: "altSicaklik_C", label: "Alt (Dönüş) Sıcaklık (°C)", type: "number", step: 1 },
        { key: "depoVerimi", label: "Depo Verimi (0–1)", type: "number", step: 0.05, min: 0.01 },
        { key: "isiticiGucu_kW", label: "Isıtıcı Gücü (kW)", type: "number", step: 0.5, min: 0.1 },
      ]}
      defaults={{ hacim_L: 500, ustSicaklik_C: 60, altSicaklik_C: 30, depoVerimi: 0.9, isiticiGucu_kW: 3 }}
      mainUnit="kWh"
      mainValueKey="depolananEnerji_kWh"
      mainDecimals={2}
      intermediateLabels={{
        brut_enerji_kWh: "Brüt Enerji (kWh)",
        sicaklik_farki_K: "Sıcaklık Farkı (K)",
        sarj_suresi_saat: "Şarj Süresi (saat)",
        not: "Not",
      }}
    />
  );
}
