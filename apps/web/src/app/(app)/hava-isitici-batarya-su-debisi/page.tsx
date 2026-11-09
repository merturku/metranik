"use client";

import { havaIsiticiBataryaSuDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavaIsiticiBataryaSuDebisiPage() {
  return (
    <CalcPage
      module={havaIsiticiBataryaSuDebisi}
      standardsLabel="Enerji dengesi"
      description="Hava debisi ve istenen sıcaklık artışından batarya kapasitesini ve sıcak su tarafı debisini hesaplar."
      formula="Q = V̇·ρ·cp·ΔT_h;  ṁ_su = Q/(c_w·ΔT_w)"
      engineeringNote="ρ·cp = 1,206 kJ/m³K (1,2 kg/m³, 1,005 kJ/kgK) alınır; yükseklikte yoğunluğu düzeltin. Isı transfer yüzeyi üretici seçimidir. Su debisi Kontrol Vanası Otoritesi ve Pompa modüllerine girdi olur."
      fields={[
        { key: "havaDebisi_m3h", label: "Hava Debisi (m³/h)", type: "number", step: 100, min: 1 },
        { key: "havaSicaklikArtisi_K", label: "Hava Sıcaklık Artışı (K)", type: "number", step: 1, min: 0.1 },
        { key: "suGidis_C", label: "Su Gidiş Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "suDonus_C", label: "Su Dönüş Sıcaklığı (°C)", type: "number", step: 1 },
      ]}
      defaults={{ havaDebisi_m3h: 5000, havaSicaklikArtisi_K: 20, suGidis_C: 80, suDonus_C: 60 }}
      mainUnit="kW"
      mainValueKey="isitmaKapasitesi_kW"
      mainDecimals={2}
      intermediateLabels={{
        su_kutle_debisi_kgs: "Su Kütle Debisi (kg/s)",
        su_debisi_m3h: "Su Debisi (m³/h)",
        su_debisi_Ls: "Su Debisi (L/s)",
        su_sicaklik_farki_K: "Su ΔT (K)",
        not: "Not",
      }}
    />
  );
}
