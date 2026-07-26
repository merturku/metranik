"use client";

import { boyaMiktariHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoyaMiktariHesabiPage() {
  return (
    <CalcPage
      module={boyaMiktariHesabi}
      standardsLabel="Sektör Kuralı"
      description="Boyanacak alana, kat sayısına ve boya verimine göre gerekli boya miktarını hesaplar."
      formula="Miktar = Alan × Kat Sayısı / Verim"
      engineeringNote="Boya verimi (m²/L) ürün etiketinde belirtilir; yüzey pürüzlülüğü ve astar durumu gerçek verimi düşürebilir."
      fields={[
        { key: "alan_m2", label: "Alan (m²)", type: "number", min: 1, step: 1 },
        { key: "katSayisi", label: "Kat Sayısı", type: "number", min: 1, step: 1 },
        {
          key: "boyaVerimi_m2L",
          label: "Boya Verimi (m²/L)",
          type: "number",
          min: 1,
          step: 0.5,
        },
      ]}
      defaults={{ alan_m2: 50, katSayisi: 2, boyaVerimi_m2L: 10 }}
      mainUnit="L"
      mainValueKey="gerekliBoya_L"
      intermediateLabels={{ katSayisi: "Kat Sayısı" }}
    />
  );
}
