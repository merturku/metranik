"use client";

import { motorKalkisGerilimDusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MotorKalkisGerilimDusumuPage() {
  return (
    <CalcPage
      module={motorKalkisGerilimDusumu}
      standardsLabel="IEC 60364-5-52 Ek G — gerilim düşümü formülü"
      description="Motor kalkış akımı sırasında besleme kablosundaki üç fazlı gerilim düşümünü hesaplar ve motor terminal gerilimini kontrol eder."
      formula="ΔU = √3·I_kalkış·L·(R·cosφ_k + X·sinφ_k)"
      engineeringNote="R ve X kablo birim empedansıdır (Ω/km; üretici veya IEC 60364-5-52 Ek G değerleri). Kalkış güç faktörü genellikle 0,2–0,5'tir. İzin verilen kalkış düşümü yük tipine (kontaktör tutma gerilimi, motor kalkış momenti) ve şebeke sahibine bağlı olup %10–15 yaygın bir uygulamadır, şartnameden teyit edin. Sürekli çalışma gerilim düşümü için Gerilim Düşümü Kontrolü modülünü kullanın."
      fields={[
        { key: "hatGerilimi_V", label: "Hat Gerilimi (V)", type: "number", min: 1, step: 10 },
        { key: "kalkisAkimi_A", label: "Kalkış Akımı (A)", type: "number", min: 1, step: 10 },
        { key: "kabloUzunlugu_m", label: "Kablo Uzunluğu (m)", type: "number", min: 1, step: 5 },
        { key: "direnc_ohmkm", label: "Kablo Direnci R (Ω/km)", type: "number", min: 0, step: 0.01 },
        { key: "reaktans_ohmkm", label: "Kablo Reaktansı X (Ω/km)", type: "number", min: 0, step: 0.01 },
        { key: "kalkisCosPhi", label: "Kalkış Güç Faktörü cosφ", type: "number", min: 0.05, step: 0.05 },
        { key: "izinVerilenYuzde", label: "İzin Verilen Kalkış Düşümü (%)", type: "number", min: 1, step: 1 },
      ]}
      defaults={{ hatGerilimi_V: 400, kalkisAkimi_A: 300, kabloUzunlugu_m: 100, direnc_ohmkm: 0.3, reaktans_ohmkm: 0.08, kalkisCosPhi: 0.35, izinVerilenYuzde: 10 }}
      mainUnit="V (kalkış gerilim düşümü)"
      mainValueKey="gerilimDusumu_V"
      mainDecimals={2}
      intermediateLabels={{
        gerilim_dusumu_yuzde: "Gerilim Düşümü (%)",
        motor_terminal_gerilimi_V: "Motor Terminal Gerilimi (V)",
        sin_phi: "sinφ",
      }}
    />
  );
}
