"use client";

import { susturucuUzunlugu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SusturucuUzunluguPage() {
  return (
    <CalcPage
      module={susturucuUzunlugu}
      standardsLabel="Fiziksel Formül"
      description="Gerekli ses azaltımına ve susturucunun birim uzunluk başına azaltımına göre gerekli susturucu uzunluğunu hesaplar."
      formula="L = Gerekli Azaltım / Birim Azaltım"
      engineeringNote="Birim azaltım değeri (dB/m) susturucu tipine (reaktif, dissipatif) ve frekansa göre değişir; üretici verisi kullanılması önerilir."
      fields={[
        {
          key: "gerekliSesAzaltimi_dB",
          label: "Gerekli Ses Azaltımı (dB)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "birimAzaltim_dBm",
          label: "Birim Azaltım (dB/m)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
      ]}
      defaults={{ gerekliSesAzaltimi_dB: 20, birimAzaltim_dBm: 4 }}
      mainUnit="m"
      mainValueKey="gerekliUzunluk_m"
      intermediateLabels={{ birimAzaltim_dBm: "Birim Azaltım (dB/m)" }}
    />
  );
}
