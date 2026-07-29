"use client";

import { kanalSurtunmeBasincKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalSurtunmeBasincKaybiPage() {
  return (
    <CalcPage
      module={kanalSurtunmeBasincKaybi}
      standardsLabel="Darcy-Weisbach"
      description="Havalandırma kanalında sürtünmeden doğan basınç kaybını, kanal uzunluğu, hidrolik çap, hava yoğunluğu ve hızdan hesaplar."
      formula="ΔP = f × (L/Dh) × (ρ×V² / 2)"
      engineeringNote="Sürtünme katsayısı f, kanal yüzey pürüzlülüğüne ve Reynolds sayısına bağlıdır; galvanizli sac kanallarda yaklaşık 0.02 tipik bir başlangıç değeridir, kesin tasarımda Moody diyagramından/SMACNA tablolarından teyit edilmelidir."
      fields={[
        {
          key: "surtunmeKatsayisi_f",
          label: "Sürtünme Katsayısı f",
          type: "number",
          min: 0.001,
          step: 0.001,
        },
        {
          key: "kanalUzunlugu_L_m",
          label: "Kanal Uzunluğu L (m)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "hidroliCap_Dh_m",
          label: "Hidrolik Çap Dh (m)",
          type: "number",
          min: 0.05,
          step: 0.05,
        },
        {
          key: "havaYogunlugu_rho_kgm3",
          label: "Hava Yoğunluğu ρ (kg/m³)",
          type: "number",
          min: 0.5,
          step: 0.05,
        },
        {
          key: "hiz_V_ms",
          label: "Hız V (m/s)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
      ]}
      defaults={{
        surtunmeKatsayisi_f: 0.02,
        kanalUzunlugu_L_m: 20,
        hidroliCap_Dh_m: 0.4,
        havaYogunlugu_rho_kgm3: 1.2,
        hiz_V_ms: 8,
      }}
      mainUnit="Pa"
      mainValueKey="basincKaybi_Pa"
      intermediateLabels={{ dinamikBasinc_Pa: "Dinamik Basınç (Pa)" }}
    />
  );
}
