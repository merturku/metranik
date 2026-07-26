"use client";

import { pompaNpshKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaNpshKontroluPage() {
  return (
    <CalcPage
      module={pompaNpshKontrolu}
      standardsLabel="Fiziksel Formül"
      description="Emme hattı koşullarına göre mevcut NPSH'i (NPSHa) hesaplar ve pompa üreticisinin gerekli NPSH'i (NPSHr) ile karşılaştırarak kavitasyon riskini kontrol eder."
      formula="NPSHa = (Patm - Pv) / (ρ × g) - hs - hf"
      engineeringNote="Güvenli işletme için NPSHa, NPSHr'den en az ~0.5 m fazla olmalıdır; marj yetersizse kavitasyon, verim kaybı ve pompa hasarı riski doğar."
      fields={[
        {
          key: "atmosferBasinci_Patm_Pa",
          label: "Atmosfer Basıncı (Pa)",
          type: "number",
          min: 50000,
          step: 100,
        },
        {
          key: "buharBasinci_Pv_Pa",
          label: "Akışkan Buhar Basıncı Pv (Pa)",
          type: "number",
          min: 0,
          step: 10,
        },
        {
          key: "yogunluk_rho_kgm3",
          label: "Akışkan Yoğunluğu ρ (kg/m³)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "emmeYuksekligi_hs_m",
          label: "Emme Yüksekliği hs (m, pozitif = pompa üstte)",
          type: "number",
          step: 0.1,
        },
        {
          key: "emmeHattiKaybi_hf_m",
          label: "Emme Hattı Sürtünme Kaybı hf (m)",
          type: "number",
          min: 0,
          step: 0.1,
        },
        {
          key: "gerekliNpsh_NPSHr_m",
          label: "Gerekli NPSH - NPSHr (m)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        atmosferBasinci_Patm_Pa: 101325,
        buharBasinci_Pv_Pa: 2340,
        yogunluk_rho_kgm3: 998,
        emmeYuksekligi_hs_m: 2,
        emmeHattiKaybi_hf_m: 1,
        gerekliNpsh_NPSHr_m: 3,
      }}
      mainUnit="m"
      mainValueKey="npsha_m"
      intermediateLabels={{
        atmosferHeadi_m: "Atmosferik Head (m)",
        gerekliNpsh_NPSHr_m: "Gerekli NPSH - NPSHr (m)",
        marj_m: "Marj (m)",
      }}
    />
  );
}
