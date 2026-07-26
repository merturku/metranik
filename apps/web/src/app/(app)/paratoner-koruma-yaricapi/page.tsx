"use client";

import { paratonerKorumaYaricapi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ParatonerKorumaYaricapiPage() {
  return (
    <CalcPage
      module={paratonerKorumaYaricapi}
      standardsLabel="TS EN 62305 / NF C 17-102"
      description="Paratoner yüksekliğine ve koruma seviyesi parametresine göre yuvarlanan küre yöntemiyle koruma yarıçapını hesaplar."
      formula="Rp = √(h × (2D − h))"
      engineeringNote="D parametresi koruma seviyesine (I-IV) göre TS EN 62305/NF C 17-102 tablolarından alınır; bu modülde gömülü değildir."
      fields={[
        {
          key: "paratonerYuksekligi_h_m",
          label: "Paratoner Yüksekliği h (m)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "korumaSeviyesiParametresi_D_m",
          label: "Koruma Seviyesi Parametresi D (m)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ paratonerYuksekligi_h_m: 6, korumaSeviyesiParametresi_D_m: 60 }}
      mainUnit="m"
      mainValueKey="korumaYaricapi_m"
      intermediateLabels={{
        paratonerYuksekligi_h_m: "Paratoner Yüksekliği (m)",
        korumaSeviyesiParametresi_D_m: "Koruma Seviyesi Parametresi (m)",
      }}
    />
  );
}
