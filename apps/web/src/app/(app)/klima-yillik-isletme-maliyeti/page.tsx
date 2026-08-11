"use client";

import { klimaYillikIsletmeMaliyeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KlimaYillikIsletmeMaliyetiPage() {
  return (
    <CalcPage
      module={klimaYillikIsletmeMaliyeti}
      standardsLabel="Fiziksel Formül"
      description="Klima kapasitesini COP/EER ile çekilen elektrik gücüne çevirir, günlük çalışma süresi ve yıllık gün sayısıyla yıllık işletme maliyetini hesaplar."
      formula="Elektrik Gücü = Kapasite / COP, Yıllık Maliyet = Elektrik Gücü × Saat × Gün × Birim Fiyat"
      engineeringNote="COP (Performans Katsayısı) yerine üretici etiketindeki EER (soğutma) veya COP (ısıtma) değeri kullanılabilir; split klimalarda tipik COP/EER 3.0-4.0 aralığındadır."
      fields={[
        {
          key: "kapasite_kW",
          label: "Kapasite (kW)",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
        {
          key: "cop",
          label: "COP / EER",
          type: "number",
          min: 1,
          step: 0.1,
        },
        {
          key: "gunlukCalismaSuresi_saat",
          label: "Günlük Çalışma Süresi (saat)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "yillikCalismaGunSayisi",
          label: "Yıllık Çalışma Gün Sayısı",
          type: "number",
          min: 1,
          step: 1,
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
        kapasite_kW: 3.2,
        cop: 3.2,
        gunlukCalismaSuresi_saat: 6,
        yillikCalismaGunSayisi: 100,
        birimFiyat_TLkWh: 3,
      }}
      mainUnit="TL"
      mainValueKey="yillikMaliyet_TL"
      intermediateLabels={{
        elektrikGucu_kW: "Elektrik Gücü (kW)",
        yillikTuketim_kWh: "Yıllık Tüketim (kWh)",
      }}
    />
  );
}
