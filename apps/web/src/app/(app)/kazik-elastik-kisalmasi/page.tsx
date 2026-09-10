"use client";

import { kazikElastikKisalmasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KazikElastikKisalmasiPage() {
  return (
    <CalcPage
      module={kazikElastikKisalmasi}
      standardsLabel="Hooke Yasası"
      description="Eksenel yük, kazık boyu, kesit alanı ve elastisite modülünden kazığın elastik kısalmasını hesaplar."
      formula="δ = PL/(A×E)"
      engineeringNote="Kazık Taşıma Kapasitesi (Statik) ve Kazık Grubu Verimliliği modülleri kazığın taşıyabileceği yükü değerlendirir; bu modül o yük altında kazığın kendisinin ne kadar kısalacağını (toplam oturmanın bir bileşeni) hesaplar."
      fields={[
        {
          key: "eksenelYuk_P_N",
          label: "Eksenel Yük P (N)",
          type: "number",
          min: 1000,
          step: 10000,
        },
        {
          key: "kazikBoyu_L_mm",
          label: "Kazık Boyu L (mm)",
          type: "number",
          min: 1000,
          step: 500,
        },
        {
          key: "kesitAlani_A_mm2",
          label: "Kesit Alanı A (mm²)",
          type: "number",
          min: 1000,
          step: 5000,
        },
        {
          key: "elastisiteModulu_E_MPa",
          label: "Elastisite Modülü E (MPa)",
          type: "number",
          min: 1000,
          step: 1000,
        },
      ]}
      defaults={{
        eksenelYuk_P_N: 500000,
        kazikBoyu_L_mm: 15000,
        kesitAlani_A_mm2: 100000,
        elastisiteModulu_E_MPa: 25000,
      }}
      mainUnit="mm"
      mainValueKey="elastikKisalma_delta_mm"
      mainDecimals={2}
      intermediateLabels={{
        eksenelRijitlik_Nmm: "Eksenel Rijitlik (N/mm)",
      }}
    />
  );
}
