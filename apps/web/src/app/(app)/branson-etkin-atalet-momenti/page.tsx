"use client";

import { bransonEtkinAtaletMomenti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BransonEtkinAtaletMomentiPage() {
  return (
    <CalcPage
      module={bransonEtkinAtaletMomenti}
      standardsLabel={"ACI 318-19 §24.2.3.5 (Branson denklemi)"}
      description={"Betonarme elemanda çatlama momenti, kullanım momenti, brüt ve çatlamış kesit atalet momentlerinden sehim hesabında kullanılacak etkin atalet momentini (Ie) hesaplar."}
      formula={"Ie = (Mcr/Ma)³·Ig + [1 − (Mcr/Ma)³]·Icr  ≤ Ig  (Ma ≥ Mcr)"}
      engineeringNote={"Ma ≤ Mcr ise kesit çatlamamıştır ve Ie = Ig alınır. Mcr için Betonarme Kesit Çatlama Momenti modülü kullanılabilir. Ie'nin açıklık boyunca ağırlıklı ortalaması (örneğin 0,7·Iorta + 0,15·(I1 + I2)) sürekli kirişlerde kullanılır. Uzun süreli sehim için ayrıca sünme katsayısı uygulanmalıdır."}
      fields={[
        { key: "mcr_kNm", label: "Çatlama Momenti Mcr (kN·m)", type: "number", step: 5, min: 0.1 },
        { key: "ma_kNm", label: "Kullanım (Servis) Momenti Ma (kN·m)", type: "number", step: 5, min: 0.1 },
        { key: "ig_mm4", label: "Brüt Atalet Momenti Ig (mm⁴)", type: "number", step: 100000000, min: 1 },
        { key: "icr_mm4", label: "Çatlamış Kesit Atalet Momenti Icr (mm⁴)", type: "number", step: 100000000, min: 1 },
      ]}
      defaults={{ mcr_kNm: 40, ma_kNm: 80, ig_mm4: 5000000000, icr_mm4: 2000000000 }}
      mainUnit={"mm⁴"}
      mainValueKey={"ie_mm4"}
      mainDecimals={0}
      intermediateLabels={{
        mcr_ma_orani: "Mcr/Ma",
        ie_ig_orani: "Ie/Ig",
        durum: "Kesit Durumu",
      }}
    />
  );
}
