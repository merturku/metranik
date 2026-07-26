"use client";

import { klimaGizliIsiYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KlimaGizliIsiYukuPage() {
  return (
    <CalcPage
      module={klimaGizliIsiYuku}
      standardsLabel="Fiziksel Formül"
      description="Hava debisine ve nem farkına göre klima sisteminin gizli (nem alma) ısı yükünü hesaplar."
      formula="Qgizli = ρ × V × hfg × ΔW"
      engineeringNote="Bu hesap toplam soğutma yükünün nem alma bileşenidir; duyulur ısı yükü (sıcaklık düşürme) ayrıca hesaplanmalıdır."
      fields={[
        { key: "havaDebisi_Ls", label: "Hava Debisi (L/s)", type: "number", min: 1, step: 10 },
        {
          key: "nemFarki_dW_gkg",
          label: "Nem Farkı ΔW (g/kg)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
      ]}
      defaults={{ havaDebisi_Ls: 500, nemFarki_dW_gkg: 5 }}
      mainUnit="kW"
      mainValueKey="gizliIsiYuku_kW"
      intermediateLabels={{ havaYogunlugu_kg_m3: "Hava Yoğunluğu (kg/m³)" }}
    />
  );
}
