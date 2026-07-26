"use client";

import { kabloTavaDolulukOrani } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloTavaDolulukOraniPage() {
  return (
    <CalcPage
      module={kabloTavaDolulukOrani}
      standardsLabel="TS EN 61537 / IEC 60364"
      description="Kablo tavasındaki toplam kablo kesit alanının tava kesit alanına oranını hesaplar ve izin verilen sınırla karşılaştırır."
      formula="Doluluk% = ΣKablo Kesit Alanı / Tava Kesit Alanı × 100"
      engineeringNote="Sınır, dizilim tipine göre değişir: tek katman ≤%40, çok katmanlı ≤%50 (TS EN 61537)."
      fields={[
        {
          key: "kabloKesitAlanlariToplami_mm2",
          label: "Toplam Kablo Kesit Alanı (mm²)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "tavaKesitAlani_mm2",
          label: "Tava Kesit Alanı (mm²)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "dizilimTipi",
          label: "Dizilim Tipi",
          type: "select",
          options: [
            { value: "tek", label: "Tek Katman" },
            { value: "cok", label: "Çok Katmanlı" },
          ],
        },
      ]}
      defaults={{
        kabloKesitAlanlariToplami_mm2: 3000,
        tavaKesitAlani_mm2: 10000,
        dizilimTipi: "tek",
      }}
      mainUnit="%"
      mainValueKey="doluluk_yuzde"
      intermediateLabels={{
        sinir_yuzde: "İzin Verilen Sınır (%)",
        marj_yuzde: "Marj (%)",
      }}
    />
  );
}
