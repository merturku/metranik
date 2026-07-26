"use client";

import { temelTasimaKapasitesiMeyerhof } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TemelTasimaKapasitesiMeyerhofPage() {
  return (
    <CalcPage
      module={temelTasimaKapasitesiMeyerhof}
      standardsLabel="Meyerhof / TS 500"
      description="Meyerhof taşıma gücü formülüyle zeminin nihai taşıma kapasitesini hesaplar."
      formula="qu = c·Nc + q·Nq + 0.5·γ·B·Nγ"
      engineeringNote="Nc, Nq, Nγ taşıma gücü katsayıları zemin sürtünme açısına (φ) göre standart tablolardan alınır; bu modülde gömülü değildir."
      fields={[
        { key: "kohezyon_c_kPa", label: "Kohezyon c (kPa)", type: "number", min: 0, step: 1 },
        {
          key: "ustYukGerilmesi_q_kPa",
          label: "Üst Yük Gerilmesi q (kPa)",
          type: "number",
          min: 0,
          step: 1,
        },
        {
          key: "birimHacimAgirlik_gamma_kNm3",
          label: "Birim Hacim Ağırlık γ (kN/m³)",
          type: "number",
          min: 1,
          step: 0.5,
        },
        {
          key: "temelGenisligi_B_m",
          label: "Temel Genişliği B (m)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        { key: "tasimaGucuKatsayisi_Nc", label: "Taşıma Gücü Katsayısı Nc", type: "number", min: 0, step: 0.01 },
        { key: "tasimaGucuKatsayisi_Nq", label: "Taşıma Gücü Katsayısı Nq", type: "number", min: 0, step: 0.01 },
        {
          key: "tasimaGucuKatsayisi_Ngamma",
          label: "Taşıma Gücü Katsayısı Nγ",
          type: "number",
          min: 0,
          step: 0.01,
        },
      ]}
      defaults={{
        kohezyon_c_kPa: 20,
        ustYukGerilmesi_q_kPa: 18,
        birimHacimAgirlik_gamma_kNm3: 18,
        temelGenisligi_B_m: 2,
        tasimaGucuKatsayisi_Nc: 17.69,
        tasimaGucuKatsayisi_Nq: 7.44,
        tasimaGucuKatsayisi_Ngamma: 5.39,
      }}
      mainUnit="kPa"
      mainValueKey="tasimaGucu_qu_kPa"
      intermediateLabels={{
        kohezyonTerimi_kPa: "Kohezyon Terimi (kPa)",
        derinlikTerimi_kPa: "Derinlik Terimi (kPa)",
        genislikTerimi_kPa: "Genişlik Terimi (kPa)",
      }}
    />
  );
}
