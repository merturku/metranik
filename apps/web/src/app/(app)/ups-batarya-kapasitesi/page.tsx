"use client";

import { upsBataryaKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function UpsBataryaKapasitesiPage() {
  return (
    <CalcPage
      module={upsBataryaKapasitesi}
      standardsLabel="Fiziksel Formül"
      description="Yüke ve yedek süreye göre gerekli UPS batarya kapasitesini (Ah) hesaplar."
      formula="C = (P × t) / (η × V)"
      engineeringNote="Verim (η) invertör ve batarya deşarj kayıplarını içerir; tipik değer 0.85-0.95 arasıdır."
      fields={[
        { key: "yuk_W", label: "Yük (W)", type: "number", min: 1, step: 10 },
        { key: "yedekSure_h", label: "Yedek Süre (h)", type: "number", min: 0.1, step: 0.1 },
        { key: "verim_eta", label: "Verim η (0-1)", type: "number", min: 0.1, step: 0.01 },
        {
          key: "sistemGerilimi_V",
          label: "Sistem Gerilimi (V)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ yuk_W: 2000, yedekSure_h: 1, verim_eta: 0.9, sistemGerilimi_V: 48 }}
      mainUnit="Ah"
      mainValueKey="gerekliKapasite_Ah"
      intermediateLabels={{ verim_eta: "Verim (η)" }}
    />
  );
}
