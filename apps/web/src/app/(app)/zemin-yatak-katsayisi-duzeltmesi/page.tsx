"use client";

import { zeminYatakKatsayisiDuzeltmesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminYatakKatsayisiDuzeltmesiPage() {
  return (
    <CalcPage
      module={zeminYatakKatsayisiDuzeltmesi}
      standardsLabel="Terzaghi & Peck"
      description="Standart plaka yükleme deneyiyle (genelde 0.3m×0.3m) ölçülen zemin yatak katsayısını, gerçek temel genişliğine göre düzeltir."
      formula="Kohezyonsuz: k = k1×[(B+0.3)/(2B)]², Kohezyonlu: k = k1×(0.3/B)"
      engineeringNote="Zemin yatak katsayısı (subgrade reaction modulus), radye/mat temel tasarımında Winkler zemin modeli için kullanılır; ölçek etkisi kohezyonlu ve kohezyonsuz zeminlerde farklı davranır."
      fields={[
        {
          key: "plakaYatakKatsayisi_k1_kNm3",
          label: "Plaka Yatak Katsayısı k1 (kN/m³)",
          type: "number",
          min: 100,
          step: 500,
        },
        {
          key: "temelGenisligi_B_m",
          label: "Temel Genişliği B (m)",
          type: "number",
          min: 0.3,
          step: 0.1,
        },
        {
          key: "zeminTipi",
          label: "Zemin Tipi",
          type: "select",
          options: [
            { value: "kohezyonsuz", label: "Kohezyonsuz (Granüler)" },
            { value: "kohezyonlu", label: "Kohezyonlu" },
          ],
        },
      ]}
      defaults={{
        plakaYatakKatsayisi_k1_kNm3: 20000,
        temelGenisligi_B_m: 1.5,
        zeminTipi: "kohezyonsuz",
      }}
      mainUnit="kN/m³"
      mainValueKey="duzeltilmisYatakKatsayisi_k_kNm3"
      intermediateLabels={{ duzeltmeKatsayisi: "Düzeltme Katsayısı" }}
    />
  );
}
