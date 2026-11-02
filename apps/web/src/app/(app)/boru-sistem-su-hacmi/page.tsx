"use client";

import { boruSistemSuHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruSistemSuHacmiPage() {
  return (
    <CalcPage
      module={boruSistemSuHacmi}
      standardsLabel="Geometrik hacim hesabı"
      description="Boru hattı iç hacmi ile ekipman hacimlerini toplayarak hidronik sistemin toplam su hacmini bulur."
      formula="V = π/4·di²·L·1000 + V_ekipman   [L]"
      engineeringNote="Farklı çaplı hatlar için her çapı ayrı hesaplayıp ekipman hacmine ekleyin. Radyatör, kazan, eşanjör ve denge kabı iç hacimleri üretici kataloğundan alınır. Sonuç Genleşme Tankı, kapalı sistem dolum ve inhibitör dozajı hesaplarında sistem hacmi olarak kullanılır."
      fields={[
        { key: "icCap_mm", label: "Boru İç Çapı (mm)", type: "number", min: 1, step: 1 },
        { key: "boruUzunlugu_m", label: "Boru Uzunluğu (m)", type: "number", min: 0.1, step: 10 },
        { key: "ekipmanHacmi_L", label: "Ekipman Su Hacmi Toplamı (L)", type: "number", min: 0, step: 10 },
      ]}
      defaults={{ icCap_mm: 107.1, boruUzunlugu_m: 100, ekipmanHacmi_L: 50 }}
      mainUnit="L (toplam su hacmi)"
      mainValueKey="toplamHacim_L"
      mainDecimals={1}
      intermediateLabels={{
        boru_hacmi_L: "Boru Hacmi (L)",
        birim_uzunluk_hacmi_Lm: "Birim Uzunluk Hacmi (L/m)",
        toplam_hacim_m3: "Toplam Hacim (m³)",
        su_agirligi_kg: "Su Ağırlığı (kg)",
      }}
    />
  );
}
