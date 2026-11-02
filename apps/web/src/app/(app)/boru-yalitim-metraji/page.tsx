"use client";

import { boruYalitimMetraji } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruYalitimMetrajiPage() {
  return (
    <CalcPage
      module={boruYalitimMetraji}
      standardsLabel="Geometrik metraj (silindirik kabuk)"
      description="Boru yalıtım malzemesi hacmini ve dış kaplama (alüminyum/PVC) yüzey alanını fire payıyla hesaplar."
      formula="V = π/4·[(D + 2t)² − D²]·L;   A = π·(D + 2t)·L"
      engineeringNote="Kalınlık yoğuşma, enerji tasarrufu veya ısı kaybı sınırına göre ayrıca belirlenir (Yoğuşma Önleyici Yalıtım Kalınlığı, Boru Isı Kaybı modülleri). Dirsek, vana ve flanş yalıtımı için ayrı fire payı ekleyin. Yalıtım boru kabuğu satın alınıyorsa m cinsinden uzunluk esas alınır."
      fields={[
        { key: "boruDisCapi_mm", label: "Boru Dış Çapı D (mm)", type: "number", min: 5, step: 1 },
        { key: "yalitimKalinligi_mm", label: "Yalıtım Kalınlığı t (mm)", type: "number", min: 5, step: 1 },
        { key: "boruUzunlugu_m", label: "Boru Uzunluğu (m)", type: "number", min: 0.1, step: 5 },
        { key: "fireYuzde", label: "Fire Payı (%)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ boruDisCapi_mm: 114.3, yalitimKalinligi_mm: 30, boruUzunlugu_m: 100, fireYuzde: 10 }}
      mainUnit="m³ (fireli yalıtım hacmi)"
      mainValueKey="yalitimHacmi_m3"
      mainDecimals={2}
      intermediateLabels={{
        net_hacim_m3: "Net Hacim (m³)",
        dis_yuzey_alani_m2: "Dış Yüzey Alanı (m²)",
        yalitim_dis_capi_mm: "Yalıtım Dış Çapı (mm)",
        kaplama_alani_fireli_m2: "Fireli Kaplama Alanı (m²)",
        birim_uzunluk_hacmi_dm3_m: "Birim Uzunluk Hacmi (dm³/m)",
      }}
    />
  );
}
