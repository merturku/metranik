"use client";

import { motorKalkisTorkuGerilimDususu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MotorKalkisTorkuGerilimDususuPage() {
  return (
    <CalcPage
      module={motorKalkisTorkuGerilimDususu}
      standardsLabel={'IEC 60034-1'}
      description={'Kalkış anındaki terminal gerilimi düşümünde motor momentinin yük momentini yenip yenemediğini kontrol eder.'}
      formula={'Tn = 9549,3·P/n;  Tk = (TLR/Tn)·(V/Vn)²·Tn;  oran = Tk/Tyük ≥ 1,25'}
      engineeringNote={'Yalnız kilitli rotor noktası kullanılır; tam moment–hız eğrisi ve yükün hıza bağlı değişimi dikkate alınmaz. Oran eşiği pratik değerdir, üretici verisiyle teyit edin. Gerilim düşümü için Motor Kalkışında Gerilim Düşümü modülünü kullanın.'}
      fields={[
        { key: "anmaGucu_kW", label: "Anma Gücü (kW)", type: "number", step: 1, min: 0.1 },
        { key: "anmaDevri_rpm", label: "Anma Devri (dev/dk)", type: "number", step: 10, min: 1 },
        { key: "kalkisMomentiOrani_TLR_Tn", label: "Kalkış Momenti TLR/Tn", type: "number", step: 0.1, min: 0.1 },
        { key: "yukMomentiOrani_Tyuk_Tn", label: "Yük Momenti Tyük/Tn", type: "number", step: 0.1, min: 0.01 },
        { key: "anmaGerilimi_V", label: "Anma Gerilimi (V)", type: "number", step: 10, min: 1 },
        { key: "kalkistaTerminalGerilimi_V", label: "Kalkışta Terminal Gerilimi (V)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ anmaGucu_kW: 22, anmaDevri_rpm: 1470, kalkisMomentiOrani_TLR_Tn: 2, yukMomentiOrani_Tyuk_Tn: 1, anmaGerilimi_V: 400, kalkistaTerminalGerilimi_V: 340 }}
      mainUnit={'N·m'}
      mainValueKey={'kalkisMomenti_Nm'}
      mainDecimals={1}
      intermediateLabels={{
        anma_momenti_Nm: "Anma Momenti (N·m)",
        gerilim_orani: "V/Vn",
        yuk_momenti_Nm: "Yük Momenti (N·m)",
        hizlandirma_momenti_Nm: "Hızlandırma Momenti (N·m)",
        kalkis_yuk_orani: "Kalkış / Yük Momenti",
        gereken_min_terminal_gerilimi_V: "Gereken Min. Gerilim (V)",
      }}
    />
  );
}
