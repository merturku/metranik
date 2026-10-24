"use client";
import { CalcPage } from "@/components/calc-page";
import { termalEnerjiDeposuHacmi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={termalEnerjiDeposuHacmi}
      standardsLabel="Duyulur Isı Dengesi (E = m×cp×ΔT)"
      description="Depolanacak ısıl enerji ve kullanılabilir sıcaklık farkından gereken su deposu hacmini, atım süresinden ortalama deşarj gücünü hesaplar."
      formula="V = E / (ρ×cp×ΔT), P_ort = E / t_atım"
      engineeringNote="ΔT, deponun şarj sonu ile kullanılabilir alt sıcaklığı arasındaki farktır; tabakalaşma bozulursa kullanılabilir ΔT ve dolayısıyla depolanan enerji azalır. Isı kayıpları için hacme pay bırakılmalıdır."
      fields={[
        { key: "gunluk_enerji_ihtiyaci_kWh", label: "Depolanacak Enerji (kWh)", type: "number", min: 0.5, step: 1 },
        { key: "atim_suresi_saat", label: "Atım Süresi (saat)", type: "number", min: 0.5, step: 1 },
        { key: "sicaklik_farki_C", label: "Kullanılabilir Sıcaklık Farkı (K)", type: "number", min: 1, step: 5 },
      ]}
      defaults={{
        gunluk_enerji_ihtiyaci_kWh: 10,
        atim_suresi_saat: 8,
        sicaklik_farki_C: 20,
      }}
      mainUnit="L"
      mainValueKey="hacim_L"
      mainDecimals={0}
      intermediateLabels={{
        enerji_kJ: "Enerji (kJ)",
        su_kutlesi_kg: "Su Kütlesi (kg)",
        ortalama_desarj_gucu_kW: "Ortalama Deşarj Gücü (kW)",
      }}
    />
  );
}
