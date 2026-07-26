"use client";

import { isiPompasiKompresorGucu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiPompasiKompresorGucuPage() {
  return (
    <CalcPage
      module={isiPompasiKompresorGucu}
      standardsLabel="Fiziksel Formül"
      description="Isıtma yüküne ve performans katsayısına (COP) göre gerekli ısı pompası kompresör gücünü hesaplar."
      formula="Pkompresör = Isıtma Yükü / COP"
      engineeringNote="COP dış ortam sıcaklığına ve akışkan sıcaklık farkına göre değişir; kataloglarda genelde belirli bir test koşulu için verilir (örn. A7/W35)."
      fields={[
        { key: "isitmaYuku_kW", label: "Isıtma Yükü (kW)", type: "number", min: 0.1, step: 0.5 },
        {
          key: "performansKatsayisi_COP",
          label: "Performans Katsayısı COP",
          type: "number",
          min: 1,
          step: 0.1,
        },
      ]}
      defaults={{ isitmaYuku_kW: 20, performansKatsayisi_COP: 3.5 }}
      mainUnit="kW"
      mainValueKey="gerekliKompresorGucu_kW"
      intermediateLabels={{ performansKatsayisi_COP: "Performans Katsayısı (COP)" }}
    />
  );
}
