"use client";

import { boruKritikVanaKapanmaSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruKritikVanaKapanmaSuresiPage() {
  return (
    <CalcPage
      module={boruKritikVanaKapanmaSuresi}
      standardsLabel="Allievi Kriteri"
      description="Boru uzunluğu ve basınç dalgası hızından kritik vana kapanma süresini hesaplar; verilen gerçek kapanma süresiyle karşılaştırarak ani mi yoksa yavaş mı kapanma olduğunu belirler."
      formula="tc = 2L/a"
      engineeringNote="Kapanma süresi tc'den kısaysa (ani kapanma) tam Joukowsky basınç darbesi oluşur; tc'den uzunsa (yavaş kapanma) darbe azalır. Su Darbesi Basıncı (Joukowsky) modülünün hesapladığı basınç artışının gerçekleşip gerçekleşmeyeceğinin zamanlama kontrolüdür."
      fields={[
        {
          key: "boruUzunlugu_L_m",
          label: "Boru Uzunluğu L (m)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "basincDalgasiHizi_a_ms",
          label: "Basınç Dalgası Hızı a (m/s)",
          type: "number",
          min: 100,
          step: 50,
        },
        {
          key: "vanaKapanmaSuresi_tkapanma_s",
          label: "Vana Kapanma Süresi (s)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        boruUzunlugu_L_m: 500,
        basincDalgasiHizi_a_ms: 1200,
        vanaKapanmaSuresi_tkapanma_s: 3,
      }}
      mainUnit="s"
      mainValueKey="kritikKapanmaSuresi_tc_s"
      mainDecimals={3}
      intermediateLabels={{
        vanaKapanmaSuresi_s: "Vana Kapanma Süresi (s)",
      }}
    />
  );
}
