"use client";

import { aydinlatmaGucYogunluguKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AydinlatmaGucYogunluguKontroluPage() {
  return (
    <CalcPage
      module={aydinlatmaGucYogunluguKontrolu}
      standardsLabel="ASHRAE 90.1 (LPD)"
      description="Toplam kurulu aydınlatma gücünü alana bölerek aydınlatma güç yoğunluğunu (LPD) hesaplar ve enerji verimliliği yönetmeliğinin öngördüğü üst sınırla karşılaştırır."
      formula="LPD = Toplam Güç / Alan"
      engineeringNote="Aydınlatma (Lüks Yöntemi) modülünden farklı bir metriktir: orada görme konforu için gereken aydınlık düzeyi (lüks), burada enerji tüketimi (W/m²) ölçülür. İzin verilen sınır, kullanım tipine göre ASHRAE 90.1 veya yerel enerji performansı yönetmeliğinden alınır."
      fields={[
        {
          key: "toplamAydinlatmaGucu_W",
          label: "Toplam Aydınlatma Gücü (W)",
          type: "number",
          min: 1,
          step: 50,
        },
        {
          key: "alan_m2",
          label: "Alan (m²)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "izinVerilenLPD_Wm2",
          label: "İzin Verilen LPD (W/m²)",
          type: "number",
          min: 1,
          step: 0.5,
        },
      ]}
      defaults={{
        toplamAydinlatmaGucu_W: 1800,
        alan_m2: 200,
        izinVerilenLPD_Wm2: 10,
      }}
      mainUnit="W/m²"
      mainValueKey="hesaplananLPD_Wm2"
      mainDecimals={2}
      intermediateLabels={{
        izinVerilenLPD_Wm2: "İzin Verilen LPD (W/m²)",
      }}
    />
  );
}
