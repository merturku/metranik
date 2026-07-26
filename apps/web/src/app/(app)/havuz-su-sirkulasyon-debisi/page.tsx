"use client";

import { havuzSuSirkulasyonDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavuzSuSirkulasyonDebisiPage() {
  return (
    <CalcPage
      module={havuzSuSirkulasyonDebisi}
      standardsLabel="Fiziksel Formül"
      description="Havuz hacmine ve hedef devir süresine göre gerekli sirkülasyon pompası debisini hesaplar."
      formula="Q = V / t"
      engineeringNote="Devir süresi havuz tipine göre yönetmeliklerde belirlenir; genel yüzme havuzları için tipik 4-8 saat, çocuk havuzları için daha kısa (~1-2 saat) alınır."
      fields={[
        { key: "havuzHacmi_V_m3", label: "Havuz Hacmi V (m³)", type: "number", min: 1, step: 1 },
        {
          key: "devirSuresi_t_saat",
          label: "Devir Süresi t (saat)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
      ]}
      defaults={{ havuzHacmi_V_m3: 50, devirSuresi_t_saat: 6 }}
      mainUnit="m³/h"
      mainValueKey="gerekliDebi_m3h"
      intermediateLabels={{ devirSuresi_saat: "Devir Süresi (saat)" }}
    />
  );
}
