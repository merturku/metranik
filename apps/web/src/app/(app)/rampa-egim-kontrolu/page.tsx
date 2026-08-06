"use client";

import { rampaEgimKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function RampaEgimKontroluPage() {
  return (
    <CalcPage
      module={rampaEgimKontrolu}
      standardsLabel="TS 9111"
      description="Tekerlekli sandalye/erişilebilirlik rampasının eğim yüzdesini hesaplar ve izin verilen sınırla karşılaştırır."
      formula="Eğim% = (Yükseklik / Rampa Uzunluğu) × 100"
      engineeringNote="TS 9111 (Erişilebilirlik) genel kullanım için ~%8 (1:12) üst sınır öngörür; kısa rampalarda standarttaki tabloya göre bu sınır değişebilir, kesin sınır projeye uygulanacak yönetmelikten teyit edilmelidir."
      fields={[
        {
          key: "yukseklik_m",
          label: "Yükseklik (m)",
          type: "number",
          min: 0.05,
          step: 0.05,
        },
        {
          key: "rampaUzunlugu_m",
          label: "Rampa Uzunluğu (m)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "izinVerilenEgim_yuzde",
          label: "İzin Verilen Eğim (%)",
          type: "number",
          min: 1,
          step: 0.5,
        },
      ]}
      defaults={{
        yukseklik_m: 0.6,
        rampaUzunlugu_m: 8,
        izinVerilenEgim_yuzde: 8,
      }}
      mainUnit="%"
      mainValueKey="egim_yuzde"
      intermediateLabels={{ marj_yuzde: "Marj (%)" }}
    />
  );
}
