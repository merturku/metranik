"use client";

import { trafoGucSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TrafoGucSecimiPage() {
  return (
    <CalcPage
      module={trafoGucSecimi}
      standardsLabel="Fiziksel Formül"
      description="Toplam aktif güç ve güç faktörüne göre gerekli trafo görünür gücünü (kVA) güvenlik marjıyla hesaplar."
      formula="S = (P / cosφ) × Güvenlik Katsayısı"
      engineeringNote="Çıkan değer, standart trafo kataloğundaki bir üst kapasiteye (örn. 630 kVA) yuvarlanmalıdır."
      fields={[
        { key: "toplamAktifGuc_kW", label: "Toplam Aktif Güç (kW)", type: "number", min: 1, step: 1 },
        {
          key: "gucFaktoru_cosfi",
          label: "Güç Faktörü (cosφ)",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
        {
          key: "guvenlikKatsayisi",
          label: "Güvenlik Katsayısı (örn. 1.25)",
          type: "number",
          min: 1,
          step: 0.05,
        },
      ]}
      defaults={{ toplamAktifGuc_kW: 400, gucFaktoru_cosfi: 0.85, guvenlikKatsayisi: 1.25 }}
      mainUnit="kVA"
      mainValueKey="gerekliTrafoGucu_kVA"
      intermediateLabels={{
        gorunurGuc_kVA: "Görünür Güç (kVA)",
        guvenlikKatsayisi: "Güvenlik Katsayısı",
      }}
    />
  );
}
