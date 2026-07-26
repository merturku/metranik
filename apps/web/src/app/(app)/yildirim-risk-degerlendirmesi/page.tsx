"use client";

import { yildirimRiskDegerlendirmesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YildirimRiskDegerlendirmesiPage() {
  return (
    <CalcPage
      module={yildirimRiskDegerlendirmesi}
      standardsLabel="IEC 62305-2"
      description="Yıldırım yer yoğunluğuna ve yapının eşdeğer toplama alanına göre yıllık beklenen yıldırım düşme sıklığını hesaplar."
      formula="Nd = Ng × Ae × Cd × 10⁻⁶"
      engineeringNote="Bu basitleştirilmiş hesap, IEC 62305-2'deki tam risk değerlendirmesinin (kayıp türleri, koruma önlemleri) yerine geçmez; yalnızca düşme sıklığını verir."
      fields={[
        {
          key: "yildirimYogunlugu_Ng_km2yil",
          label: "Yıldırım Yer Yoğunluğu Ng (yıldırım/km²/yıl)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
        {
          key: "esdegerToplamaAlani_Ae_m2",
          label: "Eşdeğer Toplama Alanı Ae (m²)",
          type: "number",
          min: 1,
          step: 100,
        },
        {
          key: "konumKatsayisi_Cd",
          label: "Konum Katsayısı Cd",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        yildirimYogunlugu_Ng_km2yil: 4,
        esdegerToplamaAlani_Ae_m2: 10000,
        konumKatsayisi_Cd: 1,
      }}
      mainUnit="/yıl"
      mainValueKey="yillikDusmeSikligi_Nd"
      mainDecimals={4}
      intermediateLabels={{ konumKatsayisi_Cd: "Konum Katsayısı (Cd)" }}
    />
  );
}
