"use client";

import { pompalamaSpesifikEnerjisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompalamaSpesifikEnerjisiPage() {
  return (
    <CalcPage
      module={pompalamaSpesifikEnerjisi}
      standardsLabel="Hidrolik güç bağıntısı P = ρ·g·Q·H/η"
      description="Pompalanan 1 m³ suyun enerji tüketimini (kWh/m³), hidrolik ve kayıp bileşenlerini ve yıllık enerji maliyetini hesaplar."
      formula="E = ρ·g·H/(3,6·10⁶·η)   [kWh/m³]"
      engineeringNote="η toplam verimdir (pompa × motor × sürücü; tipik 0,5–0,7). H toplam manometrik yüksekliktir (statik + sürtünme kayıpları). Yıllık hacim, çalışma saatlerine göre ortalama debiden bulunur; değişken debide devir kontrolü avantajı için Pompa/Fan Devir Düşürme Enerji Tasarrufu modülüne bakın. Anlık güç için Pompa Hidrolik Gücü modülünü kullanın."
      fields={[
        { key: "basma_mSS", label: "Toplam Basma Yüksekliği H (mSS)", type: "number", min: 0.1, step: 1 },
        { key: "toplamVerim", label: "Toplam Verim η (0–1)", type: "number", min: 0.05, step: 0.05 },
        { key: "yillikHacim_m3", label: "Yıllık Pompalanan Hacim (m³)", type: "number", min: 0, step: 1000 },
        { key: "elektrikFiyati_TLkWh", label: "Elektrik Fiyatı (₺/kWh)", type: "number", min: 0, step: 0.1 },
      ]}
      defaults={{ basma_mSS: 30, toplamVerim: 0.6, yillikHacim_m3: 100000, elektrikFiyati_TLkWh: 3 }}
      mainUnit="kWh/m³"
      mainValueKey="spesifikEnerji_kWhm3"
      mainDecimals={3}
      intermediateLabels={{
        hidrolik_enerji_kWhm3: "Hidrolik Enerji (kWh/m³)",
        kayip_enerji_kWhm3: "Verim Kayıpları (kWh/m³)",
        yillik_enerji_kWh: "Yıllık Enerji (kWh)",
        yillik_maliyet_TL: "Yıllık Maliyet (₺)",
      }}
    />
  );
}
