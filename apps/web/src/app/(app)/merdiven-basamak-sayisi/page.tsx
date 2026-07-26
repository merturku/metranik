"use client";

import { merdivenBasamakSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MerdivenBasamakSayisiPage() {
  return (
    <CalcPage
      module={merdivenBasamakSayisi}
      standardsLabel="Fiziksel Formül"
      description="Kat yüksekliğine ve hedef rıht yüksekliğine göre gerekli basamak sayısını (tam sayıya yuvarlanmış) hesaplar."
      formula="n = ⌈Kat Yüksekliği / Rıht Yüksekliği⌉"
      engineeringNote="Basamak sayısı tam sayıya yuvarlandığından gerçek rıht yüksekliği, hedeflenenden az farklı çıkar; Blondel formülüyle (bkz. Merdiven Basamak Hesabı) ayrıca kontrol edin."
      fields={[
        {
          key: "katYuksekligi_cm",
          label: "Kat Yüksekliği (cm)",
          type: "number",
          min: 100,
          step: 1,
        },
        {
          key: "rihtYuksekligi_cm",
          label: "Hedef Rıht Yüksekliği (cm)",
          type: "number",
          min: 10,
          step: 0.5,
        },
      ]}
      defaults={{ katYuksekligi_cm: 300, rihtYuksekligi_cm: 17.65 }}
      mainUnit="basamak"
      mainValueKey="basamakSayisi"
      mainDecimals={0}
      intermediateLabels={{ gercekRihtYuksekligi_cm: "Gerçek Rıht Yüksekliği (cm)" }}
    />
  );
}
