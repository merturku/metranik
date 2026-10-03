"use client";
import { CalcPage } from "@/components/calc-page";
import { termalEnerjiDeposuHacmi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={termalEnerjiDeposuHacmi}
      fields={[
        { name: "gunluk_enerji_ihtiyaci_kWh", label: "Günlük Enerji İhtiyacı (kWh)" },
        { name: "atim_suresi_saat", label: "Atım Süresi (saat)" },
        { name: "sicaklik_farki_C", label: "Sıcaklık Farkı (°C)" },
      ]}
      defaults={{
        gunluk_enerji_ihtiyaci_kWh: 10,
        atim_suresi_saat: 8,
        sicaklik_farki_C: 20,
      }}
      description="EN 12392: Termal enerji depolama tankı hacmini hesaplar"
      formula="V = (Q × 3.6e6) / (cp × ΔT × ρ)"
      engineeringNote="Güneş enerjisi veya ısı pompası uygulamalarında depolama tankı boyutlandırması. Dinamik sıcaklık farkı ve atım süresi dikkat edilmeli."
    />
  );
}
