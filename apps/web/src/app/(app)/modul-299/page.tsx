
"use client";
import { CalcPage } from "@/components/calc-page";
import { modul_299 } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={modul_299}
      standardsLabel="—"
      description="Modül 299"
      formula="—"
      engineeringNote="Test modülü"
      fields={[
        { name: "guc_kW", label: "Güç (kW)", type: "number" },
      ]}
      defaults={{ guc_kW: 10 }}
    />
  );
}
