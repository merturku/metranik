"use client";

import { evLedSeritGucAdaptor } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvLedSeritGucAdaptorPage() {
  return (
    <CalcPage
      module={evLedSeritGucAdaptor}
      standardsLabel={"P = W/m · L"}
      description={"LED şeridin birim boy gücü ve toplam uzunluğundan toplam gücü, çekilen akımı ve yedekli adaptör gücünü hesaplar."}
      formula={"P = (W/m)·L;  I = P/U;  Padaptör = P·(1 + yedek)"}
      engineeringNote={"Adaptör gücü, sürekli yük için anma gücünün %70–80'inde kullanılmalıdır (yedek payı %20–30). Uzun şeritlerde (örn. 24 V'ta 5 m üstü) gerilim düşümü nedeniyle parlaklık azalır; iki uçtan besleme veya daha kalın kablo gerekir. Şerit etiketindeki gerçek güç (W/m) esas alınmalıdır."}
      fields={[
        { key: "wm", label: "Şerit Gücü (W/m)", type: "number", step: 1, min: 0.1 },
        { key: "uzunluk_m", label: "Toplam Uzunluk (m)", type: "number", step: 0.5, min: 0.1 },
        { key: "gerilim_V", label: "Besleme Gerilimi (V)", type: "number", step: 12, min: 1 },
        { key: "yedek", label: "Adaptör Yedek Payı (0–1)", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ wm: 14.4, uzunluk_m: 5, gerilim_V: 24, yedek: 0.2 }}
      mainUnit={"W"}
      mainValueKey={"toplamGuc_W"}
      mainDecimals={1}
      intermediateLabels={{
        akim_A: "Çekilen Akım (A)",
        adaptor_gucu_W: "Gerekli Adaptör Gücü (W)",
        kWh_gunluk_6saat: "Günlük Tüketim, 6 saat (kWh)",
      }}
    />
  );
}
