"use client";

import { asansorMotorGucu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AsansorMotorGucuPage() {
  return (
    <CalcPage
      module={asansorMotorGucu}
      standardsLabel={"Karşı ağırlık dengesi — EN 81-20 ilkesi"}
      description={"Anma yükü, nominal hız, karşı ağırlık dengesi ve toplam verimden asansör çekici motor mil gücünü hesaplar."}
      formula={"P = (1 − φ)·Q·g·v/(1000·η)  (kW)"}
      engineeringNote={"φ karşı ağırlık dengesidir: karşı ağırlık = kabin ağırlığı + φ·anma yükü (genellikle φ = 0,40–0,50). En ağır durumda dengesizlik (1 − φ)·Q olarak alınmıştır. η, redüktör/halat/kasnak dahil toplam verimdir (dişli: 0,5–0,7; dişlisiz: 0,8–0,9). Hızlanma gücü ve invertör payı ayrıca eklenmelidir; üretici seçim tablolarıyla teyit edin."}
      fields={[
        { key: "q_kg", label: "Anma Yükü Q (kg)", type: "number", step: 50, min: 1 },
        { key: "v_ms", label: "Anma Hızı v (m/s)", type: "number", step: 0.25, min: 0.1 },
        { key: "phi", label: "Karşı Ağırlık Dengesi φ (0–1)", type: "number", step: 0.05, min: 0 },
        { key: "eta", label: "Toplam Verim η (0–1)", type: "number", step: 0.05, min: 0.1 },
      ]}
      defaults={{ q_kg: 630, v_ms: 1, phi: 0.5, eta: 0.6 }}
      mainUnit={"kW"}
      mainValueKey={"motorGucu_kW"}
      mainDecimals={2}
      intermediateLabels={{
        dengesizlik_kg: "Dengesizlik Kütlesi (kg)",
        mekanik_guc_kW: "Mekanik Güç (η dahil değil) (kW)",
      }}
    />
  );
}
