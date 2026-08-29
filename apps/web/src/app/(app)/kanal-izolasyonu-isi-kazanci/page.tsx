"use client";

import { kanalIzolasyonuIsiKazanci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalIzolasyonuIsiKazanciPage() {
  return (
    <CalcPage
      module={kanalIzolasyonuIsiKazanci}
      standardsLabel="İletim + Taşınım Direnç Ağı"
      description="Kanal çevresi, izolasyon kalınlığı/iletkenliği ve dış taşınım katsayısından, izolasyonlu dikdörtgen kanaldaki ısı geçişini (kazanç veya kayıp) hesaplar."
      formula="R'ins = t/k, R'conv = 1/h, Q = (P×L)×|T1-T2|/(R'ins+R'conv)"
      engineeringNote="Boru Isı Kaybı (İzolasyonlu) modülünün silindirik geometrisinden farklı olarak, kanal yüzeyi düzlemsel kabul edilir. Soğutma kanalında ortam daha sıcaksa sonuç bir ısı kazancıdır (yoğuşma riski göstergesi); ısıtma kanalında ısı kaybıdır."
      fields={[
        {
          key: "kanalCevresi_P_m",
          label: "Kanal Çevresi P (m)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "kanalUzunlugu_L_m",
          label: "Kanal Uzunluğu L (m)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "izolasyonKalinligi_t_m",
          label: "İzolasyon Kalınlığı t (m)",
          type: "number",
          min: 0.005,
          step: 0.005,
        },
        {
          key: "izolasyonIsiIletkenligi_k_WmK",
          label: "İzolasyon Isı İletkenliği k (W/mK)",
          type: "number",
          min: 0.01,
          step: 0.005,
        },
        {
          key: "disTasinimKatsayisi_h_Wm2K",
          label: "Dış Taşınım Katsayısı h (W/m²K)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "icSicaklik_T1_C",
          label: "Kanal İçi Sıcaklık (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "disSicaklik_T2_C",
          label: "Ortam Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
      ]}
      defaults={{
        kanalCevresi_P_m: 1.4,
        kanalUzunlugu_L_m: 10,
        izolasyonKalinligi_t_m: 0.025,
        izolasyonIsiIletkenligi_k_WmK: 0.035,
        disTasinimKatsayisi_h_Wm2K: 8,
        icSicaklik_T1_C: 13,
        disSicaklik_T2_C: 30,
      }}
      mainUnit="W"
      mainValueKey="isiGecisi_W"
      mainDecimals={1}
      intermediateLabels={{
        iletimDirenci_m2KW: "İletim Direnci (m²K/W)",
        tasinimDirenci_m2KW: "Taşınım Direnci (m²K/W)",
        disYuzeyAlani_m2: "Dış Yüzey Alanı (m²)",
      }}
    />
  );
}
