"use client";

import { endustriyelBoylerYakitTuketimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EndustriyelBoylerYakitTuketimiPage() {
  return (
    <CalcPage
      module={endustriyelBoylerYakitTuketimi}
      standardsLabel="Fiziksel Formül (Yanma Enerji Dengesi)"
      description="Isı yüküne, yakıt alt ısıl değerine ve kazan verimine göre gerekli yakıt debisini hesaplar."
      formula="Yakıt Debisi = Q / (Alt Isıl Değer × η)"
      engineeringNote="Doğalgaz için alt ısıl değer tipik ~9.4-10.5 kWh/m³ (gaz kalitesine göre); kazan verimi (η) yaş/tipe göre 0.85-0.95 arasında değişir."
      fields={[
        { key: "isiYuku_Q_kW", label: "Isı Yükü Q (kW)", type: "number", min: 1, step: 10 },
        {
          key: "yakitAltIsilDegeri_kWhm3",
          label: "Yakıt Alt Isıl Değeri (kWh/m³)",
          type: "number",
          min: 1,
          step: 0.1,
        },
        {
          key: "kazanVerimi_eta",
          label: "Kazan Verimi η (0-1)",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
      ]}
      defaults={{ isiYuku_Q_kW: 500, yakitAltIsilDegeri_kWhm3: 9.4, kazanVerimi_eta: 0.9 }}
      mainUnit="m³/h"
      mainValueKey="yakitDebisi_m3h"
      intermediateLabels={{ kazanVerimi_eta: "Kazan Verimi (η)" }}
    />
  );
}
