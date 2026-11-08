"use client";

import { hendekBoruToprakYukuMarston } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HendekBoruToprakYukuMarstonPage() {
  return (
    <CalcPage
      module={hendekBoruToprakYukuMarston}
      standardsLabel="Marston teorisi (K·μ' teyit edin)"
      description="Dar hendeğe gömülü borunun üzerindeki toprak yükünü Marston teorisiyle hesaplar."
      formula="Cd = (1 − e^(−2Kμ'·H/B))/(2Kμ');  W = Cd·γ·B²"
      engineeringNote="K·μ' tipik değerleri: granüler (kum/çakıl) ≈ 0,165, doygun üst toprak ≈ 0,150, kil ≈ 0,130; yerel şartnameden teyit edin. B hendek genişliği (boru üst seviyesinde), H dolgu yüksekliğidir. Dar hendek kabulü; trafik ve yüzey yükü ayrıca eklenmeli, boru halkasal dayanımı ayrıca kontrol edilmelidir."
      fields={[
        { key: "birimHacimAgirlik_kNm3", label: "Dolgu Birim Hacim Ağırlığı γ (kN/m³)", type: "number", step: 0.5, min: 1 },
        { key: "dolguYuksekligi_H_m", label: "Dolgu Yüksekliği H (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "hendekGenisligi_B_m", label: "Hendek Genişliği B (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "kMu", label: "K·μ' Katsayısı", type: "number", step: 0.005, min: 0.01 },
      ]}
      defaults={{ birimHacimAgirlik_kNm3: 18, dolguYuksekligi_H_m: 3, hendekGenisligi_B_m: 1, kMu: 0.165 }}
      mainUnit="kN/m"
      mainValueKey="toprakYuku_kNm"
      mainDecimals={2}
      intermediateLabels={{
        yuk_katsayisi_Cd: "Yük Katsayısı Cd",
        H_B_orani: "H / B",
        prizma_yuku_gHB_kNm: "Toprak Prizması Yükü γHB (kN/m)",
        marston_prizma_orani: "Marston / Prizma Oranı",
        ortalama_dusey_basinc_kPa: "Ortalama Düşey Basınç (kPa)",
      }}
    />
  );
}
