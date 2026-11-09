"use client";

import { gucFaktoruIyilestirmeKayipAzalmasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GucFaktoruIyilestirmeKayipAzalmasiPage() {
  return (
    <CalcPage
      module={gucFaktoruIyilestirmeKayipAzalmasi}
      standardsLabel="I²R ilişkisi"
      description="Güç faktörü iyileştirilince hat akımının ve Joule kaybının yüzde ve mutlak azalmasını hesaplar."
      formula="I₂/I₁ = cosφ₁/cosφ₂;  kayıp oranı = (cosφ₁/cosφ₂)²"
      engineeringNote="Aynı aktif güçte akım 1/cosφ ile, kayıp 1/cos²φ ile değişir. Gerekli kondansatör gücü Kompanzasyon modülüyle bulunur; bu modül yalnız hat/trafo bakır kaybı kazancını gösterir. Mevcut hat kaybı Kablo Joule Kaybı modülüyle hesaplanabilir."
      fields={[
        { key: "mevcutCosPhi", label: "Mevcut cosφ", type: "number", step: 0.01, min: 0.1 },
        { key: "hedefCosPhi", label: "Hedef cosφ", type: "number", step: 0.01, min: 0.1 },
        { key: "mevcutHatKaybi_W", label: "Mevcut Hat Kaybı (W)", type: "number", step: 10, min: 0 },
      ]}
      defaults={{ mevcutCosPhi: 0.8, hedefCosPhi: 0.95, mevcutHatKaybi_W: 1000 }}
      mainUnit="%"
      mainValueKey="kayipAzalmasi_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        akim_orani_I2_I1: "Akım Oranı I₂/I₁",
        akim_azalmasi_yuzde: "Akım Azalması (%)",
        yeni_hat_kaybi_W: "Yeni Hat Kaybı (W)",
        kayip_azalmasi_W: "Kayıp Azalması (W)",
      }}
    />
  );
}
