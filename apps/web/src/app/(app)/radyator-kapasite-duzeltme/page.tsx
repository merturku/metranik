"use client";

import { radyatorKapasiteDuzeltme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function RadyatorKapasiteDuzeltmePage() {
  return (
    <CalcPage
      module={radyatorKapasiteDuzeltme}
      standardsLabel="EN 442"
      description="Radyatörün nominal (katalog) kapasitesini, gerçek işletme sıcaklık farkına göre üstel yasayla düzeltir."
      formula="Qgerçek = Qnominal × (ΔTgerçek/ΔTnominal)^1.3"
      engineeringNote="Nominal test sıcaklık farkı EN 442'de genelde 50°C olarak tanımlanır (örn. 75/65/20°C rejimi); düşük sıcaklık sistemlerinde (örn. 55/45/20°C) gerçek kapasite belirgin şekilde düşer."
      fields={[
        {
          key: "nominalKapasite_Q_W",
          label: "Nominal Kapasite (W)",
          type: "number",
          min: 1,
          step: 50,
        },
        {
          key: "nominalSicaklikFarki_dT_C",
          label: "Nominal Sıcaklık Farkı ΔT (°C)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "gercekSicaklikFarki_dT_C",
          label: "Gerçek Sıcaklık Farkı ΔT (°C)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        nominalKapasite_Q_W: 1000,
        nominalSicaklikFarki_dT_C: 50,
        gercekSicaklikFarki_dT_C: 40,
      }}
      mainUnit="W"
      mainValueKey="duzeltilmisKapasite_W"
      intermediateLabels={{
        sicaklikOrani: "Sıcaklık Oranı",
        ustelKatsayi_n: "Üstel Katsayı (n)",
      }}
    />
  );
}
