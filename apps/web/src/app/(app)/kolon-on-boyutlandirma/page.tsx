"use client";

import { kolonOnBoyutlandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KolonOnBoyutlandirmaPage() {
  return (
    <CalcPage
      module={kolonOnBoyutlandirma}
      standardsLabel="Fiziksel Formül"
      description="Eksenel yüke ve beton dayanımına göre kolon için gerekli kaba kesit alanını ön boyutlandırma amacıyla hesaplar."
      formula="Ac = N / (0.4 × fck)"
      engineeringNote="Bu kaba bir ön boyutlandırmadır; donatı katkısı, moment-eksenel yük etkileşimi ve narinlik kontrolü (bkz. Kolon Narinlik Kontrolü) kesin tasarımda ayrıca yapılmalıdır."
      fields={[
        { key: "eksenelYuk_N_kN", label: "Eksenel Yük N (kN)", type: "number", min: 1, step: 50 },
        {
          key: "betonKarakteristikDayanim_fck_MPa",
          label: "Beton Karakteristik Dayanımı fck (MPa)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ eksenelYuk_N_kN: 1500, betonKarakteristikDayanim_fck_MPa: 25 }}
      mainUnit="cm²"
      mainValueKey="gerekliKesitAlani_cm2"
      intermediateLabels={{ onerilenKareKenar_mm: "Önerilen Kare Kenar (mm)" }}
    />
  );
}
