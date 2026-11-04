"use client";

import { ledLumenWattEsdegeri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function LedLumenWattEsdegeriPage() {
  return (
    <CalcPage
      module={ledLumenWattEsdegeri}
      standardsLabel="Işık etkinliği (lm/W)"
      description="Hedef ışık akısı için gerekli LED gücünü ve eski lambaya göre tasarrufu hesaplar."
      formula="P_LED = Φ/η_LED;   tasarruf = P_eski − P_LED"
      engineeringNote="Etkinlik değeri ambalaj/katalogdaki lm ve W değerlerinden alınmalıdır. Armatür verimi ve ışık dağılımı hesaba katılmaz; oda aydınlık düzeyi için Aydınlatma Lüks Yöntemi modülünü kullanın."
      fields={[
        { key: "hedefLumen_lm", label: "Hedef Işık Akısı (lm)", type: "number", step: 50, min: 1 },
        { key: "ledEtkinligi_lmW", label: "LED Etkinliği (lm/W)", type: "number", step: 5, min: 1 },
        { key: "eskiLambaGucu_W", label: "Eski Lamba Gücü (W)", type: "number", step: 5, min: 0.1 },
      ]}
      defaults={{ hedefLumen_lm: 800, ledEtkinligi_lmW: 100, eskiLambaGucu_W: 60 }}
      mainUnit="W"
      mainValueKey="ledGucu_W"
      mainDecimals={1}
      intermediateLabels={{
        eski_lamba_etkinligi_lmW: "Eski Lamba Etkinliği (lm/W)",
        tasarruf_W: "Güç Tasarrufu (W)",
        tasarruf_yuzde: "Tasarruf (%)",
      }}
    />
  );
}
