"use client";

import { boruIsiKaybiIzolasyon } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruIsiKaybiIzolasyonPage() {
  return (
    <CalcPage
      module={boruIsiKaybiIzolasyon}
      standardsLabel="Fiziksel Formül"
      description="İzolasyonlu borudaki silindirik iletim ısı kaybını, izolasyon kalınlığına ve sıcaklık farkına göre hesaplar."
      formula="q' = 2πk(T1-T2)/ln(r2/r1)"
      engineeringNote="Bu hesap yalnızca izolasyon içindeki iletimi kapsar; boru duvarı direnci ve dış yüzey taşınım/ışınım kaybı ihmal edilmiştir (genelde izolasyon direnci baskındır)."
      fields={[
        {
          key: "izolasyonIsiIletkenligi_k_WmK",
          label: "Izolasyon Isı İletkenliği k (W/mK)",
          type: "number",
          min: 0.01,
          step: 0.005,
        },
        {
          key: "boruDisYaricapi_r1_mm",
          label: "Boru Dış Yarıçapı r1 (mm)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "izolasyonDisYaricapi_r2_mm",
          label: "İzolasyon Dış Yarıçapı r2 (mm)",
          type: "number",
          min: 1,
          step: 1,
        },
        { key: "icSicaklik_T1_C", label: "İç Sıcaklık T1 (°C)", type: "number", min: -50, step: 1 },
        { key: "disSicaklik_T2_C", label: "Dış Sıcaklık T2 (°C)", type: "number", min: -50, step: 1 },
        { key: "boruUzunlugu_L_m", label: "Boru Uzunluğu L (m)", type: "number", min: 0.1, step: 1 },
      ]}
      defaults={{
        izolasyonIsiIletkenligi_k_WmK: 0.04,
        boruDisYaricapi_r1_mm: 30,
        izolasyonDisYaricapi_r2_mm: 60,
        icSicaklik_T1_C: 80,
        disSicaklik_T2_C: 20,
        boruUzunlugu_L_m: 10,
      }}
      mainUnit="W"
      mainValueKey="toplamIsiKaybi_W"
      intermediateLabels={{ birimUzunlukKaybi_Wm: "Birim Uzunluk Kaybı (W/m)" }}
    />
  );
}
