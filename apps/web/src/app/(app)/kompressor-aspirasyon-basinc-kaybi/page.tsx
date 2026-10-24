"use client";
import { CalcPage } from "@/components/calc-page";
import { kompressorAspirasyanBasincKaybi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={kompressorAspirasyanBasincKaybi}
      standardsLabel="Darcy-Weisbach"
      description="Basınçlı hava kompresörünün emme hattında, serbest hava debisi ve boru boyutlarından sürtünme basınç kaybını hesaplar ve izin verilen kayıpla karşılaştırır."
      formula="V = Q / (π×D²/4), ΔP = f × (L/D) × (ρ×V²/2)"
      engineeringNote="Emme hattındaki her basınç kaybı kompresörün emdiği havanın yoğunluğunu ve dolayısıyla serbest hava teslimatını (FAD) düşürür. Sürtünme katsayısı f, Boru Sürtünme Katsayısı modülüyle (Swamee-Jain) hesaplanabilir; izin verilen kayıp üretici verisinden alınmalıdır."
      fields={[
        { key: "debi_m3min", label: "Serbest Hava Debisi (m³/dk)", type: "number", min: 0.1, step: 1 },
        { key: "emme_boru_capı_mm", label: "Emme Borusu İç Çapı (mm)", type: "number", min: 10, step: 10 },
        { key: "emme_boru_uzunlugu_m", label: "Emme Borusu Uzunluğu (m)", type: "number", min: 0.5, step: 1 },
        { key: "surtunme_katsayisi_f", label: "Darcy Sürtünme Katsayısı f", type: "number", min: 0.005, step: 0.005 },
        { key: "max_basinc_kaybi_kPa", label: "İzin Verilen Kayıp (kPa)", type: "number", min: 0.1, step: 0.5 },
      ]}
      defaults={{
        debi_m3min: 10,
        emme_boru_capı_mm: 100,
        emme_boru_uzunlugu_m: 10,
        surtunme_katsayisi_f: 0.02,
        max_basinc_kaybi_kPa: 5,
      }}
      mainUnit="kPa"
      mainValueKey="basinc_kaybi_kPa"
      mainDecimals={2}
      intermediateLabels={{
        hava_hizi_ms: "Hava Hızı (m/s)",
        dinamik_basinc_Pa: "Dinamik Basınç (Pa)",
        hava_yogunlugu_kgm3: "Hava Yoğunluğu (kg/m³)",
      }}
    />
  );
}
