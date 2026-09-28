
"use client";
import { CalcPage } from "@/components/calc-page";
import { modul_269 } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={modul_269}
      standardsLabel="—"
      description="Modül 269"
      formula="—"
      engineeringNote="Test modülü"
      fields={[
        { name: "guc_kW", label: "Güç (kW)", type: "number" },
      ]}
      defaults={{ guc_kW: 10 }}
    />
  );
}
