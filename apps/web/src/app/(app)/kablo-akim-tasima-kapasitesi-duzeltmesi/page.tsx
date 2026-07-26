"use client";

import { kabloAkimTasimaKapasitesiDuzeltmesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloAkimTasimaKapasitesiDuzeltmesiPage() {
  return (
    <CalcPage
      module={kabloAkimTasimaKapasitesiDuzeltmesi}
      standardsLabel="IEC 60364-5-52"
      description="Kablonun temel akım taşıma kapasitesini ortam sıcaklığı ve gruplama düzeltme katsayılarıyla düzeltir."
      formula="Iz,düzeltilmiş = Iz × kT × kG"
      engineeringNote="kT ve kG katsayıları IEC 60364-5-52 tablolarından ortam sıcaklığına ve birlikte döşenen kablo sayısına göre alınır."
      fields={[
        {
          key: "temelAkimTasimaKapasitesi_Iz_A",
          label: "Temel Akım Taşıma Kapasitesi Iz (A)",
          type: "number",
          min: 0.1,
          step: 1,
        },
        {
          key: "sicaklikDuzeltmeKatsayisi_kT",
          label: "Sıcaklık Düzeltme Katsayısı kT",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
        {
          key: "gruplamaDuzeltmeKatsayisi_kG",
          label: "Gruplama Düzeltme Katsayısı kG",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
      ]}
      defaults={{
        temelAkimTasimaKapasitesi_Iz_A: 80,
        sicaklikDuzeltmeKatsayisi_kT: 0.94,
        gruplamaDuzeltmeKatsayisi_kG: 0.8,
      }}
      mainUnit="A"
      mainValueKey="duzeltilmisAkimTasimaKapasitesi_A"
      intermediateLabels={{
        sicaklikDuzeltmeKatsayisi_kT: "Sıcaklık Düzeltme Katsayısı",
        gruplamaDuzeltmeKatsayisi_kG: "Gruplama Düzeltme Katsayısı",
      }}
    />
  );
}
