"use client";

import { tazeHavaOraniSicakliktan } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TazeHavaOraniSicakliktanPage() {
  return (
    <CalcPage
      module={tazeHavaOraniSicakliktan}
      standardsLabel="Karışım dengesi · ASHRAE 62.1"
      description="Dönüş, dış ve karışım havası sıcaklıklarından taze hava oranını ve debisini hesaplar; gerekli taze hava debisiyle karşılaştırır."
      formula="x = (T_karışım − T_dönüş)/(T_dış − T_dönüş);  Q_taze = x·Q_toplam"
      engineeringNote="Tam karışma ve tabakalaşma olmaması gerekir; en güvenilir sonuç dış–dönüş sıcaklık farkı ≥ 10 K iken alınır (5 K altında hesap yapılmaz). Gerekli taze hava debisi Taze Hava Debisi (ASHRAE 62.1) modülünden alınır. Oran 0–1 dışında çıkarsa ölçüm noktalarını kontrol edin."
      fields={[
        { key: "donusHavasiSicakligi_C", label: "Dönüş Havası Sıcaklığı (°C)", type: "number", step: 0.5 },
        { key: "disHavaSicakligi_C", label: "Dış Hava Sıcaklığı (°C)", type: "number", step: 0.5 },
        { key: "karisimSicakligi_C", label: "Karışım Havası Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "toplamDebi_m3h", label: "Toplam Hava Debisi (m³/h)", type: "number", step: 100, min: 1 },
        { key: "gerekliTazeHava_m3h", label: "Gerekli Taze Hava (m³/h)", type: "number", step: 50, min: 0 },
      ]}
      defaults={{ donusHavasiSicakligi_C: 24, disHavaSicakligi_C: 32, karisimSicakligi_C: 26, toplamDebi_m3h: 10000, gerekliTazeHava_m3h: 2000 }}
      mainUnit="%"
      mainValueKey="tazeHavaOrani_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        sicaklik_farki_K: "Dış–Dönüş Sıcaklık Farkı (K)",
        taze_hava_debisi_m3h: "Taze Hava Debisi (m³/h)",
        gerekli_taze_hava_m3h: "Gerekli Taze Hava (m³/h)",
        karsilama_orani_yuzde: "Karşılama Oranı (%)",
        not: "Not",
      }}
    />
  );
}
