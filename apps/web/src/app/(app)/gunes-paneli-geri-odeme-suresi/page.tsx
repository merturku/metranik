"use client";

import { gunesPaneliGeriOdemeSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GunesPaneliGeriOdemeSuresiPage() {
  return (
    <CalcPage
      module={gunesPaneliGeriOdemeSuresi}
      standardsLabel="Basit Geri Ödeme Analizi"
      description="Toplam yatırım maliyetine ve yıllık elektrik tasarrufuna göre güneş paneli sisteminin kendini kaç yılda ödeyeceğini hesaplar."
      formula="Geri Ödeme Süresi = Yatırım Maliyeti / Yıllık Tasarruf"
      engineeringNote="Bu basit hesap enerji fiyat artışını, panel verim kaybını (yıllık ~%0.5) ve bakım maliyetini içermez; daha kesin analiz için net bugünkü değer (NPV) yöntemi kullanılmalıdır."
      fields={[
        {
          key: "yatirimMaliyeti_TL",
          label: "Toplam Yatırım Maliyeti (TL)",
          type: "number",
          min: 1000,
          step: 1000,
        },
        {
          key: "yillikTasarruf_TL",
          label: "Yıllık Elektrik Tasarrufu (TL)",
          type: "number",
          min: 100,
          step: 500,
        },
      ]}
      defaults={{ yatirimMaliyeti_TL: 180000, yillikTasarruf_TL: 36000 }}
      mainUnit="yıl"
      mainValueKey="geriOdemeSuresi_yil"
      intermediateLabels={{ yillikTasarruf_TL: "Yıllık Tasarruf (TL)" }}
    />
  );
}
