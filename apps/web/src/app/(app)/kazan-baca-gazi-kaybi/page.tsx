"use client";

import { kazanBacaGaziKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KazanBacaGaziKaybiPage() {
  return (
    <CalcPage
      module={kazanBacaGaziKaybi}
      standardsLabel="Siegert Formülü"
      description="Baca gazı sıcaklığı, ortam sıcaklığı ve CO2 oranından, dolaylı verim yönteminin en büyük bileşeni olan baca gazı kaybını ve tahmini yanma verimini hesaplar."
      formula="qA = (Tgaz - Tortam) × (A2/CO2% + B), Verim = 100 - qA"
      engineeringNote="A2 ve B, yakıt tipine özgü Siegert katsayılarıdır (doğalgaz için tipik A2≈0.66, B≈0.009); bu basitleştirme yalnız baca gazı kaybını dikkate alır, kabuk kaybı gibi diğer kayıplar ihmal edilir — gerçek kazan verimi bu tahminden biraz daha düşük çıkar."
      fields={[
        {
          key: "bacaGaziSicakligi_Tgaz_C",
          label: "Baca Gazı Sıcaklığı (°C)",
          type: "number",
          step: 5,
        },
        {
          key: "ortamSicakligi_Tortam_C",
          label: "Ortam Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "co2Orani_yuzde",
          label: "CO2 Oranı (%)",
          type: "number",
          min: 1,
          step: 0.5,
        },
        {
          key: "siegertKatsayisi_A2",
          label: "Siegert Katsayısı A2",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
        {
          key: "siegertKatsayisi_B",
          label: "Siegert Katsayısı B",
          type: "number",
          min: 0,
          step: 0.001,
        },
      ]}
      defaults={{
        bacaGaziSicakligi_Tgaz_C: 180,
        ortamSicakligi_Tortam_C: 20,
        co2Orani_yuzde: 10,
        siegertKatsayisi_A2: 0.66,
        siegertKatsayisi_B: 0.009,
      }}
      mainUnit="%"
      mainValueKey="yanmaVerimi_yuzde"
      intermediateLabels={{
        sicaklikFarki_C: "Sıcaklık Farkı (°C)",
        bacaGaziKaybi_yuzde: "Baca Gazı Kaybı (%)",
      }}
    />
  );
}
