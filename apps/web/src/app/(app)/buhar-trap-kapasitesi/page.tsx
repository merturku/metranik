"use client";

import { buharTrapKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BuharTrapKapasitesiPage() {
  return (
    <CalcPage
      module={buharTrapKapasitesi}
      standardsLabel="Orifis Akış Denklemi"
      description="Deşarj katsayısı, orifis alanı, kondens yoğunluğu ve basınç farkından, bir buhar tuzağının (steam trap) kondens tahliye kapasitesini hesaplar."
      formula="ṁ = Cd×A×√(2×ρ×ΔP)"
      engineeringNote="Cd deşarj katsayısı tipik olarak 0.6-0.8 aralığındadır. Kondens Tankı (Receiver) Hacmi modülünün girdisi olan kondens debisini üretecek şekilde kullanılabilir."
      fields={[
        {
          key: "desarjKatsayisi_Cd",
          label: "Deşarj Katsayısı Cd",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        {
          key: "orifisAlani_A_m2",
          label: "Orifis Alanı A (m²)",
          type: "number",
          min: 0.00001,
          step: 0.00001,
        },
        {
          key: "kondensYogunlugu_rho_kgm3",
          label: "Kondens Yoğunluğu ρ (kg/m³)",
          type: "number",
          min: 500,
          step: 10,
        },
        {
          key: "basincFarki_dP_Pa",
          label: "Basınç Farkı ΔP (Pa)",
          type: "number",
          min: 1000,
          step: 10000,
        },
      ]}
      defaults={{
        desarjKatsayisi_Cd: 0.7,
        orifisAlani_A_m2: 0.0001,
        kondensYogunlugu_rho_kgm3: 900,
        basincFarki_dP_Pa: 500000,
      }}
      mainUnit="kg/h"
      mainValueKey="kapasite_kgh"
      mainDecimals={1}
      intermediateLabels={{
        kutleselDebi_kgs: "Kütlesel Debi (kg/s)",
      }}
    />
  );
}
