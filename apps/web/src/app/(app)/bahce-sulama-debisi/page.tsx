"use client";

import { bahceSulamaDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BahceSulamaDebisiPage() {
  return (
    <CalcPage
      module={bahceSulamaDebisi}
      standardsLabel="Fiziksel Formül"
      description="Sulanacak alan ve hedeflenen uygulama oranına göre (1 mm derinlik = 1 m² başına 1 litre) gerekli sulama debisini, sistem verim kaybını da hesaba katarak bulur."
      formula="Q = (Alan × Uygulama Oranı) / Sistem Verimi"
      engineeringNote="Uygulama oranı sulama yöntemine göre değişir (yağmurlama ~10-15 mm/saat, damlama çok daha düşük); sistem verimi damlamada ~0.9, yağmurlamada ~0.75 alınabilir."
      fields={[
        {
          key: "sulanacakAlan_m2",
          label: "Sulanacak Alan (m²)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "uygulamaOrani_mm_saat",
          label: "Uygulama Oranı (mm/saat)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "sistemVerimi",
          label: "Sistem Verimi (örn. 0.8)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
      ]}
      defaults={{ sulanacakAlan_m2: 50, uygulamaOrani_mm_saat: 15, sistemVerimi: 0.8 }}
      mainUnit="L/saat"
      mainValueKey="gerekliDebi_L_saat"
      intermediateLabels={{ gerekliDebi_L_dk: "Gerekli Debi (L/dk)" }}
    />
  );
}
