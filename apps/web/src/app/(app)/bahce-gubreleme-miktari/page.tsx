"use client";

import { bahceGubrelemeMiktari } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BahceGubrelemeMiktariPage() {
  return (
    <CalcPage
      module={bahceGubrelemeMiktari}
      standardsLabel="Pratik Formül"
      description="Bahçe/çim alanı ve birim uygulama oranına göre gerekli toplam gübre miktarını hesaplar."
      formula="Gerekli Gübre = Alan × Uygulama Oranı"
      engineeringNote="Uygulama oranı gübre türüne göre değişir; çim gübresinde tipik değer ~0.03-0.06 kg/m² (30-60 g/m²) aralığındadır, ürün ambalajındaki öneri esas alınmalıdır."
      fields={[
        {
          key: "alan_m2",
          label: "Alan (m²)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "uygulamaOrani_kg_m2",
          label: "Uygulama Oranı (kg/m²)",
          type: "number",
          min: 0.001,
          step: 0.005,
        },
      ]}
      defaults={{ alan_m2: 200, uygulamaOrani_kg_m2: 0.05 }}
      mainUnit="kg"
      mainValueKey="gerekliGubre_kg"
      intermediateLabels={{ uygulamaOrani_g_m2: "Uygulama Oranı (g/m²)" }}
    />
  );
}
