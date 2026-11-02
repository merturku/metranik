"use client";

import { isiPompasiDengeNoktasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiPompasiDengeNoktasiPage() {
  return (
    <CalcPage
      module={isiPompasiDengeNoktasi}
      standardsLabel="TS EN 14825 — kısmi yük ve denge noktası kavramı"
      description="Bina ısı yükü eğrisi ile ısı pompası kapasite eğrisinin kesiştiği dış sıcaklığı (denge noktasını) ve tasarım koşulunda gereken ek ısıtıcı gücünü hesaplar."
      formula="Q_bina = Q_t·(Ti − T)/(Ti − T_t);   Q_kap = c1 + s·(T − Ta1);   T_denge = (k·Ti − c1 + s·Ta1)/(k + s)"
      engineeringNote="Bina yükü dış sıcaklıkla doğrusal, pompa kapasitesi iki üretici noktası arasında doğrusal kabul edilir; gerçek kapasite eğrisi (buzlanma/defrost dahil) eğrisel olabilir, üretici tablosundan iki yakın nokta seçin. Denge noktası tasarım sıcaklığının altında kalırsa pompa yükü tek başına karşılar. Mevsimsel verim için Isı Pompası Mevsimsel Performans modülüne bakın."
      fields={[
        { key: "icSicaklik_C", label: "İç Tasarım Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "tasarimDisSicaklik_C", label: "Tasarım Dış Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "tasarimYuku_kW", label: "Tasarım Isı Yükü (kW)", type: "number", min: 0.1, step: 0.5 },
        { key: "kapasiteSicaklik1_C", label: "Kapasite Noktası 1 — Dış Sıcaklık (°C)", type: "number", step: 1 },
        { key: "kapasite1_kW", label: "Kapasite Noktası 1 — Isıtma Kapasitesi (kW)", type: "number", min: 0.1, step: 0.5 },
        { key: "kapasiteSicaklik2_C", label: "Kapasite Noktası 2 — Dış Sıcaklık (°C)", type: "number", step: 1 },
        { key: "kapasite2_kW", label: "Kapasite Noktası 2 — Isıtma Kapasitesi (kW)", type: "number", min: 0.1, step: 0.5 },
      ]}
      defaults={{ icSicaklik_C: 20, tasarimDisSicaklik_C: -5, tasarimYuku_kW: 10, kapasiteSicaklik1_C: -7, kapasite1_kW: 6, kapasiteSicaklik2_C: 7, kapasite2_kW: 9 }}
      mainUnit="°C (denge sıcaklığı)"
      mainValueKey="dengeSicakligi_C"
      mainDecimals={1}
      intermediateLabels={{
        denge_yuku_kW: "Denge Noktasındaki Yük (kW)",
        tasarim_noktasi_pompa_kapasitesi_kW: "Tasarım Noktasında Pompa Kapasitesi (kW)",
        ek_isitici_gereksinimi_kW: "Ek Isıtıcı Gereksinimi (kW)",
        ek_isitici_orani_yuzde: "Ek Isıtıcı Oranı (%)",
        durum: "Değerlendirme",
      }}
    />
  );
}
