"use client";
import { CalcPage } from "@/components/calc-page";
import { sogutmaMenteşeBasinci } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={sogutmaMenteşeBasinci}
      fields={[
        { name: "sogutma_kapasitesi_kW", label: "Soğutma Kapasitesi (kW)" },
        { name: "debi_Lmin", label: "Debi (L/min)" },
      ]}
      defaults={{
        sogutma_kapasitesi_kW: 10,
        debi_Lmin: 100,
      }}
      description="EN 60073: Soğutma menteşe basıncı kontrolü"
      formula="P = (Q × ρ × g × h) / (η × 60)"
      engineeringNote="Menteşe seçiminde sistem basıncı kritik parametredir. Maksimum basınç aşılmaması önemlidir."
    />
  );
}
