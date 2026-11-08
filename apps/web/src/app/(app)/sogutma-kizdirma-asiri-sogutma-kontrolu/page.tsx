"use client";

import { sogutmaKizdirmaAsiriSogutmaKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SogutmaKizdirmaAsiriSogutmaKontroluPage() {
  return (
    <CalcPage
      module={sogutmaKizdirmaAsiriSogutmaKontrolu}
      standardsLabel="Üretici aralığı (standart atfı yok)"
      description="Emme ve sıvı hattı sıcaklıklarını doyma sıcaklıklarıyla karşılaştırarak kızdırma ve aşırı soğutma değerlerini hesaplar, kabul aralığıyla değerlendirir."
      formula="SH = T_emme − T_evap;  SC = T_yoğuşma − T_sıvı hattı"
      engineeringNote="Doyma sıcaklıklarını manometre basıncından akışkan tablosuyla okuyun. Kabul aralığı genleşme elemanına ve üreticiye göre değişir (termostatik vanada tipik SH 5–10 K, SC 3–8 K); aralıklar girdidir. Aralık dışı ≤ 2 K ise sınırda sayılır."
      fields={[
        { key: "emmeHattiSicakligi_C", label: "Emme Hattı Sıcaklığı (°C)", type: "number", step: 0.5 },
        { key: "evaporasyonSicakligi_C", label: "Evaporasyon (Doyma) Sıcaklığı (°C)", type: "number", step: 0.5 },
        { key: "yogusmaSicakligi_C", label: "Yoğuşma (Doyma) Sıcaklığı (°C)", type: "number", step: 0.5 },
        { key: "sivi_hatti_sicakligi_C", label: "Sıvı Hattı Sıcaklığı (°C)", type: "number", step: 0.5 },
        { key: "kizdirmaMin_K", label: "Kızdırma Min (K)", type: "number", step: 0.5, min: 0 },
        { key: "kizdirmaMax_K", label: "Kızdırma Max (K)", type: "number", step: 0.5, min: 0 },
        { key: "asiriSogutmaMin_K", label: "Aşırı Soğutma Min (K)", type: "number", step: 0.5, min: 0 },
        { key: "asiriSogutmaMax_K", label: "Aşırı Soğutma Max (K)", type: "number", step: 0.5, min: 0 },
      ]}
      defaults={{ emmeHattiSicakligi_C: 12, evaporasyonSicakligi_C: 5, yogusmaSicakligi_C: 45, sivi_hatti_sicakligi_C: 40, kizdirmaMin_K: 5, kizdirmaMax_K: 10, asiriSogutmaMin_K: 3, asiriSogutmaMax_K: 8 }}
      mainUnit="K"
      mainValueKey="kizdirma_K"
      mainDecimals={1}
      intermediateLabels={{
        asiri_sogutma_K: "Aşırı Soğutma (K)",
        kizdirma_sapmasi_K: "Kızdırma Sapması (K)",
        asiri_sogutma_sapmasi_K: "Aşırı Soğutma Sapması (K)",
      }}
    />
  );
}
