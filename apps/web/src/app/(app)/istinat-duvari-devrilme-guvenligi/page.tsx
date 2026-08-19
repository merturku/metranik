"use client";

import { istinatDuvariDevrilmeGuvenligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IstinatDuvariDevrilmeGuvenligiPage() {
  return (
    <CalcPage
      module={istinatDuvariDevrilmeGuvenligi}
      standardsLabel="Moment Dengesi"
      description="Aktif toprak basıncının oluşturduğu devirici momenti, duvar+temel ağırlığının direnç momentiyle karşılaştırarak devrilme güvenlik katsayısını hesaplar."
      formula="Mo = Pa×H/3, Mr = W×x̄, GS = Mr/Mo"
      engineeringNote="Aktif toprak basıncı kuvveti, istinat duvarı aktif toprak basıncı (Rankine) modülünden alınabilir; devirici moment için üçgen basınç dağılımının etki noktası tabandan H/3 yükseklikte kabul edilir. Yaygın minimum güvenlik katsayısı ~1.5-2.0'dır."
      fields={[
        {
          key: "aktifToprakBasinciKuvveti_Pa_kN",
          label: "Aktif Toprak Basıncı Kuvveti Pa (kN/m)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "duvarYuksekligi_H_m",
          label: "Duvar Yüksekliği H (m)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "duvarAgirligi_W_kN",
          label: "Duvar + Temel Ağırlığı W (kN/m)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "agirlikMerkeziMesafesi_x_m",
          label: "Ağırlık Merkezi Mesafesi x̄ (m)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "gerekliGuvenlikKatsayisi",
          label: "Gerekli Güvenlik Katsayısı",
          type: "number",
          min: 1,
          step: 0.1,
        },
      ]}
      defaults={{
        aktifToprakBasinciKuvveti_Pa_kN: 80,
        duvarYuksekligi_H_m: 4,
        duvarAgirligi_W_kN: 200,
        agirlikMerkeziMesafesi_x_m: 1.5,
        gerekliGuvenlikKatsayisi: 1.5,
      }}
      mainUnit=""
      mainValueKey="guvenlikKatsayisi_GS"
      mainDecimals={2}
      intermediateLabels={{
        deviriciMoment_kNm: "Devirici Moment (kNm)",
        direncMomenti_kNm: "Direnç Momenti (kNm)",
      }}
    />
  );
}
