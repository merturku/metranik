"use client";

import { suSertligiBirimDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SuSertligiBirimDonusumuPage() {
  return (
    <CalcPage
      module={suSertligiBirimDonusumu}
      standardsLabel="Su kimyası birim dönüşümü (CaCO₃ eşdeğeri)"
      description="Su sertliğini Fransız (°fH), Alman (°dH), ABD (gpg), mmol/L ve ppm CaCO₃ birimleri arasında çevirir ve sertlik sınıfını verir."
      formula="1 °fH = 10 ppm;   1 °dH = 17,848 ppm;   1 gpg = 17,118 ppm;   1 mmol/L = 100,09 ppm"
      engineeringNote="Sınıf eşikleri (60 / 120 / 180 mg/L CaCO₃) WQA/USGS'de yaygın kullanılan değerlerdir; yönetmelikler farklı sınıflandırma kullanabilir. Yumuşatıcı reçine boyutlandırması için Su Yumuşatma Reçine Hacmi modülünü kullanın. Kireçlenme riski ayrıca pH, sıcaklık ve alkaliniteye bağlıdır."
      fields={[
        { key: "deger", label: "Sertlik Değeri", type: "number", min: 0, step: 1 },
        {
          key: "birim",
          label: "Birim",
          type: "select",
          options: [
            { value: "fH", label: "°fH (Fransız)" },
            { value: "dH", label: "°dH (Alman)" },
            { value: "ppm", label: "ppm / mg/L CaCO₃" },
            { value: "gpg", label: "gpg (ABD)" },
            { value: "mmol", label: "mmol/L" },
          ],
        },
      ]}
      defaults={{ deger: 20, birim: "dH" }}
      mainUnit="ppm (mg/L CaCO₃)"
      mainValueKey="ppm_CaCO3"
      mainDecimals={1}
      intermediateLabels={{
        fransiz_fH: "Fransız (°fH)",
        alman_dH: "Alman (°dH)",
        abd_gpg: "ABD (gpg)",
        mmol_L: "mmol/L",
        sinif: "Sertlik Sınıfı",
      }}
    />
  );
}
