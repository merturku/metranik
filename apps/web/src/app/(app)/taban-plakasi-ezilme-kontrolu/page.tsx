"use client";

import { tabanPlakasiEzilmeKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TabanPlakasiEzilmeKontroluPage() {
  return (
    <CalcPage
      module={tabanPlakasiEzilmeKontrolu}
      standardsLabel="AISC 360-16 §J8"
      description="Çelik kolon taban plakası altındaki betonun ezilme (yatak) dayanımını hesaplar ve tasarım yüküyle karşılaştırır."
      formula="Pp = 0,85·f'c·A1·√(A2/A1) ≤ 1,7·f'c·A1;  φPp, φ = 0,65"
      engineeringNote="A2 plakanın merkezlendiği, geometrik olarak benzer en geniş beton alanıdır. TS EN 1992-1-1 §6.7 kısmi yüklü alan yöntemi farklı katsayı kullanır; yerel mevzuata göre ayrıca kontrol edin. Plaka kalınlığı ve ankraj kontrolü bu modülde yoktur."
      fields={[
        { key: "tasarimYuku_kN", label: "Tasarım Eksenel Yükü (kN)", type: "number", step: 50, min: 1 },
        { key: "plakaAlani_mm2", label: "Plaka Alanı A1 (mm²)", type: "number", step: 1000, min: 1 },
        { key: "betonAlani_mm2", label: "Beton Alanı A2 (mm²)", type: "number", step: 1000, min: 1 },
        { key: "betonDayanimi_MPa", label: "Beton Dayanımı f'c (MPa)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ tasarimYuku_kN: 2000, plakaAlani_mm2: 90000, betonAlani_mm2: 360000, betonDayanimi_MPa: 25 }}
      mainUnit="kN"
      mainValueKey="tasarimDayanimi_kN"
      mainDecimals={1}
      intermediateLabels={{
        sinirsiz_dayanim_Pp_kN: "Nominal Dayanım Pp (kN)",
        alan_orani_sqrt: "√(A2/A1) (≤ 2)",
        kullanim_orani: "Kullanım Oranı",
        yatak_gerilmesi_MPa: "Yatak Gerilmesi (MPa)",
      }}
    />
  );
}
