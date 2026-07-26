"use client";

import { kollektorDevreSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KollektorDevreSayisiPage() {
  return (
    <CalcPage
      module={kollektorDevreSayisi}
      standardsLabel="Fiziksel Formül"
      description="Toplam debiye ve devre başına debiye göre kollektörde gerekli devre sayısını hesaplar."
      formula="n = ⌈Toplam Debi / Devre Debisi⌉"
      engineeringNote="Devre debisi, devrenin boru çapı ve hız sınırına göre belirlenir; yerden ısıtmada tipik devre debisi 0.3-1.0 m³/h aralığındadır."
      fields={[
        { key: "toplamDebi_m3h", label: "Toplam Debi (m³/h)", type: "number", min: 0.1, step: 0.5 },
        {
          key: "devreDebisi_m3h",
          label: "Devre Debisi (m³/h)",
          type: "number",
          min: 0.05,
          step: 0.05,
        },
      ]}
      defaults={{ toplamDebi_m3h: 10, devreDebisi_m3h: 0.8 }}
      mainUnit="devre"
      mainValueKey="devreSayisi"
      mainDecimals={0}
      intermediateLabels={{ devreBasinaGercekDebi_m3h: "Devre Başına Gerçek Debi (m³/h)" }}
    />
  );
}
