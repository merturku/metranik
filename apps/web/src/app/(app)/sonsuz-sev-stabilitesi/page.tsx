"use client";

import { sonsuzSevStabilitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SonsuzSevStabilitesiPage() {
  return (
    <CalcPage
      module={sonsuzSevStabilitesi}
      standardsLabel="Zemin Mekaniği (Sonsuz Şev)"
      description="Kohezyonsuz zeminde, içsel sürtünme açısı ve şev eğim açısına göre sonsuz şev (infinite slope) güvenlik katsayısını hesaplar."
      formula="FS = tan(φ) / tan(β)"
      engineeringNote="Bu formül kuru, kohezyonsuz (c=0) ve yeraltı suyu etkisi olmayan sonsuz şev durumunu kapsar; kohezyonlu zeminlerde veya su tablası varlığında ek terimler (c, γw) gerekir."
      fields={[
        {
          key: "icselSurtunmeAcisi_phi_derece",
          label: "İçsel Sürtünme Açısı φ (°)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "sevEgimAcisi_beta_derece",
          label: "Şev Eğim Açısı β (°)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ icselSurtunmeAcisi_phi_derece: 32, sevEgimAcisi_beta_derece: 20 }}
      mainUnit=""
      mainValueKey="guvenlikKatsayisi_FS"
      intermediateLabels={{
        icselSurtunmeAcisi_phi_derece: "İçsel Sürtünme Açısı φ (°)",
        sevEgimAcisi_beta_derece: "Şev Eğim Açısı β (°)",
      }}
    />
  );
}
