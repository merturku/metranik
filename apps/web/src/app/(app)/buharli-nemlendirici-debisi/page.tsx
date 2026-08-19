"use client";

import { buharliNemlendiriciDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BuharliNemlendiriciDebisiPage() {
  return (
    <CalcPage
      module={buharliNemlendiriciDebisi}
      standardsLabel="Kütle Dengesi"
      description="Hava akımının nem oranını giriş değerinden hedef değere çıkarmak için gerekli buharlı nemlendirici debisini kütle dengesiyle hesaplar."
      formula="ṁbuhar = ṁhava × (w2 - w1)"
      engineeringNote="w (özgül nem, kg su buharı / kg kuru hava) değerleri psikrometrik diyagramdan veya çiy noktası hesabından alınabilir; kışın kuru iç ortam havasını konfor nem seviyesine çıkarmak için tipik bir uygulamadır."
      fields={[
        {
          key: "havaKutleselDebisi_m_kgh",
          label: "Hava Kütlesel Debisi (kg/h)",
          type: "number",
          min: 100,
          step: 100,
        },
        {
          key: "girisNemOrani_w1_kgkg",
          label: "Giriş Nem Oranı w1 (kg/kg)",
          type: "number",
          min: 0,
          step: 0.001,
        },
        {
          key: "hedefNemOrani_w2_kgkg",
          label: "Hedef Nem Oranı w2 (kg/kg)",
          type: "number",
          min: 0,
          step: 0.001,
        },
      ]}
      defaults={{
        havaKutleselDebisi_m_kgh: 5000,
        girisNemOrani_w1_kgkg: 0.004,
        hedefNemOrani_w2_kgkg: 0.008,
      }}
      mainUnit="kg/h"
      mainValueKey="buharDebisi_kgh"
      intermediateLabels={{ nemFarki_kgkg: "Nem Farkı (kg/kg)" }}
    />
  );
}
