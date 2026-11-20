"use client";

import { fanIsiKazanciHavaSicaklikArtisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FanIsiKazanciHavaSicaklikArtisiPage() {
  return (
    <CalcPage
      module={fanIsiKazanciHavaSicaklikArtisi}
      standardsLabel={"ASHRAE Fundamentals (fan ısı kazancı)"}
      description={"Fan mil gücü ve motor veriminden havaya geçen ısıyı ve hava sıcaklık artışını hesaplar; motorun hava akımı içinde veya dışında olmasını ayırır."}
      formula={"Q = P_mil + [P_mil·(1/ηm − 1)]_(motor hava akımında);  ΔT = Q / (ṁ·cp)"}
      engineeringNote={"Fan basma tarafında (blow-through) serpantinden sonra yer alıyorsa ΔT doğrudan üfleme sıcaklığına eklenir, emme tarafında (draw-through) serpantin çıkışından sonra eklenir; serpantin yükü ve üfleme sıcaklığı seçiminde bu fark hesaba katılmalıdır. Kanaldaki ek basınç enerjisi de sonunda ısıya dönüşür fakat bu modül yalnız fan ve motor kaynaklı kazancı verir. Değişken devirde sürücü (VFD) kayıpları ayrıca eklenmelidir."}
      fields={[
        { key: "debi_m3h", label: "Hava Debisi (m³/h)", type: "number", step: 500, min: 1 },
        { key: "havaYogunlugu_kgm3", label: "Hava Yoğunluğu (kg/m³)", type: "number", step: 0.05, min: 0.5 },
        { key: "havaOzgulIsisi_kJkgK", label: "Havanın Özgül Isısı cp (kJ/kg·K)", type: "number", step: 0.01, min: 0.5 },
        { key: "milGucu_kW", label: "Fan Mil Gücü (kW)", type: "number", step: 0.5, min: 0.1 },
        { key: "motorVerimi", label: "Motor Verimi (0–1)", type: "number", step: 0.01, min: 0.3 },
        { key: "motorKonumu", label: "Motor Konumu", type: "select", options: [{ value: "hava_akiminda", label: "Hava akımı içinde (motor kaybı da havaya)" }, { value: "hava_akimi_disinda", label: "Hava akımı dışında (yalnız mil gücü)" }] },
      ]}
      defaults={{ debi_m3h: 10000, havaYogunlugu_kgm3: 1.2, havaOzgulIsisi_kJkgK: 1.006, milGucu_kW: 5.5, motorVerimi: 0.9, motorKonumu: "hava_akiminda" }}
      mainUnit={"K"}
      mainValueKey={"sicaklikArtisi_K"}
      mainDecimals={2}
      intermediateLabels={{
        motor_kaybi_kW: "Motor Kaybı (kW)",
        havaya_giren_isi_kW: "Havaya Giren Isı (kW)",
        hava_kutle_debisi_kgs: "Hava Kütle Debisi (kg/s)",
        motor_elektrik_girisi_kW: "Motor Elektrik Girişi (kW)",
      }}
    />
  );
}
