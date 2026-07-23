"use client";

import { kanalBoyutlandirmaSmacna } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalBoyutlandirmaPage() {
  return (
    <CalcPage
      module={kanalBoyutlandirmaSmacna}
      standardsLabel="SMACNA"
      description="Debi ve hedef hıza göre dairesel kanal çapını hesaplar (süreklilik denklemi, SMACNA hız metodu). Hedef hızı SMACNA'nın önerdiği aralıktan siz seçersiniz."
      fields={[
        { key: "debi", label: "Debi (m³/s)", type: "number", min: 0.01, step: 0.01 },
        { key: "hiz", label: "Hedef Hız (m/s)", type: "number", min: 0.1, step: 0.1 },
      ]}
      defaults={{ debi: 0.5, hiz: 5 }}
      mainUnit="mm"
      mainValueKey="capD_mm"
      mainDecimals={0}
      intermediateLabels={{
        kesitAlani_m2: "Kesit Alanı (m²)",
        hedefHiz_m_s: "Hedef Hız (m/s)",
      }}
    />
  );
}
