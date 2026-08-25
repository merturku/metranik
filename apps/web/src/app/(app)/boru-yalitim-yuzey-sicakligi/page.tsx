"use client";

import { boruYalitimYuzeySicakligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruYalitimYuzeySicakligiPage() {
  return (
    <CalcPage
      module={boruYalitimYuzeySicakligi}
      standardsLabel="ASTM C1055 (Dokunma Güvenliği)"
      description="İzolasyon iletim direnci ile dış yüzey taşınım direncini içeren direnç ağından, yalıtımlı boru dış yüzey sıcaklığını hesaplar ve kazara temas güvenliği açısından kontrol eder."
      formula="R'ins = ln(r2/r1)/(2πk), R'conv = 1/(h×2π×r2), Tyüzey = Tortam + Q'×R'conv"
      engineeringNote="ASTM C1055, kazara temasla yanık riskini sınırlamak için erişilebilir yüzeylerde tipik ~60°C üst sınır önerir. Boru et kalınlığı ve iç taşınım direnci ihmal edilmiştir (izolasyon direncine kıyasla küçüktür)."
      fields={[
        {
          key: "izolasyonIsiIletkenligi_k_WmK",
          label: "İzolasyon Isı İletkenliği k (W/mK)",
          type: "number",
          min: 0.01,
          step: 0.01,
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
        {
          key: "icSicaklik_T1_C",
          label: "İç Akışkan Sıcaklığı (°C)",
          type: "number",
          step: 5,
        },
        {
          key: "ortamSicakligi_Tamb_C",
          label: "Ortam Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "disTasinimKatsayisi_h_Wm2K",
          label: "Dış Taşınım Katsayısı h (W/m²K)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "izinVerilenMaxYuzeySicakligi_C",
          label: "İzin Verilen Max Yüzey Sıcaklığı (°C)",
          type: "number",
          min: 1,
          step: 5,
        },
      ]}
      defaults={{
        izolasyonIsiIletkenligi_k_WmK: 0.04,
        boruDisYaricapi_r1_mm: 30,
        izolasyonDisYaricapi_r2_mm: 60,
        icSicaklik_T1_C: 150,
        ortamSicakligi_Tamb_C: 20,
        disTasinimKatsayisi_h_Wm2K: 10,
        izinVerilenMaxYuzeySicakligi_C: 60,
      }}
      mainUnit="°C"
      mainValueKey="yuzeySicakligi_C"
      mainDecimals={1}
      intermediateLabels={{
        iletimDirenci_mKW: "İletim Direnci (m·K/W)",
        tasinimDirenci_mKW: "Taşınım Direnci (m·K/W)",
        isiAkisi_Wm: "Isı Akışı (W/m)",
      }}
    />
  );
}
