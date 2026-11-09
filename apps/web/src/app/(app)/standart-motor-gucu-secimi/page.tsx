"use client";

import { standartMotorGucuSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function StandartMotorGucuSecimiPage() {
  return (
    <CalcPage
      module={standartMotorGucuSecimi}
      standardsLabel="IEC 60072-1"
      description="Mil gücü ve yedek çarpanından gereken gücü bulur, tercih edilen standart motor anma gücü serisinden uygun kademeyi seçer."
      formula="P_gerekli = P_mil · k;  P_motor = seriden ≥ P_gerekli olan en küçük değer"
      engineeringNote="Seri yaygın kW basamaklarıdır; kataloğunuzu teyit edin. Yedek çarpanı yük belirsizliği ve devreye alma toleransı içindir (≈ 1,10–1,25). Yüksek rakım, sıcak ortam ve sık kalkış için ek düşüm gerekebilir. Pompa/fan mil gücü modüllerinin çıktısını girdi alır."
      fields={[
        { key: "milGucu_kW", label: "Mil Gücü (kW)", type: "number", step: 0.1, min: 0.01 },
        { key: "yedekCarpani", label: "Yedek Çarpanı", type: "number", step: 0.01, min: 1 },
      ]}
      defaults={{ milGucu_kW: 7.2, yedekCarpani: 1.15 }}
      mainUnit="kW"
      mainValueKey="secilenMotor_kW"
      mainDecimals={2}
      intermediateLabels={{
        gerekli_guc_kW: "Gerekli Güç (kW)",
        yuklenme_orani: "Yüklenme Oranı",
        onceki_kademe_kW: "Bir Önceki Kademe (kW)",
      }}
    />
  );
}
