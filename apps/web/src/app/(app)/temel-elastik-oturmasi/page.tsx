"use client";

import { temelElastikOturmasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TemelElastikOturmasiPage() {
  return (
    <CalcPage
      module={temelElastikOturmasi}
      standardsLabel="TS EN 1997-1 Ek F"
      description="Yüzeysel temelin yükleme anında oluşan elastik (ani) oturmasını elastisite teorisiyle hesaplar ve izin verilen oturmayla karşılaştırır."
      formula="s = q × B × (1 − ν²) × Is / Es"
      engineeringNote="Is etki katsayısı temel şekline ve rijitliğine bağlıdır: esnek kare temelin merkezi ~1,12, köşesi ~0,56, ortalaması ~0,95; rijit kare temel ~0,82. Es ve ν geoteknik rapordan alınmalıdır. Kumlu zeminlerde oturmanın çoğu bu bileşendir; killi zeminlerde ayrıca Zemin Konsolidasyon Oturması hesaplanıp toplanmalıdır. Tekil temeller için 25 mm sık kullanılan bir sınırdır, nihai değer yapı tipine göre belirlenir."
      fields={[
        { key: "netTemelBasinci_q_kPa", label: "Net Temel Basıncı q (kPa)", type: "number", min: 1, step: 10 },
        { key: "temelGenisligi_B_m", label: "Temel Genişliği B (m)", type: "number", min: 0.1, step: 0.1 },
        { key: "poissonOrani", label: "Poisson Oranı ν", type: "number", min: 0, step: 0.05 },
        { key: "zeminElastisiteModulu_Es_kPa", label: "Zemin Elastisite Modülü Es (kPa)", type: "number", min: 100, step: 1000 },
        { key: "etkiKatsayisi_Is", label: "Etki Katsayısı Is", type: "number", min: 0.1, step: 0.01 },
        { key: "izinVerilenOturma_mm", label: "İzin Verilen Oturma (mm)", type: "number", min: 1, step: 5 },
      ]}
      defaults={{
        netTemelBasinci_q_kPa: 150,
        temelGenisligi_B_m: 2,
        poissonOrani: 0.3,
        zeminElastisiteModulu_Es_kPa: 20000,
        etkiKatsayisi_Is: 1.12,
        izinVerilenOturma_mm: 25,
      }}
      mainUnit="mm"
      mainValueKey="oturma_mm"
      mainDecimals={1}
      intermediateLabels={{
        poisson_carpani: "Poisson Çarpanı (1 − ν²)",
        kullanim_orani_yuzde: "İzin Verilen Oturmanın Kullanımı (%)",
      }}
    />
  );
}
