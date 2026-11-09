"use client";

import { kompresorBasincDusurmeTasarrufu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KompresorBasincDusurmeTasarrufuPage() {
  return (
    <CalcPage
      module={kompresorBasincDusurmeTasarrufu}
      standardsLabel="İzentropik sıkıştırma bağıntısı"
      description="Kompresör çıkış basıncı düşürüldüğünde güç oranını, yüzde tasarrufu ve yıllık enerji/maliyet kazancını hesaplar."
      formula="P ∝ (p₂/p₁)^((k−1)/k) − 1;  tasarruf = 1 − P_yeni/P_eski"
      engineeringNote="Yaklaşık her 1 bar düşüşte %6–7 tasarruf olur (pratik kural; burada gerçek orandan çıkar). Şebeke basıncı son kullanıcı ihtiyacını ve hat kayıplarını karşılamalıdır; kurutucu ve filtre basınç kayıpları ayrıca ele alınır. Basınç 'bar (gösterge)' girilir."
      fields={[
        { key: "mevcutBasinc_bar_g", label: "Mevcut Basınç (bar gösterge)", type: "number", step: 0.5, min: 0.5 },
        { key: "yeniBasinc_bar_g", label: "Yeni Basınç (bar gösterge)", type: "number", step: 0.5, min: 0.5 },
        { key: "mevcutGuc_kW", label: "Mevcut Kompresör Gücü (kW)", type: "number", step: 1, min: 0.1 },
        { key: "yillikSaat_h", label: "Yıllık Çalışma Saati (h)", type: "number", step: 100, min: 1 },
        { key: "birimFiyat_TLkWh", label: "Elektrik Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
        { key: "isentropikUs_k", label: "İzentropik Üs k", type: "number", step: 0.01, min: 1.2 },
      ]}
      defaults={{ mevcutBasinc_bar_g: 8, yeniBasinc_bar_g: 7, mevcutGuc_kW: 75, yillikSaat_h: 6000, birimFiyat_TLkWh: 3, isentropikUs_k: 1.4 }}
      mainUnit="%"
      mainValueKey="tasarruf_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        guc_orani: "Güç Oranı",
        yeni_guc_kW: "Yeni Güç (kW)",
        yillik_tasarruf_kWh: "Yıllık Tasarruf (kWh)",
        yillik_tasarruf_TL: "Yıllık Tasarruf (₺)",
        bar_basina_tasarruf_yuzde: "Bar Başına Tasarruf (%)",
      }}
    />
  );
}
