"use client";

import { tazeHavaAshrae62 } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TazeHavaDebisiPage() {
  return (
    <CalcPage
      module={tazeHavaAshrae62}
      standardsLabel="ASHRAE 62.1"
      description="Kişi başı ve alan başı debi oranlarına göre nefes alma bölgesi taze hava debisini hesaplar. Oranları kullanım tipine göre siz belirlersiniz."
      fields={[
        { key: "kisiSayisi", label: "Kişi Sayısı", type: "number", min: 0, step: 1 },
        { key: "alan_m2", label: "Alan (m²)", type: "number", min: 1, step: 1 },
        {
          key: "kisiBasiDebi_Rp",
          label: "Kişi Başı Debi Rp (L/s/kişi)",
          type: "number",
          min: 0,
          step: 0.1,
        },
        {
          key: "alanBasiDebi_Ra",
          label: "Alan Başı Debi Ra (L/s/m²)",
          type: "number",
          min: 0,
          step: 0.05,
        },
      ]}
      defaults={{ kisiSayisi: 10, alan_m2: 50, kisiBasiDebi_Rp: 2.5, alanBasiDebi_Ra: 0.3 }}
      mainUnit="L/s"
      mainValueKey="debi_L_s"
      intermediateLabels={{ kisiPayi_L_s: "Kişi Payı (L/s)", alanPayi_L_s: "Alan Payı (L/s)" }}
    />
  );
}
