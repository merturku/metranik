"use client";

import { buharKazaniBesiSuyuDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BuharKazaniBesiSuyuDebisiPage() {
  return (
    <CalcPage
      module={buharKazaniBesiSuyuDebisi}
      standardsLabel="Kütle Dengesi"
      description="Üretilen buhar debisi ve blöf (blowdown) oranından, kazana beslenmesi gereken besi suyu debisini kütle dengesiyle hesaplar."
      formula="ṁ_besi = ṁ_buhar / (1 - b)"
      engineeringNote="Blöf, kazan suyundaki çözünmüş katı derişimini sınırlamak için besi suyunun bir oranı (b) olarak tanımlanır (tipik %2-10). Besi suyu = üretilen buhar + blöf miktarı kütle dengesinden b oranı çekilerek türetilir."
      fields={[
        {
          key: "buharDebisi_kgh",
          label: "Buhar Debisi (kg/h)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "blofOrani_b",
          label: "Blöf Oranı (0-0.5)",
          type: "number",
          min: 0,
          step: 0.01,
        },
      ]}
      defaults={{
        buharDebisi_kgh: 1000,
        blofOrani_b: 0.05,
      }}
      mainUnit="kg/h"
      mainValueKey="besiSuyuDebisi_kgh"
      mainDecimals={1}
      intermediateLabels={{
        blofMiktari_kgh: "Blöf Miktarı (kg/h)",
      }}
    />
  );
}
