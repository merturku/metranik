"use client";
import { CalcPage } from "@/components/calc-page";
import { elektrikMotorKapasite } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={elektrikMotorKapasite}
      fields={[
        { name: "guc_istenen_kW", label: "İstenen Güç (kW)" },
        { name: "motor_nominal_kW", label: "Motor Nominal Güç (kW)" },
      ]}
      defaults={{ guc_istenen_kW: 7.5, motor_nominal_kW: 11 }}
      description="IEC 60034-1: Motor kullanım kontrolü"
      formula="Kullanım% = (P / Pn) × 100"
      engineeringNote="Motor ömrü maksimum verimde çalıştırıldığında uzar. Aşırı yükleme kaçınılmalı."
    />
  );
}
