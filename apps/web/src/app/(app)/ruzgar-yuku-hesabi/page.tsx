"use client";

import { ruzgarYukuHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function RuzgarYukuHesabiPage() {
  return (
    <CalcPage
      module={ruzgarYukuHesabi}
      standardsLabel="TS EN 1991-1-4"
      description="Bina yüzeyine etkiyen rüzgar basıncını temel rüzgar hızı, maruziyet ve basınç katsayılarına göre hesaplar."
      formula="we = Ce × qb × Cpe (qb = 0.5 × ρ × vb²)"
      engineeringNote="Maruziyet (Ce) ve basınç (Cpe) katsayıları arazi/bina geometrisine göre TS EN 1991-1-4 tablolarından alınır; bu modülde gömülü değildir."
      fields={[
        {
          key: "temelRuzgarHizi_ms",
          label: "Temel Rüzgar Hızı vb (m/s)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "maruziyetKatsayisi_ce",
          label: "Maruziyet Katsayısı Ce (örn. 2.5)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "basincKatsayisi_cpe",
          label: "Basınç Katsayısı Cpe (örn. 0.8)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{ temelRuzgarHizi_ms: 28, maruziyetKatsayisi_ce: 2.5, basincKatsayisi_cpe: 0.8 }}
      mainUnit="kN/m²"
      mainValueKey="ruzgarBasinci_kNm2"
      intermediateLabels={{
        temelHizBasinci_qb_Pa: "Temel Hız Basıncı (qb, Pa)",
        tepeHizBasinci_qp_Pa: "Tepe Hız Basıncı (qp, Pa)",
        havaYogunlugu_kg_m3: "Hava Yoğunluğu (kg/m³)",
      }}
    />
  );
}
