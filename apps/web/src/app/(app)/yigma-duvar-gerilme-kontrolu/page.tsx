"use client";

import { yigmaDuvarGerilmeKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YigmaDuvarGerilmeKontroluPage() {
  return (
    <CalcPage
      module={yigmaDuvarGerilmeKontrolu}
      standardsLabel="Fiziksel Formül"
      description="Eksenel yüke ve duvar kesit alanına göre yığma duvarda oluşan basınç gerilmesini hesaplar ve izin verilen değerle karşılaştırır."
      formula="σ = N / A"
      engineeringNote="İzin verilen basınç gerilmesi duvar malzemesine (tuğla, briket, taş) ve harç sınıfına göre değişir; TS EN 1996 (Eurocode 6) veya yerel yönetmelikten alınmalıdır."
      fields={[
        { key: "eksenelYuk_N_kN", label: "Eksenel Yük N (kN)", type: "number", min: 1, step: 10 },
        {
          key: "duvarKesitAlani_A_m2",
          label: "Duvar Kesit Alanı A (m²)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "izinVerilenBasincGerilmesi_MPa",
          label: "İzin Verilen Basınç Gerilmesi (MPa)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        eksenelYuk_N_kN: 200,
        duvarKesitAlani_A_m2: 0.6,
        izinVerilenBasincGerilmesi_MPa: 2,
      }}
      mainUnit="MPa"
      mainValueKey="olusanGerilme_MPa"
      intermediateLabels={{
        izinVerilenBasincGerilmesi_MPa: "İzin Verilen Gerilme (MPa)",
        marj_MPa: "Marj (MPa)",
      }}
    />
  );
}
