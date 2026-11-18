"use client";

import { kabloOrtamSicakligiDuzeltmeKatsayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloOrtamSicakligiDuzeltmeKatsayisiPage() {
  return (
    <CalcPage
      module={kabloOrtamSicakligiDuzeltmeKatsayisi}
      standardsLabel={"IEC 60364-5-52 (Ek B)"}
      description={"Ortam sıcaklığı referanstan farklı olduğunda kablo akım taşıma kapasitesine uygulanacak sıcaklık düzeltme katsayısını yalıtım türüne göre hesaplar."}
      formula={"k = √[(θmaks − θortam)/(θmaks − θref)];  Iz' = k·Iz"}
      engineeringNote={"θmaks iletken sürekli çalışma sıcaklığıdır (PVC 70 °C; XLPE/EPR 90 °C); θref havada 30 °C, toprakta 20 °C'dir. Formül standart tablonun dayandığı ısıl bağıntıdır ve tablo değerleriyle uyuşur (örn. PVC 40 °C → 0,87; XLPE 40 °C → 0,91). Ortam θmaks'a eşit veya yüksekse kablo yüklenemez (k = 0). Gruplama katsayısıyla birlikte kullanılır."}
      fields={[
        { key: "yalitim", label: "Yalıtım Türü", type: "select", options: [{ value: "pvc", label: "PVC (70 °C)" }, { value: "xlpe", label: "XLPE / EPR (90 °C)" }] },
        { key: "ortam", label: "Kurulum Ortamı", type: "select", options: [{ value: "hava", label: "Hava (ref 30 °C)" }, { value: "toprak", label: "Toprak (ref 20 °C)" }] },
        { key: "sicaklik_C", label: "Ortam Sıcaklığı (°C)", type: "number", step: 1 },
      ]}
      defaults={{ yalitim: "pvc", ortam: "hava", sicaklik_C: 40 }}
      mainUnit={""}
      mainValueKey={"k"}
      mainDecimals={3}
      intermediateLabels={{
        theta_max_C: "θmaks (°C)",
        theta_ref_C: "θref (°C)",
        not_: "Not",
      }}
    />
  );
}
