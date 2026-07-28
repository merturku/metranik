"use client";

import { havaAyiriciBoyutlandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavaAyiriciBoyutlandirmaPage() {
  return (
    <CalcPage
      module={havaAyiriciBoyutlandirma}
      standardsLabel="Fiziksel Formül"
      description="Hidronik devrede mikrokabarcıkların yükselerek tahliye edilebilmesi için akış hızını sınırlayan bir üst değere göre hava ayırıcı çapını hesaplar."
      formula="A = Q / v, D = √(4A/π)"
      engineeringNote="Maksimum hız için üretici pratiği (Bell & Gossett / Spirotech) ~0.9 m/s önerir; bu hızın üzerinde mikrokabarcıklar akışla sürüklenip ayrılamaz. Nihai seçimde üretici kataloğu teyit edilmelidir."
      fields={[
        {
          key: "debit_Q_m3h",
          label: "Debi Q (m³/h)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "maksimumHiz_v_ms",
          label: "Maksimum Hız v (m/s)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{ debit_Q_m3h: 20, maksimumHiz_v_ms: 0.9 }}
      mainUnit="mm"
      mainValueKey="gerekliCap_mm"
      intermediateLabels={{
        debit_m3s: "Debi (m³/s)",
        kesitAlani_m2: "Kesit Alanı (m²)",
      }}
    />
  );
}
