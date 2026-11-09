"use client";

import { mohrCemberiAsalGerilmeler } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MohrCemberiAsalGerilmelerPage() {
  return (
    <CalcPage
      module={mohrCemberiAsalGerilmeler}
      standardsLabel="Mohr çemberi"
      description="Düzlem gerilme durumunda asal gerilmeleri, asal düzlem açısını, maksimum kayma gerilmesini ve von Mises eşdeğer gerilmesini hesaplar."
      formula="σ1,2 = (σx+σy)/2 ± √[((σx−σy)/2)² + τ²];  tan 2θp = 2τ/(σx−σy);  τmaks = R"
      engineeringNote="Çekme gerilmesi pozitiftir; üç boyutlu durumda üçüncü asal gerilme sıfır kabul edilir. Von Mises değeri düzlem gerilme içindir. Malzeme akma sınırıyla karşılaştırma ve emniyet katsayısı mühendis kararıdır."
      fields={[
        { key: "sigmaX_MPa", label: "σx (MPa)", type: "number", step: 1 },
        { key: "sigmaY_MPa", label: "σy (MPa)", type: "number", step: 1 },
        { key: "tauXY_MPa", label: "τxy (MPa)", type: "number", step: 1 },
      ]}
      defaults={{ sigmaX_MPa: 80, sigmaY_MPa: 20, tauXY_MPa: 30 }}
      mainUnit="MPa"
      mainValueKey="sigma1_MPa"
      mainDecimals={2}
      intermediateLabels={{
        sigma2_MPa: "Küçük Asal Gerilme σ2 (MPa)",
        ortalama_gerilme_MPa: "Ortalama Gerilme (MPa)",
        cember_yaricapi_tau_maks_MPa: "Çember Yarıçapı = τmaks (MPa)",
        asal_duzlem_acisi_derece: "Asal Düzlem Açısı θp (°)",
        von_mises_MPa: "von Mises Gerilmesi (MPa)",
      }}
    />
  );
}
