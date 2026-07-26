"use client";

import { baraIsinmaKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BaraIsinmaKaybiPage() {
  return (
    <CalcPage
      module={baraIsinmaKaybi}
      standardsLabel="Fiziksel Formül (Joule Isınması)"
      description="Akıma, birim uzunluk direncine ve bara uzunluğuna göre Joule ısınması kaynaklı güç kaybını hesaplar."
      formula="P = I² × R × L"
      engineeringNote="Birim direnç (R) bara kesitine, malzemesine (bakır/alüminyum) ve sıcaklığa göre değişir; üretici tablosundan alınmalıdır."
      fields={[
        { key: "akim_I_A", label: "Akım I (A)", type: "number", min: 1, step: 10 },
        {
          key: "birimDirenc_R_ohmm",
          label: "Birim Direnç R (Ω/m)",
          type: "number",
          min: 0.000001,
          step: 0.000001,
        },
        { key: "uzunluk_L_m", label: "Uzunluk L (m)", type: "number", min: 0.1, step: 0.5 },
      ]}
      defaults={{ akim_I_A: 800, birimDirenc_R_ohmm: 0.00003, uzunluk_L_m: 5 }}
      mainUnit="W"
      mainValueKey="isiKaybi_W"
      intermediateLabels={{ birimDirenc_R_ohmm: "Birim Direnç (Ω/m)" }}
    />
  );
}
