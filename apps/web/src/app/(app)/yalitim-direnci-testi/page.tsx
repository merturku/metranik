"use client";

import { yalitimDirenciTesti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YalitimDirenciTestiPage() {
  return (
    <CalcPage
      module={yalitimDirenciTesti}
      standardsLabel="IEC 60364-6"
      description="Devre kategorisine göre asgari yalıtım direnci (IEC 60364-6 Tablo 6.1 yaygın değerleri: SELV/PELV 0.5 MΩ, 500V'a kadar 1.0 MΩ, üzeri 1.0 MΩ). Baskı/ek sürümüne göre değişebilir, yerel baskıdan teyit edin."
      fields={[
        {
          key: "kategori",
          label: "Devre Kategorisi",
          type: "select",
          options: [
            { value: "selv", label: "SELV / PELV (250V test)" },
            { value: "dusuk", label: "500V'a kadar (500V test)" },
            { value: "yuksek", label: "500V üzeri (1000V test)" },
          ],
        },
        {
          key: "olculenDirenc_MOhm",
          label: "Ölçülen Yalıtım Direnci (MΩ)",
          type: "number",
          min: 0.01,
          step: 0.1,
        },
      ]}
      defaults={{ kategori: "dusuk", olculenDirenc_MOhm: 1.5 }}
      mainUnit="MΩ"
      mainValueKey="asgariDirenc_MOhm"
      intermediateLabels={{
        testGerilimi_V: "Test Gerilimi (V)",
        olculenDirenc_MOhm: "Ölçülen Direnç (MΩ)",
      }}
    />
  );
}
