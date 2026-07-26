"use client";

import { kondansatorDepolananEnerji } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KondansatorDepolananEnerjiPage() {
  return (
    <CalcPage
      module={kondansatorDepolananEnerji}
      standardsLabel="Fiziksel Formül"
      description="Kapasiteye ve gerilime göre kondansatörde depolanan elektrik enerjisini hesaplar."
      formula="E = 0.5 × C × V²"
      engineeringNote="Kompanzasyon ve güç elektroniği devrelerinde kondansatörün depoladığı enerji, deşarj sonrası dokunma güvenliği ve boşaltma direnci seçiminde referans değerdir."
      fields={[
        {
          key: "kapasite_C_F",
          label: "Kapasite C (F)",
          type: "number",
          min: 0.000001,
          step: 0.0001,
        },
        { key: "gerilim_V_V", label: "Gerilim V (V)", type: "number", min: 1, step: 10 },
      ]}
      defaults={{ kapasite_C_F: 0.001, gerilim_V_V: 400 }}
      mainUnit="J"
      mainValueKey="enerji_J"
      intermediateLabels={{ gerilim_V_V: "Gerilim (V)" }}
    />
  );
}
