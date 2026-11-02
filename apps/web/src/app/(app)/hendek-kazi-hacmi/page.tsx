"use client";

import { hendekKaziHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HendekKaziHacmiPage() {
  return (
    <CalcPage
      module={hendekKaziHacmi}
      standardsLabel="Metraj hesabı (trapez kesit)"
      description="Şevli hendeğin kesit alanını, kazı hacmini, üst genişliğini ve kabarma payıyla gevşek hacmi hesaplar."
      formula="A = h·(b + m·h);   V = A·L;   gevşek hacim = V·(1 + kabarma)"
      engineeringNote="m yatay/düşey şev oranıdır (dik kazı için 0; kohezyonsuz zeminde şev ≈ zemin içsel sürtünme açısına göre belirlenir). Derin kazılarda iksa gereği ve izin verilen şev, iş güvenliği mevzuatı ve zemin raporuyla belirlenmelidir. Kamyon sefer sayısı için Hafriyat Hacmi & Kamyon Sefer Sayısı modülüne bakın."
      fields={[
        { key: "uzunluk_m", label: "Hendek Uzunluğu L (m)", type: "number", min: 0.1, step: 5 },
        { key: "derinlik_m", label: "Derinlik h (m)", type: "number", min: 0.1, step: 0.1 },
        { key: "tabanGenisligi_m", label: "Taban Genişliği b (m)", type: "number", min: 0.1, step: 0.1 },
        { key: "sevOrani", label: "Şev Oranı m (yatay/düşey)", type: "number", min: 0, step: 0.1 },
        { key: "kabarmaYuzde", label: "Kabarma Payı (%)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ uzunluk_m: 100, derinlik_m: 2, tabanGenisligi_m: 1, sevOrani: 0.5, kabarmaYuzde: 25 }}
      mainUnit="m³ (yerinde kazı hacmi)"
      mainValueKey="kaziHacmi_m3"
      mainDecimals={1}
      intermediateLabels={{
        kesit_alani_m2: "Kesit Alanı (m²)",
        ust_genislik_m: "Üst Genişlik (m)",
        gevsek_hacim_m3: "Gevşek Hacim (m³)",
        sev_acisi_derece: "Şev Açısı (°)",
      }}
    />
  );
}
