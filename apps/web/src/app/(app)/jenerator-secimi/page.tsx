"use client";

import { jeneratorSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function JeneratorSecimiPage() {
  return (
    <CalcPage
      module={jeneratorSecimi}
      standardsLabel="Fiziksel Formül"
      description="Kritik yük, güç faktörü ve motor kalkış katsayısına göre gerekli jeneratör gücünü (kVA) hesaplar."
      formula="S = (P / cosφ) × Başlama K. × Güvenlik K."
      engineeringNote="Başlama katsayısı, en büyük motorun kalkış (inrush) akımına göre belirlenmelidir; bu modülde kullanıcı girdisidir."
      fields={[
        { key: "kritikYuk_kW", label: "Kritik Yük (kW)", type: "number", min: 1, step: 1 },
        {
          key: "gucFaktoru_cosfi",
          label: "Güç Faktörü (cosφ)",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
        {
          key: "baslamaKatsayisi",
          label: "Başlama Katsayısı (örn. 1.3)",
          type: "number",
          min: 1,
          step: 0.05,
        },
        {
          key: "guvenlikKatsayisi",
          label: "Güvenlik Katsayısı (örn. 1.1)",
          type: "number",
          min: 1,
          step: 0.05,
        },
      ]}
      defaults={{
        kritikYuk_kW: 100,
        gucFaktoru_cosfi: 0.8,
        baslamaKatsayisi: 1.3,
        guvenlikKatsayisi: 1.1,
      }}
      mainUnit="kVA"
      mainValueKey="gerekliJeneratorGucu_kVA"
      intermediateLabels={{
        gorunurGuc_kVA: "Görünür Güç (kVA)",
        baslangicGucu_kVA: "Başlangıç Gücü (kVA)",
      }}
    />
  );
}
