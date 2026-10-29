"use client";

import { pompaVfdEnerjiTasarrufu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaVfdEnerjiTasarrufuPage() {
  return (
    <CalcPage
      module={pompaVfdEnerjiTasarrufu}
      standardsLabel="Afinite yasaları (standart atfı yok)"
      description="Pompa veya fan devri frekans konvertörüyle düşürüldüğünde güç düşüşünü ve yıllık enerji ile maliyet tasarrufunu afinite yasalarıyla hesaplar."
      formula="Q ∝ n,   H ∝ n²,   P ∝ n³  →  P₂ = P₁·(n₂/n₁)³,   Tasarruf = (P₁ − P₂)·t"
      engineeringNote="Küp bağıntısı, sistem eğrisinin orijinden geçtiğini (statik yük yok, tamamen sürtünmeli devre) varsayar. Statik yük varsa gerçek güç bundan yüksektir, tasarruf azalır. Konvertör ve motorun kısmi yük verimi ile harmonik kayıpları hesaba katılmaz. Sabit devirde çalışan sistemde kısma vanasıyla debi ayarı yapılıyorsa tasarruf potansiyeli daha büyüktür. Birim fiyat girdisi para birimi cinsinden kullanıcıya aittir."
      fields={[
        { key: "nominalGuc_kW", label: "Nominal Mil Gücü (kW)", type: "number", min: 0.1, step: 0.5 },
        { key: "devirOrani", label: "Devir Oranı n₂/n₁ (0–1)", type: "number", min: 0.1, step: 0.05 },
        { key: "yillikCalismaSaati_h", label: "Yıllık Çalışma Süresi (h)", type: "number", min: 1, step: 100 },
        { key: "birimFiyat", label: "Elektrik Birim Fiyatı (₺/kWh)", type: "number", min: 0, step: 0.1 },
      ]}
      defaults={{ nominalGuc_kW: 15, devirOrani: 0.8, yillikCalismaSaati_h: 4000, birimFiyat: 5 }}
      mainUnit="kWh/yıl (tasarruf)"
      mainValueKey="yillikTasarruf_kWh"
      mainDecimals={0}
      intermediateLabels={{
        debi_orani_Q2_Q1: "Debi Oranı Q₂/Q₁",
        basma_yuksekligi_orani_H2_H1: "Basma Yüksekliği Oranı H₂/H₁",
        guc_orani_P2_P1: "Güç Oranı P₂/P₁",
        yeni_guc_kW: "Yeni Güç P₂ (kW)",
        tasarruf_yuzdesi: "Güç Tasarrufu (%)",
        yillik_maliyet_tasarrufu: "Yıllık Maliyet Tasarrufu",
      }}
    />
  );
}
