"use client";

import { isiPompasıKondanserKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiPompasıKondanserKapasitesiPage() {
  return (
    <CalcPage
      module={isiPompasıKondanserKapasitesi}
      standardsLabel="—"
      description="Isı pompası kompresörü gücü ve ısıtma COP'undan kondenser tarafından yayılması gereken ısı yükünü hesaplar ve kapasite kontrolü yapar."
      formula="Q_cond = W × COP"
      engineeringNote="Kondenser, kompresörden çekilen ısı artı kompresör işinin tümünü ortam havasına (hava kaynaklı HP) veya suya (su kaynaklı HP) atmak zorundadır. Kondenser kapasitesi yeterli olmazsa sistem başarısız olur ve ısıtma yetersiz kalır."
      fields={[
        {
          key: "kompresor_gucu_kW",
          label: "Kompresör Gücü (kW)",
          type: "number",
          min: 0.1,
          step: 1,
        },
        {
          key: "isitma_cop",
          label: "Isıtma COP",
          type: "number",
          min: 1,
          step: 0.1,
        },
        {
          key: "kondenser_kapasite_kW",
          label: "Kondenser Kapasitesi (kW)",
          type: "number",
          min: 0.1,
          step: 1,
        },
      ]}
      defaults={{
        kompresor_gucu_kW: 10,
        isitma_cop: 3.5,
        kondenser_kapasite_kW: 40,
      }}
      mainUnit="kW"
      mainValueKey="gereken_kondenser_kapasitesi_kW"
      mainDecimals={1}
      intermediateLabels={{
        isitma_kapasitesi_kW: "Isıtma Kapasitesi (kW)",
      }}
    />
  );
}
