
"use client";
import { CalcPage } from "@/components/calc-page";
import { modul_257 } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={modul_257}
      standardsLabel="—"
      description="Modül 257"
      formula="—"
      engineeringNote="Test modülü"
      fields={[
        { name: "guc_kW", label: "Güç (kW)", type: "number" },
      ]}
      defaults={{ guc_kW: 10 }}
    />
  );
}
