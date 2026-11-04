"use client";

import { donatiKesitAlani } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DonatiKesitAlaniPage() {
  return (
    <CalcPage
      module={donatiKesitAlani}
      standardsLabel="TS 500 / TS 708"
      description="Donatı çapı ve adedinden toplam kesit alanını bulur, gerekli alanı karşılayıp karşılamadığını kontrol eder."
      formula="A = n·π·φ²/4;   n_min = ⌈As,gerek/A₁⌉"
      engineeringNote="Kiriş/kolon donatı oranı sınırları ve çubuk arası mesafe/pas payı kontrolleri ayrıca yapılmalıdır. Gerekli alan 0 girilirse yalnız toplam alan hesaplanır."
      fields={[
        { key: "cap_mm", label: "Çubuk Çapı φ (mm)", type: "number", step: 2, min: 6 },
        { key: "adet", label: "Çubuk Adedi", type: "number", step: 1, min: 1 },
        { key: "gerekliAlan_mm2", label: "Gerekli Alan As (mm²)", type: "number", step: 50, min: 0 },
      ]}
      defaults={{ cap_mm: 16, adet: 4, gerekliAlan_mm2: 1000 }}
      mainUnit="mm²"
      mainValueKey="toplamAlan_mm2"
      mainDecimals={1}
      intermediateLabels={{
        tek_cubuk_alani_mm2: "Tek Çubuk Alanı (mm²)",
        gereken_adet: "Gereken En Az Adet",
        karsilama_orani: "Karşılama Oranı",
        yeterli: "Yeterli mi?",
      }}
    />
  );
}
