"use client";

import { havaDebisiBirimDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavaDebisiBirimDonusumuPage() {
  return (
    <CalcPage
      module={havaDebisiBirimDonusumu}
      standardsLabel="Birim dönüşümü"
      description="Hava debisini m³/h cinsinden CFM, L/s, m³/s ve m³/dk birimlerine çevirir."
      formula="CFM = m³/h / 1,699011;   L/s = m³/h / 3,6"
      engineeringNote="CFM ABD birimidir (ft³/dk); katalog fan eğrilerinde sık görülür. Hacimsel debi sıcaklık ve rakıma göre değişir; standart hava (1,2 kg/m³) dışında Rakım Hava Yoğunluğu modülüne bakın."
      fields={[
        { key: "debi_m3h", label: "Debi (m³/h)", type: "number", step: 100, min: 0.001 },
      ]}
      defaults={{ debi_m3h: 1699.011 }}
      mainUnit="CFM"
      mainValueKey="debi_CFM"
      mainDecimals={1}
      intermediateLabels={{
        debi_Ls: "L/s",
        debi_m3s: "m³/s",
        debi_m3dk: "m³/dk",
        debi_ft3h: "ft³/h",
      }}
    />
  );
}
