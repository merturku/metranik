"use client";

import { motorMomentGucDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MotorMomentGucDonusumuPage() {
  return (
    <CalcPage
      module={motorMomentGucDonusumu}
      standardsLabel="P = T·ω"
      description="Güç, moment ve devir arasındaki ilişkiden istenen büyüklüğü hesaplar."
      formula="P[kW] = T[Nm]·n[dev/dk]/9549,3"
      engineeringNote="Hedef büyüklüğü seçin ve diğer ikisini girin; hedef alan girişi 0 bırakılabilir. Asenkron motorda nominal devir senkron devirden kayma kadar düşüktür (etiketten alın). Dişli/kayış çıkışı için verim ayrıca uygulanmalıdır."
      fields={[
        { key: "hedef", label: "Hesaplanacak Büyüklük", type: "select", options: [{ value: "guc", label: "Güç (kW)" }, { value: "moment", label: "Moment (Nm)" }, { value: "devir", label: "Devir (dev/dk)" }] },
        { key: "guc_kW", label: "Güç (kW)", type: "number", step: 0.5, min: 0 },
        { key: "moment_Nm", label: "Moment (Nm)", type: "number", step: 1, min: 0 },
        { key: "devir_rpm", label: "Devir (dev/dk)", type: "number", step: 10, min: 0 },
      ]}
      defaults={{ hedef: "guc", guc_kW: 0, moment_Nm: 95.5, devir_rpm: 1500 }}
      mainUnit=""
      mainValueKey="sonuc"
      mainDecimals={2}
      intermediateLabels={{
        hesaplanan: "Hesaplanan Büyüklük",
        birim: "Birim",
        sabit_9549: "Sabit (60000/2π)",
      }}
    />
  );
}
