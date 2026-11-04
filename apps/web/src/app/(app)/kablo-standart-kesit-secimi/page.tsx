"use client";

import { kabloStandartKesitSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloStandartKesitSecimiPage() {
  return (
    <CalcPage
      module={kabloStandartKesitSecimi}
      standardsLabel="IEC 60228 — iletken kesit serisi"
      description="Hesaplanan teorik kesitten bir üst standart iletken kesitini seçer."
      formula="A_std = min{A ∈ IEC 60228 serisi : A ≥ A_hesap}"
      engineeringNote="Kesit; akım taşıma, gerilim düşümü ve kısa devre kriterlerinin en büyüğüne göre belirlenmelidir (ilgili modüllerden gelen en büyük değeri girin). Seri mm² cinsinden bakır/alüminyum için ortaktır; 630 mm² üstü paralel kabloyla çözülür."
      fields={[
        { key: "hesaplananKesit_mm2", label: "Hesaplanan Kesit (mm²)", type: "number", step: 1, min: 0.01 },
      ]}
      defaults={{ hesaplananKesit_mm2: 42 }}
      mainUnit="mm²"
      mainValueKey="standartKesit_mm2"
      mainDecimals={1}
      intermediateLabels={{
        pay_yuzde: "Standart Kesit Payı (%)",
        bir_alt_standart_kesit_mm2: "Bir Alt Standart Kesit (mm²)",
      }}
    />
  );
}
