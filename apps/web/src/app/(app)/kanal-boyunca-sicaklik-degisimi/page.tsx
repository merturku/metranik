"use client";

import { kanalBoyuncaSicaklikDegisimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalBoyuncaSicaklikDegisimiPage() {
  return (
    <CalcPage
      module={kanalBoyuncaSicaklikDegisimi}
      standardsLabel={'ASHRAE Fundamentals Böl. 4 ve 23'}
      description={'Yalıtımlı hava kanalı boyunca ısı alışverişi nedeniyle oluşan sıcaklık değişimini ve çıkış sıcaklığını hesaplar.'}
      formula={'T(L) = Ta + (Ti − Ta)·e^(−NTU);  NTU = U·P·L/(ṁ·cp);  U = 1/(1/hi + t/λ + 1/ho)'}
      engineeringNote={'Kanal duvarının ısıl direnci ihmal edilir (ince sac); iç ve dış taşınım katsayıları girdidir. Sızıntı, radyasyon ve yoğuşma gizli ısısı yok. Soğuk hava kanalında yoğuşma için ayrıca Kanal Yoğuşma Önleyici Yalıtım modülüne bakın.'}
      fields={[
        { key: "debi_m3h", label: "Hava Debisi (m³/h)", type: "number", step: 100, min: 1 },
        { key: "kanalGenisligi_mm", label: "Kanal Genişliği (mm)", type: "number", step: 50, min: 50 },
        { key: "kanalYuksekligi_mm", label: "Kanal Yüksekliği (mm)", type: "number", step: 50, min: 50 },
        { key: "kanalUzunlugu_m", label: "Kanal Uzunluğu (m)", type: "number", step: 1, min: 0.1 },
        { key: "girisSicakligi_C", label: "Giriş Sıcaklığı (°C)", type: "number", step: 1, min: -50 },
        { key: "ortamSicakligi_C", label: "Ortam Sıcaklığı (°C)", type: "number", step: 1, min: -50 },
        { key: "yalitimKalinligi_mm", label: "Yalıtım Kalınlığı (mm)", type: "number", step: 5, min: 0 },
        { key: "yalitimLambda_WmK", label: "Yalıtım λ (W/mK)", type: "number", step: 0.005, min: 0.01 },
        { key: "icTasinim_h_Wm2K", label: "İç Taşınım h (W/m²K)", type: "number", step: 1, min: 1 },
        { key: "disTasinim_h_Wm2K", label: "Dış Taşınım h (W/m²K)", type: "number", step: 1, min: 1 },
        { key: "izinVerilenDusum_K", label: "İzin Verilen Değişim (K)", type: "number", step: 0.5, min: 0.1 },
      ]}
      defaults={{ debi_m3h: 3000, kanalGenisligi_mm: 600, kanalYuksekligi_mm: 400, kanalUzunlugu_m: 30, girisSicakligi_C: 40, ortamSicakligi_C: 10, yalitimKalinligi_mm: 25, yalitimLambda_WmK: 0.04, icTasinim_h_Wm2K: 8, disTasinim_h_Wm2K: 25, izinVerilenDusum_K: 3 }}
      mainUnit={'°C'}
      mainValueKey={'cikisSicakligi_C'}
      mainDecimals={2}
      intermediateLabels={{
        U_Wm2K: "U (W/m²K)",
        kanal_cevresi_m: "Kanal Çevresi (m)",
        kutle_debisi_kgs: "Kütle Debisi (kg/s)",
        NTU: "NTU",
        sicaklik_degisimi_K: "Sıcaklık Değişimi (K)",
        isi_alisverisi_W: "Isı Alışverişi (W)",
      }}
    />
  );
}
