
"use client";
import { CalcPage } from "@/components/calc-page";
import { modul_265 } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={modul_265}
      standardsLabel="—"
      description="Modül 265"
      formula="—"
      engineeringNote="Test modülü"
      fields={[
        { name: "guc_kW", label: "Güç (kW)", type: "number" },
      ]}
      defaults={{ guc_kW: 10 }}
    />
  );
}
