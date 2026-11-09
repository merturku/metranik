"use client";

import { fanIsletmeNoktasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FanIsletmeNoktasiPage() {
  return (
    <CalcPage
      module={fanIsletmeNoktasi}
      standardsLabel="Fan–sistem eğrisi kesişimi"
      description="Fan karakteristik eğrisi ile kanal sistem eğrisinin kesişiminden işletme debisini, basıncı ve mil gücünü hesaplar."
      formula="Fan: ΔP = A + B·Q + C·Q²;  Sistem: ΔP = k·Q²;  (C − k)·Q² + B·Q + A = 0"
      engineeringNote="Fan eğrisi üretici verisinden üç noktayla uydurulur ve yalnız kararlı bölgede geçerlidir; stall (eyer) bölgesine yakın çalışmaktan kaçının. k, tasarım noktasından k = ΔP/Q² ile bulunur. Debi değişimi için Fan Afinite Yasaları modülünü kullanın."
      fields={[
        { key: "fanA_Pa", label: "Fan Eğrisi A — Kapalı Vana Basıncı (Pa)", type: "number", step: 10, min: 1 },
        { key: "fanB", label: "Fan Eğrisi B (Pa/(m³/h))", type: "number", step: 0.001 },
        { key: "fanC", label: "Fan Eğrisi C (Pa/(m³/h)²)", type: "number", step: 1e-06 },
        { key: "sistemK", label: "Sistem Katsayısı k (Pa/(m³/h)²)", type: "number", step: 1e-06, min: 1e-10 },
        { key: "fanVerimi", label: "Fan Verimi (0–1)", type: "number", step: 0.05, min: 0.01 },
      ]}
      defaults={{ fanA_Pa: 600, fanB: 0, fanC: -4e-06, sistemK: 2e-06, fanVerimi: 0.6 }}
      mainUnit="m³/h"
      mainValueKey="debi_m3h"
      mainDecimals={0}
      intermediateLabels={{
        basinc_Pa: "Çalışma Basıncı (Pa)",
        mil_gucu_kW: "Mil Gücü (kW)",
        debi_Ls: "Debi (L/s)",
      }}
    />
  );
}
