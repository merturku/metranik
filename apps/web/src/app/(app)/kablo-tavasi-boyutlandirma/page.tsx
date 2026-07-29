"use client";

import { kabloTavasiBoyutlandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloTavasiBoyutlandirmaPage() {
  return (
    <CalcPage
      module={kabloTavasiBoyutlandirma}
      standardsLabel="TS EN 61537"
      description="Toplam kablo kesit alanına ve hedef doluluk oranı sınırına göre, verilen bir tava yüksekliği için gerekli kablo tavası genişliğini hesaplar."
      formula="Gerekli Alan = ΣKablo Kesiti / Sınır Oranı, Genişlik = Gerekli Alan / Yükseklik"
      engineeringNote="TS EN 61537 tek katman dizilimde ≤%40, çok katmanlı dizilimde ≤%50 doluluk sınırı öngörür; bu, doluluk kontrolünün tersi olan boyutlandırma yönüdür."
      fields={[
        {
          key: "kabloKesitAlanlariToplami_mm2",
          label: "Toplam Kablo Kesit Alanı (mm²)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "dizilimTipi",
          label: "Dizilim Tipi",
          type: "select",
          options: [
            { value: "tek", label: "Tek Katman (≤%40)" },
            { value: "cok", label: "Çok Katmanlı (≤%50)" },
          ],
        },
        {
          key: "tavaYuksekligi_mm",
          label: "Tava Yüksekliği (mm)",
          type: "number",
          min: 10,
          step: 10,
        },
      ]}
      defaults={{
        kabloKesitAlanlariToplami_mm2: 4000,
        dizilimTipi: "cok",
        tavaYuksekligi_mm: 100,
      }}
      mainUnit="mm"
      mainValueKey="gerekliGenislik_mm"
      intermediateLabels={{
        sinir_yuzde: "Sınır (%)",
        gerekliTavaKesitAlani_mm2: "Gerekli Tava Kesit Alanı (mm²)",
      }}
    />
  );
}
