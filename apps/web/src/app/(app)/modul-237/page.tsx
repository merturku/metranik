
"use client";
import { CalcPage } from "@/components/calc-page";
import { modul_237 } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={modul_237}
      standardsLabel="—"
      description="Modül 237"
      formula="—"
      engineeringNote="Test modülü"
      fields={[
        { name: "guc_kW", label: "Güç (kW)", type: "number" },
      ]}
      defaults={{ guc_kW: 10 }}
    />
  );
}
