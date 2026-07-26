"use client";

import { duzYuzeyTasinimIsiKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DuzYuzeyTasinimIsiKaybiPage() {
  return (
    <CalcPage
      module={duzYuzeyTasinimIsiKaybi}
      standardsLabel="Newton Soğuma Yasası"
      description="Taşınım ısı transfer katsayısına, yüzey alanına ve sıcaklık farkına göre düz bir yüzeyden taşınımla olan ısı kaybını hesaplar."
      formula="Q = h × A × ΔT"
      engineeringNote="h değeri akış koşuluna bağlıdır: doğal taşınımda tipik 5-25 W/m²K, zorlanmış taşınımda (fan/rüzgar) 25-250 W/m²K aralığındadır; kesin değer ilgili korelasyondan (Nusselt sayısı) hesaplanmalıdır."
      fields={[
        {
          key: "tasinimKatsayisi_h_Wm2K",
          label: "Taşınım Katsayısı h (W/m²K)",
          type: "number",
          min: 1,
          step: 1,
        },
        { key: "yuzeyAlani_A_m2", label: "Yüzey Alanı A (m²)", type: "number", min: 0.1, step: 0.5 },
        {
          key: "sicaklikFarki_dT_K",
          label: "Sıcaklık Farkı ΔT (K)",
          type: "number",
          min: 0.1,
          step: 1,
        },
      ]}
      defaults={{ tasinimKatsayisi_h_Wm2K: 15, yuzeyAlani_A_m2: 12, sicaklikFarki_dT_K: 20 }}
      mainUnit="W"
      mainValueKey="isiKaybi_Q_W"
      intermediateLabels={{ yuzeyAlani_A_m2: "Yüzey Alanı (m²)" }}
    />
  );
}
