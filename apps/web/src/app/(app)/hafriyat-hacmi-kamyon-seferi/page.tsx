"use client";

import { hafriyatHacmiKamyonSeferi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HafriyatHacmiKamyonSeferiPage() {
  return (
    <CalcPage
      module={hafriyatHacmiKamyonSeferi}
      standardsLabel="Pratik Formül"
      description="Kazılacak alan ve derinlikten yerinde (bank) hafriyat hacmini, zeminin kazı sonrası gevşemesini hesaba katarak taşınacak hacmi ve gerekli kamyon sefer sayısını bulur."
      formula="V_bank = Alan × Derinlik, V_gevşek = V_bank × Gevşeme Faktörü, Sefer = ⌈V_gevşek / Kamyon Kapasitesi⌉"
      engineeringNote="Gevşeme (swell) faktörü zemin cinsine göre değişir; kumlu/çakıllı zeminde ~1.1-1.2, killi zeminde ~1.2-1.3, kayada çok daha yüksek olabilir."
      fields={[
        {
          key: "kazilacakAlan_m2",
          label: "Kazılacak Alan (m²)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "kaziDerinligi_m",
          label: "Kazı Derinliği (m)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "gevsemeFaktoru",
          label: "Gevşeme Faktörü (örn. 1.2)",
          type: "number",
          min: 1,
          step: 0.05,
        },
        {
          key: "kamyonKapasitesi_m3",
          label: "Kamyon Kapasitesi (m³)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        kazilacakAlan_m2: 200,
        kaziDerinligi_m: 2,
        gevsemeFaktoru: 1.2,
        kamyonKapasitesi_m3: 10,
      }}
      mainUnit="sefer"
      mainValueKey="kamyonSeferSayisi"
      mainDecimals={0}
      intermediateLabels={{
        bankHacim_m3: "Bank Hacim (m³)",
        gevsekHacim_m3: "Gevşek Hacim (m³)",
      }}
    />
  );
}
