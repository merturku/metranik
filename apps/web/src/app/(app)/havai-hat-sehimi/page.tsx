"use client";

import { havaiHatSehimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavaiHatSehimiPage() {
  return (
    <CalcPage
      module={havaiHatSehimi}
      standardsLabel="Parabolik kablo teorisi"
      description="Havai hat iletkeninin açıklık ortası sehimini, iletken boyunu ve mesnet çekmesini hesaplar."
      formula="f = w·L²/(8H);  Boy ≈ L + 8f²/(3L);  T ≈ H + w·f"
      engineeringNote="Eşit yükseklikli mesnet ve küçük sehim (f/L < 0,1) varsayılır; aksi halde katenar denklemi gerekir. Buz ve rüzgar yükü için birim ağırlığa bileşke yük girin. Güvenlik mesafeleri ve iletken kopma kontrolü EN 50341 ile ayrıca yapılmalıdır."
      fields={[
        { key: "birimAgirlik_Nm", label: "Birim Boy Ağırlık w (N/m)", type: "number", step: 1, min: 0.01 },
        { key: "aciklik_m", label: "Açıklık L (m)", type: "number", step: 10, min: 1 },
        { key: "yatayCekme_N", label: "Yatay Çekme H (N)", type: "number", step: 500, min: 1 },
      ]}
      defaults={{ birimAgirlik_Nm: 20, aciklik_m: 200, yatayCekme_N: 10000 }}
      mainUnit="m"
      mainValueKey="sehim_m"
      mainDecimals={2}
      intermediateLabels={{
        iletken_boyu_m: "İletken Boyu (m)",
        mesnet_cekmesi_N: "Mesnet Çekmesi (N)",
        sehim_aciklik_orani: "Sehim / Açıklık",
        not: "Not",
      }}
    />
  );
}
