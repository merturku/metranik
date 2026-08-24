"use client";

import { yanmaHavasiIhtiyaci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanmaHavasiIhtiyaciPage() {
  return (
    <CalcPage
      module={yanmaHavasiIhtiyaci}
      standardsLabel="Stokiyometrik Yanma"
      description="Yakıt debisi, teorik hava/yakıt oranı ve fazla hava katsayısından, kazan/brülör için gerekli yanma havası debisini hesaplar."
      formula="Vteorik = Vyakıt × oran, Vgerekli = Vteorik × λ"
      engineeringNote="Doğalgaz (~CH4) için teorik oran ~9.52 Nm³ hava/Nm³ yakıt (CH4 + 2O2 → CO2 + 2H2O, hava %21 O2 içerir → 2/0.21≈9.52). Fazla hava katsayısı λ>1, eksiksiz yanmayı güvence altına almak için uygulanır (tipik 1.1-1.3)."
      fields={[
        {
          key: "yakitDebisi_Nm3h",
          label: "Yakıt Debisi (Nm³/h)",
          type: "number",
          min: 0.1,
          step: 1,
        },
        {
          key: "teorikHavaOrani_Nm3Nm3",
          label: "Teorik Hava Oranı (Nm³ hava/Nm³ yakıt)",
          type: "number",
          min: 1,
          step: 0.1,
        },
        {
          key: "fazlaHavaKatsayisi_lambda",
          label: "Fazla Hava Katsayısı λ",
          type: "number",
          min: 1,
          step: 0.05,
        },
      ]}
      defaults={{
        yakitDebisi_Nm3h: 10,
        teorikHavaOrani_Nm3Nm3: 9.52,
        fazlaHavaKatsayisi_lambda: 1.15,
      }}
      mainUnit="Nm³/h"
      mainValueKey="gerekliYanmaHavasi_Nm3h"
      mainDecimals={1}
      intermediateLabels={{
        teorikHavaDebisi_Nm3h: "Teorik Hava Debisi (Nm³/h)",
      }}
    />
  );
}
