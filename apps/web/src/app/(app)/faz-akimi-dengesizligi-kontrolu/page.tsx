"use client";

import { fazAkimiDengesizligiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FazAkimiDengesizligiKontroluPage() {
  return (
    <CalcPage
      module={fazAkimiDengesizligiKontrolu}
      standardsLabel={"NEMA MG 1 §14.36 / pratik sınırlar"}
      description={"Üç faz akımı ölçümlerinden ortalamadan en büyük sapmayı yüzde olarak hesaplar ve değerlendirir."}
      formula={"Ort = (Ia + Ib + Ic)/3;  Dengesizlik % = max|Ii − Ort|/Ort × 100"}
      engineeringNote={"Akım dengesizliği, gerilim dengesizliğinin yaklaşık 6–10 katı büyüklüğünde ortaya çıkabilir. Motorlarda %5'in üzerinde derating gerekir; pratikte %10 üstü kabul edilmez. Eşik değerleri (≤ %5 uygun, ≤ %10 sınırda) genel mühendislik pratiğidir; üretici şartnamesiyle teyit edin."}
      fields={[
        { key: "ia_A", label: "Faz A Akımı (A)", type: "number", step: 1, min: 0.01 },
        { key: "ib_A", label: "Faz B Akımı (A)", type: "number", step: 1, min: 0.01 },
        { key: "ic_A", label: "Faz C Akımı (A)", type: "number", step: 1, min: 0.01 },
      ]}
      defaults={{ ia_A: 100, ib_A: 110, ic_A: 96 }}
      mainUnit={"%"}
      mainValueKey={"dengesizlik_pct"}
      mainDecimals={2}
      intermediateLabels={{
        ortalama_A: "Ortalama Akım (A)",
        en_buyuk_sapma_A: "En Büyük Sapma (A)",
        nötr_akimi_A: "Nötr Akımı (A)",
      }}
    />
  );
}
