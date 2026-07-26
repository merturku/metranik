"use client";

import { kompanzasyonKondansatorAkimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KompanzasyonKondansatorAkimiPage() {
  return (
    <CalcPage
      module={kompanzasyonKondansatorAkimi}
      standardsLabel="Fiziksel Formül"
      description="Reaktif güce ve hat gerilimine göre üç fazlı kompanzasyon kondansatör bataryasının hat akımını hesaplar."
      formula="Ic = Qc / (√3 × V)"
      engineeringNote="Bu akım, kondansatör kademesini besleyen kablo, kontaktör ve sigortanın seçiminde referans değerdir; anahtarlama anındaki devreye alma akımı (inrush) çok daha yüksek olabilir, üretici verisiyle teyit edilmelidir."
      fields={[
        {
          key: "reaktifGuc_Qc_kVAr",
          label: "Reaktif Güç Qc (kVAr)",
          type: "number",
          min: 0.1,
          step: 5,
        },
        { key: "hatGerilimi_V_V", label: "Hat Gerilimi V (V)", type: "number", min: 1, step: 10 },
      ]}
      defaults={{ reaktifGuc_Qc_kVAr: 100, hatGerilimi_V_V: 400 }}
      mainUnit="A"
      mainValueKey="hatAkimi_Ic_A"
      intermediateLabels={{ hatGerilimi_V_V: "Hat Gerilimi (V)" }}
    />
  );
}
