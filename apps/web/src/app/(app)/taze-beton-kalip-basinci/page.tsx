"use client";

import { tazeBetonKalipBasinci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TazeBetonKalipBasinciPage() {
  return (
    <CalcPage
      module={tazeBetonKalipBasinci}
      standardsLabel="ACI 347 / TS EN 12812"
      description="Dökme hızı ve beton sıcaklığına göre kalıba etkiyen tasarım basıncını (hidrostatik ve ampirik formülün küçüğü) hesaplar."
      formula="Pmax = min(ρH, Cw·Cc·(7.2 + 785R/(T+17.8)))"
      engineeringNote="Cw katsayısı beton birim ağırlığı normalden farklıysa (~2400 kg/m³ dışı), Cc katsayısı ise priz geciktirici gibi katkılar kullanıldığında 1'den büyük alınır."
      fields={[
        {
          key: "betonBirimAgirlik_kNm3",
          label: "Beton Birim Ağırlığı ρ (kN/m³)",
          type: "number",
          min: 1,
          step: 0.5,
        },
        {
          key: "kalipYuksekligi_m",
          label: "Kalıp/Döküm Yüksekliği H (m)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "birimAgirlikKatsayisi_Cw",
          label: "Birim Ağırlık Katsayısı Cw",
          type: "number",
          min: 0.5,
          step: 0.05,
        },
        {
          key: "katkiKatsayisi_Cc",
          label: "Katkı Katsayısı Cc",
          type: "number",
          min: 0.5,
          step: 0.05,
        },
        {
          key: "dokmeHizi_R_mh",
          label: "Dökme Hızı R (m/h)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "betonSicakligi_T_C",
          label: "Beton Sıcaklığı T (°C)",
          type: "number",
          min: -10,
          step: 1,
        },
      ]}
      defaults={{
        betonBirimAgirlik_kNm3: 24,
        kalipYuksekligi_m: 3,
        birimAgirlikKatsayisi_Cw: 1.0,
        katkiKatsayisi_Cc: 1.0,
        dokmeHizi_R_mh: 2,
        betonSicakligi_T_C: 20,
      }}
      mainUnit="kPa"
      mainValueKey="tasarimBasinci_kPa"
      intermediateLabels={{
        hidrostatikBasinc_kPa: "Hidrostatik Basınç (kPa)",
        aciFormulBasinci_kPa: "ACI Formül Basıncı (kPa)",
      }}
    />
  );
}
