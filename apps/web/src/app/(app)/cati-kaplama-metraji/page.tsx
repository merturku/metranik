"use client";

import { catiKaplamaMetraji } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CatiKaplamaMetrajiPage() {
  return (
    <CalcPage
      module={catiKaplamaMetraji}
      standardsLabel="Trigonometrik Formül"
      description="Eğimli çatının izdüşüm (plan) alanından, eğim açısını hesaba katarak gerçek yüzey alanını ve fire paylı gerekli kaplama malzemesi miktarını hesaplar."
      formula="Gerçek Alan = İzdüşüm Alanı / cos(θ), Gerekli Malzeme = Gerçek Alan × (1+Fire)"
      engineeringNote="Eğim açısı arttıkça gerçek çatı alanı izdüşümden hızla büyür (örn. 45°'de ~%41 daha fazla); mimari projedeki eğim açısı esas alınmalıdır."
      fields={[
        {
          key: "izdusumAlani_m2",
          label: "İzdüşüm (Plan) Alanı (m²)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "egimAcisi_derece",
          label: "Eğim Açısı (derece)",
          type: "number",
          min: 0,
          step: 1,
        },
        {
          key: "fireOrani",
          label: "Fire Oranı (0-1)",
          type: "number",
          min: 0,
          step: 0.01,
        },
      ]}
      defaults={{
        izdusumAlani_m2: 150,
        egimAcisi_derece: 30,
        fireOrani: 0.1,
      }}
      mainUnit="m²"
      mainValueKey="gerekliMalzeme_m2"
      intermediateLabels={{ gercekCatiAlani_m2: "Gerçek Çatı Alanı (m²)" }}
    />
  );
}
