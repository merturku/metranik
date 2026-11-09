"use client";

import { evCamasirMakinesiYillikMaliyet } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvCamasirMakinesiYillikMaliyetPage() {
  return (
    <CalcPage
      module={evCamasirMakinesiYillikMaliyet}
      standardsLabel="Standart atfı yok"
      description="Haftalık kullanım, döngü başına enerji ve su tüketiminden yıllık işletme maliyetini hesaplar."
      formula="Yıllık döngü = haftalık × 52;  Maliyet = kWh·fiyat + m³·su bedeli + deterjan"
      engineeringNote="Enerji etiketi değerleri standart program içindir; gerçek kullanımda sıcaklık ve doluluk farklıdır. Sıcak su bağlantılı makinede ısıtma enerjisini ayrıca hesaplayın (Sıcak Su Birim Maliyeti)."
      fields={[
        { key: "haftalikDongu", label: "Haftalık Döngü Sayısı", type: "number", step: 1, min: 0 },
        { key: "donguBasinaEnerji_kWh", label: "Döngü Başına Enerji (kWh)", type: "number", step: 0.05, min: 0 },
        { key: "donguBasinaSu_L", label: "Döngü Başına Su (L)", type: "number", step: 1, min: 0 },
        { key: "donguBasinaDeterjan_TL", label: "Döngü Başına Deterjan (₺)", type: "number", step: 0.5, min: 0 },
        { key: "elektrikFiyati_TLkWh", label: "Elektrik Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
        { key: "suFiyati_TLm3", label: "Su + Atık Su (₺/m³)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ haftalikDongu: 4, donguBasinaEnerji_kWh: 0.8, donguBasinaSu_L: 50, donguBasinaDeterjan_TL: 0, elektrikFiyati_TLkWh: 3, suFiyati_TLm3: 50 }}
      mainUnit="₺/yıl"
      mainValueKey="yillikMaliyet_TL"
      mainDecimals={0}
      intermediateLabels={{
        yillik_dongu: "Yıllık Döngü",
        yillik_enerji_kWh: "Yıllık Enerji (kWh)",
        yillik_su_m3: "Yıllık Su (m³)",
        elektrik_maliyeti_TL: "Elektrik (₺)",
        su_maliyeti_TL: "Su (₺)",
        deterjan_maliyeti_TL: "Deterjan (₺)",
        dongu_basina_maliyet_TL: "Döngü Başına Maliyet (₺)",
      }}
    />
  );
}
