"use client";

import { yakitDeposuOtonomiSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YakitDeposuOtonomiSuresiPage() {
  return (
    <CalcPage
      module={yakitDeposuOtonomiSuresi}
      standardsLabel="Hacim/Debi İlişkisi"
      description="Depo hacmi ve yakıt tüketim debisinden, yakıt deposunun kesintisiz besleyebileceği süreyi hesaplar."
      formula="t = V/Q"
      engineeringNote="Jeneratör Yakıt Tüketimi veya Endüstriyel Boyler Yakıt Tüketimi modüllerinin ürettiği debiyi girdi olarak kullanır."
      fields={[
        {
          key: "depoHacmi_V_L",
          label: "Depo Hacmi V (L)",
          type: "number",
          min: 1,
          step: 100,
        },
        {
          key: "yakitTuketimDebisi_Q_Lh",
          label: "Yakıt Tüketim Debisi Q (L/h)",
          type: "number",
          min: 0.1,
          step: 1,
        },
      ]}
      defaults={{
        depoHacmi_V_L: 2000,
        yakitTuketimDebisi_Q_Lh: 50,
      }}
      mainUnit="saat"
      mainValueKey="otonomiSuresi_saat"
      mainDecimals={1}
      intermediateLabels={{
        otonomiSuresi_gun: "Otonomi Süresi (gün)",
      }}
    />
  );
}
