"use client";

import { trafoOdasiHavalandirmaDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TrafoOdasiHavalandirmaDebisiPage() {
  return (
    <CalcPage
      module={trafoOdasiHavalandirmaDebisi}
      standardsLabel="Fiziksel Formül"
      description="Trafonun kayıp ısısını taşımak için gerekli havalandırma debisini, izin verilen sıcaklık artışına göre hesaplar."
      formula="Q = Pkayıp / (cp × ρ × ΔT)"
      engineeringNote="Trafo kayıp ısısı (yük+demir kayıpları) üretici etiketinden alınır; izin verilen sıcaklık artışı oda için belirlenen tasarım kriteridir (tipik 10-15°C)."
      fields={[
        {
          key: "trafoKayipIsisi_Pkayip_kW",
          label: "Trafo Kayıp Isısı (kW)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
        {
          key: "izinVerilenSicaklikArtisi_dT_C",
          label: "İzin Verilen Sıcaklık Artışı ΔT (°C)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ trafoKayipIsisi_Pkayip_kW: 10, izinVerilenSicaklikArtisi_dT_C: 10 }}
      mainUnit="m³/h"
      mainValueKey="havaDebisi_m3h"
      intermediateLabels={{
        havaOzgulIsi_kJ_kgK: "Hava Özgül Isısı (kJ/kgK)",
        havaYogunlugu_kg_m3: "Hava Yoğunluğu (kg/m³)",
      }}
    />
  );
}
