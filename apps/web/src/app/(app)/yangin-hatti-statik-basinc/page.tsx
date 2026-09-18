"use client";

import { yanginHattiStatikBasinc } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanginHattiStatikBasincPage() {
  return (
    <CalcPage
      module={yanginHattiStatikBasinc}
      standardsLabel="NFPA 13"
      description="Yangın sprinkler sistemi ana hatt (riser/feed line) da suyun akışından kaynaklanan statik basınç düşümünü hesaplar."
      formula="ΔP = f × (L/D) × (ρ × V² / 2)"
      engineeringNote="NFPA 13 standardında, yangın sistemi borularındaki basınç kaybı genellikle tüm sistem basıncının %20'sini geçmemelidir. Darcy-Weisbach denklemi kullanılarak hesaplanan bu değer, pompa seçimi ve sistem tasarımında kritik bir parametredir."
      fields={[
        {
          key: "sürtünme_katsayısı_f",
          label: "Darcy Sürtünme Katsayısı f",
          type: "number",
          min: 0.01,
          step: 0.001,
        },
        {
          key: "boru_uzunluğu_m",
          label: "Boru Uzunluğu (m)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "boru_çapı_m",
          label: "Boru Çapı (m)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "su_hızı_ms",
          label: "Su Hızı (m/s)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "su_yoğunluğu_kgm3",
          label: "Su Yoğunluğu (kg/m³)",
          type: "number",
          min: 900,
          step: 10,
        },
      ]}
      defaults={{
        sürtünme_katsayısı_f: 0.025,
        boru_uzunluğu_m: 50,
        boru_çapı_m: 0.04,
        su_hızı_ms: 2.0,
        su_yoğunluğu_kgm3: 1000,
      }}
      mainUnit="Pa"
      mainValueKey="basinç_kaybı_Pa"
      mainDecimals={1}
      intermediateLabels={{
        dinamik_basınç_Pa: "Dinamik Basınç (Pa)",
        l_d_orani: "L/D Oranı",
      }}
    />
  );
}
