"use client";

import { kabloJouleKaybiYillikMaliyet } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloJouleKaybiYillikMaliyetPage() {
  return (
    <CalcPage
      module={kabloJouleKaybiYillikMaliyet}
      standardsLabel="Joule yasası"
      description="Kablodaki I²R güç kaybını, yıllık enerji kaybını ve maliyetini hesaplar; kesit büyütmenin ekonomik gerekçesini görmek için kullanılır."
      formula="R = R'·L;  P = 3·I²·R (3 faz) / 2·I²·R (tek faz);  E = P·h"
      engineeringNote="R' çalışma sıcaklığındaki birim dirençtir (mΩ/m); 20 °C değerini Kablo İletken Direnci modülüyle çalışma sıcaklığına taşıyın. Girilen akım yıl boyunca etkin (RMS) çalışma akımı olmalıdır. Harmonik, deri etkisi ve dielektrik kayıpları ihmal edilir. Kablo Ekonomik Kesit modülüyle birlikte değerlendirin."
      fields={[
        { key: "faz", label: "Sistem", type: "select", options: [{ value: "3", label: "3 faz" }, { value: "1", label: "Tek faz" }] },
        { key: "akim_A", label: "Etkin Akım (A)", type: "number", step: 1, min: 0.1 },
        { key: "birimDirenc_mOhm_m", label: "Birim Direnç R' (mΩ/m)", type: "number", step: 0.01, min: 0.001 },
        { key: "uzunluk_m", label: "Hat Uzunluğu (m)", type: "number", step: 1, min: 1 },
        { key: "yillikSaat_h", label: "Yıllık Çalışma Saati (h)", type: "number", step: 100, min: 1 },
        { key: "birimFiyat_TLkWh", label: "Elektrik Birim Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ faz: "3", akim_A: 100, birimDirenc_mOhm_m: 1.15, uzunluk_m: 50, yillikSaat_h: 4000, birimFiyat_TLkWh: 3 }}
      mainUnit="W"
      mainValueKey="guc_kaybi_W"
      mainDecimals={0}
      intermediateLabels={{
        hat_direnci_ohm: "Hat Direnci (Ω)",
        yillik_enerji_kaybi_kWh: "Yıllık Enerji Kaybı (kWh)",
        yillik_maliyet_TL: "Yıllık Maliyet (₺)",
      }}
    />
  );
}
