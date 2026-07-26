"use client";

import { kolonNarinlikKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KolonNarinlikKontroluPage() {
  return (
    <CalcPage
      module={kolonNarinlikKontrolu}
      standardsLabel="TBDY 2018 / TS 500"
      description="Kolonun etkili boyuna ve kesit boyutuna göre narinlik oranını hesaplar ve izin verilen sınırla karşılaştırır."
      formula="λ = Lk / i, i = h/√12"
      engineeringNote="Narinlik sınırı (λlim) TBDY 2018/TS 500'de eksenel yük seviyesine göre değişir; bu modülde kullanıcı tarafından girilir."
      fields={[
        { key: "etkiliBoy_Lk_m", label: "Etkili Boy Lk (m)", type: "number", min: 0.5, step: 0.1 },
        {
          key: "kesitBoyutu_h_mm",
          label: "Kesit Boyutu h (mm)",
          type: "number",
          min: 100,
          step: 10,
        },
        {
          key: "narinlikSiniri_lambdaLim",
          label: "Narinlik Sınırı λlim",
          type: "number",
          min: 10,
          step: 1,
        },
      ]}
      defaults={{ etkiliBoy_Lk_m: 3, kesitBoyutu_h_mm: 300, narinlikSiniri_lambdaLim: 40 }}
      mainUnit=""
      mainValueKey="narinlikOrani_lambda"
      intermediateLabels={{
        ataletYaricapi_i_m: "Atalet Yarıçapı (i, m)",
        marj_lambda: "Marj (λ)",
      }}
    />
  );
}
