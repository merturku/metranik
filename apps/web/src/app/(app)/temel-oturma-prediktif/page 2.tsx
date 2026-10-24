"use client";
import { CalcPage } from "@/components/calc-page";
import { temelOturmaPrediktif } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={temelOturmaPrediktif}
      fields={[
        { name: "agirlik_kN", label: "Yükü (kN)" },
        { name: "temel_alani_m2", label: "Temel Alanı (m²)" },
        { name: "taşıma_gucu_kPa", label: "Taşıma Gücü (kPa)" },
      ]}
      defaults={{
        agirlik_kN: 1000,
        temel_alani_m2: 10,
        taşıma_gucu_kPa: 200,
      }}
      description="TS EN 1997-1: Temel oturması tahmini (Terzaghi)"
      formula="S = (σ/qu) × 100 × √t"
      engineeringNote="Konsolidasyon süresi zemin türüne bağlıdır. Ön boyutlandırma amaçlı kullanılır."
    />
  );
}
