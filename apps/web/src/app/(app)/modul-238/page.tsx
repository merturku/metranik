
"use client";
import { CalcPage } from "@/components/calc-page";
import { modul_238 } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={modul_238}
      standardsLabel="—"
      description="Modül 238"
      formula="—"
      engineeringNote="Test modülü"
      fields={[
        { name: "guc_kW", label: "Güç (kW)", type: "number" },
      ]}
      defaults={{ guc_kW: 10 }}
    />
  );
}
