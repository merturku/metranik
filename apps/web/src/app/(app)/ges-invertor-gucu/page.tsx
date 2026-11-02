"use client";

import { gesInvertorGucu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GesInvertorGucuPage() {
  return (
    <CalcPage
      module={gesInvertorGucu}
      standardsLabel="IEC 62548 — PV dizi tasarımı (DC/AC oranı pratiği)"
      description="GES panel gücü ve hedef DC/AC oranından invertör gücünü ticari basamaklara göre seçer, gerçek oranı ve yüklenmeyi verir."
      formula="P_AC,ideal = P_DC / (DC/AC);   seçim: en küçük ticari basamak ≥ P_AC,ideal"
      engineeringNote="DC/AC oranı yaygın olarak 1,1–1,3 seçilir (1,4'ü aşınca güneşli saatlerde tepe kırpma artar). Basamak listesi tipik konut/ticari invertör güçlerini içerir; üretici kataloğundan teyit edin. Dizi bağlantısı (Voc/MPPT penceresi) için GES Dizi Panel Sayısı modülüne bakın."
      fields={[
        { key: "dcPanelGucu_kWp", label: "Panel Gücü (kWp)", type: "number", min: 0.1, step: 1 },
        { key: "hedefDcAcOrani", label: "Hedef DC/AC Oranı", type: "number", min: 1, step: 0.05 },
      ]}
      defaults={{ dcPanelGucu_kWp: 12, hedefDcAcOrani: 1.2 }}
      mainUnit="kW (invertör AC gücü)"
      mainValueKey="invertorGucu_kW"
      mainDecimals={1}
      intermediateLabels={{
        ideal_ac_gucu_kW: "İdeal AC Gücü (kW)",
        gercek_dc_ac_orani: "Gerçek DC/AC Oranı",
        invertor_yuklenme_yuzde: "İnvertör Yüklenmesi (%)",
      }}
    />
  );
}
