"use client";

import { kapalıSistemDolumDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KapalıSistemDolumDebisiPage() {
  return (
    <CalcPage
      module={kapalıSistemDolumDebisi}
      standardsLabel="EN 12828"
      description="Kapalı sistem bileşenlerinin toplam hacminden, sistem doldurma işlemi için gerekli pompa debisini hesaplar."
      formula="Q_dolum = 0.5 m/h × A_sistem"
      engineeringNote="EN 12828 standardında, kapalı ısıtma sistemlerinin dolum işlemi sırasında kullanılan pompa debisi, sistem hacminin yüzde 0.5'i (m/h cinsinden alan) kadar olmalıdır. Bu, hava çıkarma ve balastlamayı güvenli bir şekilde gerçekleştirmek için gereklidir."
      fields={[
        {
          key: "kazan_hacmi_L",
          label: "Kazan Hacmi (L)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "radyator_toplam_hacmi_L",
          label: "Radyatör Toplam Hacmi (L)",
          type: "number",
          min: 0,
          step: 10,
        },
        {
          key: "boru_hacmi_L",
          label: "Boru Hacmi (L)",
          type: "number",
          min: 0,
          step: 10,
        },
        {
          key: "dolum_hizi_mh",
          label: "Dolum Hızı (m/h)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        kazan_hacmi_L: 100,
        radyator_toplam_hacmi_L: 80,
        boru_hacmi_L: 20,
        dolum_hizi_mh: 0.5,
      }}
      mainUnit="L/h"
      mainValueKey="gereken_dolum_debisi_Lh"
      mainDecimals={1}
      intermediateLabels={{
        sistem_toplam_hacmi_L: "Sistem Toplam Hacmi (L)",
      }}
    />
  );
}
