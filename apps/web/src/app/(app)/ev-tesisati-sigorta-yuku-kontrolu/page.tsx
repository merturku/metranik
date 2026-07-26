"use client";

import { evTesisatiSigortaYukuKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvTesisatiSigortaYukuKontroluPage() {
  return (
    <CalcPage
      module={evTesisatiSigortaYukuKontrolu}
      standardsLabel="IEC 60364"
      description="Devreye bağlı toplam güce göre çekilen akımı hesaplar ve sigorta anma akımıyla karşılaştırır."
      formula="I = P / (V × cosφ)"
      engineeringNote="Ev tipi tek fazlı devrelerde tipik cosφ 0.9-0.98 arasıdır; kesin değer cihaz etiketlerinden alınmalıdır."
      fields={[
        { key: "toplamGuc_W", label: "Toplam Güç (W)", type: "number", min: 1, step: 100 },
        { key: "gerilim_V", label: "Gerilim (V)", type: "number", min: 1, step: 1 },
        {
          key: "gucFaktoru_cosfi",
          label: "Güç Faktörü (cosφ)",
          type: "number",
          min: 0.1,
          step: 0.01,
        },
        {
          key: "sigortaAnmaAkimi_A",
          label: "Sigorta Anma Akımı (A)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ toplamGuc_W: 3000, gerilim_V: 230, gucFaktoru_cosfi: 0.95, sigortaAnmaAkimi_A: 16 }}
      mainUnit="A"
      mainValueKey="akim_A"
      intermediateLabels={{
        sigortaAnmaAkimi_A: "Sigorta Anma Akımı (A)",
        marj_A: "Marj (A)",
      }}
    />
  );
}
