"use client";

import { hidroforTankiHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HidroforTankiHacmiPage() {
  return (
    <CalcPage
      module={hidroforTankiHacmi}
      standardsLabel="Boyle Yasası"
      description="Pompa devreye girme/çıkma basınçları ve çekilebilir hacimden, hidrofor (hidropnömatik) tankın toplam hacmini izotermal gaz sıkışması ilişkisiyle hesaplar."
      formula="Vt = Pmax×Vd / (Pmax-Pmin)"
      engineeringNote="Pmin×Vt = Pmax×(Vt-Vd) Boyle yasası eşitliğinden türetilir: devreye girme basıncında (Pmin) tank hacminin tamamı hava, devreden çıkma basıncında (Pmax) ise Vd kadar su alınmıştır. Basınçlar mutlak (atmosferik dahil) girilmelidir."
      fields={[
        {
          key: "cekilebilirHacim_Vd_L",
          label: "Çekilebilir Hacim Vd (L)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "devreyeGirmeBasinci_Pmin_kPaAbs",
          label: "Devreye Girme Basıncı Pmin (kPa, mutlak)",
          type: "number",
          min: 101,
          step: 10,
        },
        {
          key: "devredenCikmaBasinci_Pmax_kPaAbs",
          label: "Devreden Çıkma Basıncı Pmax (kPa, mutlak)",
          type: "number",
          min: 101,
          step: 10,
        },
      ]}
      defaults={{
        cekilebilirHacim_Vd_L: 50,
        devreyeGirmeBasinci_Pmin_kPaAbs: 250,
        devredenCikmaBasinci_Pmax_kPaAbs: 450,
      }}
      mainUnit="L"
      mainValueKey="tankHacmi_Vt_L"
      mainDecimals={1}
      intermediateLabels={{
        basincFarki_kPa: "Basınç Farkı (kPa)",
      }}
    />
  );
}
