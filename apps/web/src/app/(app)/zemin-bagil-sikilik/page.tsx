"use client";

import { zeminBagilSikilik } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminBagilSikilikPage() {
  return (
    <CalcPage
      module={zeminBagilSikilik}
      standardsLabel="ASTM D4254 / D4253"
      description="Kuru birim hacim ağırlık ve emaks/emin değerlerinden kohezyonsuz zeminin boşluk oranını, bağıl sıkılığını ve sıkılık sınıfını hesaplar."
      formula="e = Gs·γw/γd − 1;  Dr = (emaks − e)/(emaks − emin)"
      engineeringNote="emaks ve emin laboratuvarda ASTM D4254/D4253 ile bulunur. Sınıflama eşikleri (%15/35/65/85) literatür değeridir. Dr aralık dışında çıkarsa girdiler tutarsızdır. Yalnız kohezyonsuz zeminler için anlamlıdır."
      fields={[
        { key: "ozgulAgirlikGs", label: "Tane Özgül Ağırlığı Gs", type: "number", step: 0.01, min: 2 },
        { key: "kuruBirimHacimAgirlik_kNm3", label: "Kuru Birim Hacim Ağırlık γd (kN/m³)", type: "number", step: 0.1, min: 0.1 },
        { key: "emaks", label: "En Gevşek Boşluk Oranı emaks", type: "number", step: 0.01, min: 0.01 },
        { key: "emin", label: "En Sıkı Boşluk Oranı emin", type: "number", step: 0.01, min: 0.01 },
      ]}
      defaults={{ ozgulAgirlikGs: 2.65, kuruBirimHacimAgirlik_kNm3: 16.5, emaks: 0.8, emin: 0.45 }}
      mainUnit="%"
      mainValueKey="bagilSikilik_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        bosluk_orani_e: "Boşluk Oranı e",
        sinif: "Sıkılık Sınıfı",
        not: "Not",
      }}
    />
  );
}
