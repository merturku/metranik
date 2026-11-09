"use client";

import { evYuksekYatakToprakHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvYuksekYatakToprakHacmiPage() {
  return (
    <CalcPage
      module={evYuksekYatakToprakHacmi}
      standardsLabel="Standart atfı yok"
      description="Yüksek yatak veya saksı boyutlarından gereken toprak hacmini ve torba sayısını hesaplar."
      formula="V = L·G·H;  Torba = ⌈V·1000·(1 + oturma)/V_torba⌉"
      engineeringNote="Oturma payı organik karışımın ilk sezon çökmesi içindir (≈ %10–20). Drenaj katmanı (çakıl/genleşmiş kil) için yatak derinliğinden düşün."
      fields={[
        { key: "uzunluk_m", label: "Uzunluk (m)", type: "number", step: 0.1, min: 0.01 },
        { key: "genislik_m", label: "Genişlik (m)", type: "number", step: 0.1, min: 0.01 },
        { key: "derinlik_m", label: "Toprak Derinliği (m)", type: "number", step: 0.05, min: 0.01 },
        { key: "oturmaPayiYuzde", label: "Oturma Payı (%)", type: "number", step: 1, min: 0 },
        { key: "torbaHacmi_L", label: "Torba Hacmi (L)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ uzunluk_m: 2, genislik_m: 1, derinlik_m: 0.4, oturmaPayiYuzde: 10, torbaHacmi_L: 50 }}
      mainUnit="torba"
      mainValueKey="torbaSayisi"
      mainDecimals={0}
      intermediateLabels={{
        net_hacim_m3: "Net Hacim (m³)",
        oturma_dahil_hacim_L: "Oturma Dahil Hacim (L)",
        satin_alinan_hacim_L: "Satın Alınan Hacim (L)",
      }}
    />
  );
}
