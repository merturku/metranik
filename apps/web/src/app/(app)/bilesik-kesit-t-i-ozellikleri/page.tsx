"use client";

import { bilesikKesitTIOzellikleri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BilesikKesitTIOzellikleriPage() {
  return (
    <CalcPage
      module={bilesikKesitTIOzellikleri}
      standardsLabel="Klasik kesit özellikleri"
      description="T ve çift simetrik I kesitinin alanını, ağırlık merkezini, atalet momentini ve mukavemet momentlerini hesaplar."
      formula="I (çift simetrik): I = bf·h³/12 − (bf − tw)·hw³/12;  T: I = Σ(Iᵢ + Aᵢ·dᵢ²)"
      engineeringNote="Birimler mm; I mm⁴, W mm³. Hadde profillerinde üretici tablo değerleri esastır; bu modül kaynaklı veya ölçüleri bilinen kesitler içindir. Sonuç sehim, burkulma ve eğilme gerilmesi modüllerine girdi olur. Birleşim bölgesinde çakışma ve kaynak dikişi kesiti dikkate alınmaz."
      fields={[
        { key: "sekil", label: "Kesit", type: "select", options: [{ value: "I", label: "I (çift simetrik)" }, { value: "T", label: "T" }] },
        { key: "baslikGenisligi_bf_mm", label: "Başlık Genişliği bf (mm)", type: "number", step: 5, min: 1 },
        { key: "baslikKalinligi_tf_mm", label: "Başlık Kalınlığı tf (mm)", type: "number", step: 1, min: 0.1 },
        { key: "govdeYuksekligi_hw_mm", label: "Gövde Yüksekliği hw (mm)", type: "number", step: 5, min: 1 },
        { key: "govdeKalinligi_tw_mm", label: "Gövde Kalınlığı tw (mm)", type: "number", step: 1, min: 0.1 },
      ]}
      defaults={{ sekil: "I", baslikGenisligi_bf_mm: 100, baslikKalinligi_tf_mm: 10, govdeYuksekligi_hw_mm: 180, govdeKalinligi_tw_mm: 6 }}
      mainUnit="mm⁴"
      mainValueKey="atalet_mm4"
      mainDecimals={0}
      intermediateLabels={{
        toplam_yukseklik_mm: "Toplam Yükseklik (mm)",
        alan_mm2: "Alan (mm²)",
        agirlik_merkezi_ust_mm: "Ağırlık Merkezi – Üstten (mm)",
        mukavemet_momenti_W_mm3: "Mukavemet Momenti W (mm³)",
        mukavemet_momenti_ust_W_mm3: "W – Üst Lif (mm³)",
        mukavemet_momenti_alt_W_mm3: "W – Alt Lif (mm³)",
        atalet_yaricapi_mm: "Atalet Yarıçapı i (mm)",
      }}
    />
  );
}
