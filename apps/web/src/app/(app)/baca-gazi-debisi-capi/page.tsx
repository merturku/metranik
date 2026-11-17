"use client";

import { bacaGaziDebisiCapi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BacaGaziDebisiCapiPage() {
  return (
    <CalcPage
      module={bacaGaziDebisiCapi}
      standardsLabel={"Stokiyometrik yanma / süreklilik denklemi"}
      description={"Doğalgaz yakıt giriş gücünden baca gazı debisini (fazla hava dahil) ve baca sıcaklığındaki hacimsel debiyi bulur, seçilen hıza göre baca iç çapını hesaplar."}
      formula={"V̇fg,N = (P/Hu)·[3 + 7,524 + (λ−1)·9,524];  V̇ = V̇fg,N·T/273,15;  D = √(4V̇/(π·v))"}
      engineeringNote={"Yakıt metan (CH4) varsayılır: CH4 + 2O2 → CO2 + 2H2O, hava %21 O2 / %79 N2. Doğalgaz bileşimi farklıysa debi %2–5 değişir. Bu bir ön boyuttur; gerçek baca tasarımı (çekiş, yoğuşma, basınç dengesi) TS EN 13384-1 ile yapılmalıdır. Tipik baca gazı hızları doğal çekişte 3–6 m/s, cebri çekişte 8–15 m/s'dir."}
      fields={[
        { key: "yakitGucu_kW", label: "Yakıt Giriş Gücü (kW)", type: "number", step: 50, min: 1 },
        { key: "hu_kWhNm3", label: "Alt Isıl Değer Hu (kWh/Nm³)", type: "number", step: 0.1, min: 1 },
        { key: "fazlaHava", label: "Fazla Hava Katsayısı λ", type: "number", step: 0.05, min: 1 },
        { key: "bacaSicakligi_C", label: "Baca Gazı Sıcaklığı (°C)", type: "number", step: 10, min: 20 },
        { key: "hiz_ms", label: "Tasarım Baca Hızı (m/s)", type: "number", step: 0.5, min: 0.5 },
      ]}
      defaults={{ yakitGucu_kW: 500, hu_kWhNm3: 9.59, fazlaHava: 1.2, bacaSicakligi_C: 150, hiz_ms: 6 }}
      mainUnit={"mm"}
      mainValueKey={"bacaCapi_mm"}
      mainDecimals={0}
      intermediateLabels={{
        baca_gazi_Nm3h: "Baca Gazı Debisi (Nm³/h)",
        baca_gazi_m3s: "Baca Sıcaklığında Debi (m³/s)",
        kesit_alani_m2: "Baca Kesit Alanı (m²)",
        gaz_Nm3_per_Nm3: "Baca Gazı / Yakıt (Nm³/Nm³)",
      }}
    />
  );
}
