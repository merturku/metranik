"use client";

import { rakimHavaYogunluguFanDuzeltmesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function RakimHavaYogunluguFanDuzeltmesiPage() {
  return (
    <CalcPage
      module={rakimHavaYogunluguFanDuzeltmesi}
      standardsLabel="ASHRAE Fundamentals — Bölüm 1 (standart atmosfer)"
      description="Rakım ve hava sıcaklığından hava yoğunluğunu hesaplar; katalogdaki (1,2 kg/m³) fan basıncı ve mil gücünü yoğunluk oranıyla düzeltir."
      formula="p = 101,325·(1 − 2,25577·10⁻⁵·h)^5,25588 kPa,   ρ = p/(Rd·T),   ΔP = ΔP_kat·(ρ/1,2),   P = P_kat·(ρ/1,2)"
      engineeringNote="Fan aynı hacimsel debiyi verir; yoğunluk düştükçe basınç ve mil gücü orantılı azalır. Yüksek rakımda motor soğutması ve yoğunluk düşüşü birlikte değerlendirilmelidir. Hava kuru kabul edilmiştir (nem yoğunluğu biraz düşürür). Fan katalogları genellikle 1,2 kg/m³ (20 °C, deniz seviyesi) için verilir; üretici farklı bir referans veriyorsa onu esas alın."
      fields={[
        { key: "rakim_m", label: "Rakım (m)", type: "number", step: 100 },
        { key: "sicaklik_C", label: "Hava Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "katalogBasinci_Pa", label: "Katalog Fan Basıncı (Pa)", type: "number", min: 0, step: 10 },
        { key: "katalogMilGucu_kW", label: "Katalog Mil Gücü (kW)", type: "number", min: 0, step: 0.1 },
      ]}
      defaults={{ rakim_m: 1000, sicaklik_C: 20, katalogBasinci_Pa: 800, katalogMilGucu_kW: 5.5 }}
      mainUnit="kg/m³ (hava yoğunluğu)"
      mainValueKey="havaYogunlugu_kgm3"
      mainDecimals={4}
      intermediateLabels={{
        atmosfer_basinci_kPa: "Atmosfer Basıncı (kPa)",
        yogunluk_orani_rho_rho_std: "Yoğunluk Oranı ρ/ρ_std",
        duzeltilmis_fan_basinci_Pa: "Düzeltilmiş Fan Basıncı (Pa)",
        duzeltilmis_mil_gucu_kW: "Düzeltilmiş Mil Gücü (kW)",
      }}
    />
  );
}
