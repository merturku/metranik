"use client";

import { gesMevsimselEgimAcisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GesMevsimselEgimAcisiPage() {
  return (
    <CalcPage
      module={gesMevsimselEgimAcisi}
      standardsLabel="Güneş geometrisi (Cooper)"
      description="Enlem ve yılın gününe göre panelin öğle vakti güneş ışınlarına dik olması için gereken eğim açısını hesaplar."
      formula="δ = 23,45°·sin[360°·(284 + N)/365];  β = |φ − δ|"
      engineeringNote="Kuzey yarımkürede panel güneye, güney yarımkürede kuzeye bakmalıdır. Sabit yıllık eğim için pratik değer enlem civarıdır (denge gününde β = φ); kışa ağırlık verilecekse β ≈ φ + 10–15°. Gölgelenme, bulut ve albedo dikkate alınmamıştır. Sıra arası mesafe için GES Panel Sıra Arası Mesafe modülünü kullanın."
      fields={[
        { key: "enlem_derece", label: "Enlem φ (° — güney negatif)", type: "number", step: 0.5, min: -66 },
        { key: "yilinGunu", label: "Yılın Günü N (1–365)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ enlem_derece: 39, yilinGunu: 172 }}
      mainUnit="°"
      mainValueKey="egimAcisi_derece"
      mainDecimals={1}
      intermediateLabels={{
        deklinasyon_derece: "Deklinasyon δ (°)",
        panel_yonu: "Panel Yönü",
        kis_gundonumu_egimi_derece: "Kış Gündönümü Eğimi (°)",
        yaz_gundonumu_egimi_derece: "Yaz Gündönümü Eğimi (°)",
        denge_gunu_egimi_derece: "Denge Günü Eğimi (°)",
      }}
    />
  );
}
