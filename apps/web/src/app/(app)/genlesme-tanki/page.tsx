"use client";

import { genlesmeTanki } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GenlesmeTankiPage() {
  return (
    <CalcPage
      module={genlesmeTanki}
      standardsLabel="Fiziksel Formül"
      description="Kapalı hidronik sistemde gerekli genleşme tankı hacmini hesaplar. Suyun genleşme oranını sıcaklık farkına göre siz belirlersiniz."
      fields={[
        { key: "sistemSuHacmi_L", label: "Sistem Su Hacmi (L)", type: "number", min: 1, step: 1 },
        {
          key: "genlesmeOrani",
          label: "Genleşme Oranı (örn. 0.03)",
          type: "number",
          min: 0.001,
          step: 0.001,
        },
        { key: "ilkBasinc_bar", label: "İlk Basınç (bar, mutlak)", type: "number", min: 0.1, step: 0.1 },
        { key: "sonBasinc_bar", label: "Son Basınç (bar, mutlak)", type: "number", min: 0.1, step: 0.1 },
      ]}
      defaults={{ sistemSuHacmi_L: 100, genlesmeOrani: 0.03, ilkBasinc_bar: 1.5, sonBasinc_bar: 3 }}
      mainUnit="L"
      mainValueKey="tankHacmi_L"
      intermediateLabels={{ basincOrani_Pa_Pf: "Basınç Oranı (Pa/Pf)" }}
    />
  );
}
