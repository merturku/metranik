"use client";
import { CalcPage } from "@/components/calc-page";
import { motorRotorBarAkimi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={motorRotorBarAkimi}
      fields={[
        { name: "guc_kW", label: "Motor Gücü (kW)" },
      ]}
      defaults={{
        guc_kW: 11,
      }}
      description="IEC 60034-30: Motor rotor bar akımı (eşdeğer akım) hesabı"
      formula="Ir = P / (√3 × V × η × p/2)"
      engineeringNote="Rotor barlarının ısınma ve mekanik dayanım kontrolü için kullanılır."
    />
  );
}
