"use client";

import { motorSenkronHizi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MotorSenkronHiziPage() {
  return (
    <CalcPage
      module={motorSenkronHizi}
      standardsLabel="Fiziksel Formül"
      description="Şebeke frekansına ve motorun kutup sayısına göre asenkron/senkron motorun senkron devir sayısını hesaplar."
      formula="n = 120×f / p"
      engineeringNote="Asenkron motorlarda gerçek devir, kayma (slip) nedeniyle senkron hızın biraz altındadır (tipik %1-5 kayma); etikette yazan anma devri bu farkı içerir."
      fields={[
        {
          key: "sebekeFrekansi_f_Hz",
          label: "Şebeke Frekansı f (Hz)",
          type: "number",
          min: 1,
          step: 1,
        },
        { key: "kutupSayisi_p", label: "Kutup Sayısı p", type: "number", min: 2, step: 2 },
      ]}
      defaults={{ sebekeFrekansi_f_Hz: 50, kutupSayisi_p: 4 }}
      mainUnit="rpm"
      mainValueKey="senkronHiz_n_rpm"
      mainDecimals={0}
      intermediateLabels={{ kutupSayisi_p: "Kutup Sayısı" }}
    />
  );
}
