"use client";

import { isiPompasiYillikIsletmeMaliyeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiPompasiYillikIsletmeMaliyetiPage() {
  return (
    <CalcPage
      module={isiPompasiYillikIsletmeMaliyeti}
      standardsLabel="Fiziksel Formül"
      description="Isıtma yakıt tüketimi & maliyeti modülünün elektrikli ısı pompası eşdeğeri: yıllık ısı ihtiyacını mevsimsel performans katsayısına (SPF) bölerek elektrik tüketimini ve maliyetini hesaplar."
      formula="Yıllık Tüketim = Yıllık Isı İhtiyacı / SPF, Yıllık Maliyet = Yıllık Tüketim × Birim Fiyat"
      engineeringNote="SPF (Mevsimsel Performans Katsayısı), ısı pompası mevsimsel performans katsayısı modülüyle veya üretici etiketinden alınabilir; hava kaynaklı ısı pompalarında tipik SPF 2.5-4.0 aralığındadır."
      fields={[
        {
          key: "yillikIsiIhtiyaci_kWh",
          label: "Yıllık Isı İhtiyacı (kWh)",
          type: "number",
          min: 100,
          step: 100,
        },
        {
          key: "spf",
          label: "SPF (Mevsimsel Performans Katsayısı)",
          type: "number",
          min: 1,
          step: 0.1,
        },
        {
          key: "birimFiyat_TLkWh",
          label: "Birim Fiyat (TL/kWh)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        yillikIsiIhtiyaci_kWh: 9000,
        spf: 3.0,
        birimFiyat_TLkWh: 3,
      }}
      mainUnit="TL"
      mainValueKey="yillikMaliyet_TL"
      intermediateLabels={{ yillikTuketim_kWh: "Yıllık Tüketim (kWh)" }}
    />
  );
}
