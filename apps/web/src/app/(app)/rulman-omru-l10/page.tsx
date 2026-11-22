"use client";

import { rulmanOmruL10 } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function RulmanOmruL10Page() {
  return (
    <CalcPage
      module={rulmanOmruL10}
      standardsLabel={'ISO 281'}
      description={'Rulmanın dinamik yük sayısı, eşdeğer yükü ve devrinden nominal L10 ömrünü (milyon devir ve saat) hesaplar; gereken ömürle karşılaştırır.'}
      formula={'L10 = (C/P)^p;  L10h = 10⁶·L10 / (60·n);  p = 3 (bilya), 10/3 (makara)'}
      engineeringNote={"L10, %90 güvenilirlik ve normal malzeme/yağlama içindir; 'genişletilmiş ömür' (aISO) yağlama, kirlilik ve yorulma sınırı düzeltmesi yoktur. Eşdeğer yük P = X·Fr + Y·Fa ile radyal ve eksenel yükten ayrıca bulunmalıdır; C değeri rulman kataloğundan alınır. Değişken yük/devirde ağırlıklı ortalama kullanılmalıdır."}
      fields={[
        { key: "dinamikYukSayisi_C_kN", label: "Dinamik Yük Sayısı C (kN)", type: "number", step: 1, min: 0.1 },
        { key: "esdegerYuk_P_kN", label: "Eşdeğer Dinamik Yük P (kN)", type: "number", step: 0.5, min: 0.01 },
        { key: "devir_rpm", label: "Devir (dev/dk)", type: "number", step: 50, min: 1 },
        { key: "rulmanTipi", label: "Rulman Tipi", type: "select", options: [
          { value: "bilya", label: "Bilyalı (p = 3)" },
          { value: "makara", label: "Makaralı (p = 10/3)" },
        ] },
        { key: "gerekliOmur_saat", label: "Gereken Ömür (saat)", type: "number", step: 1000, min: 1 },
      ]}
      defaults={{ dinamikYukSayisi_C_kN: 25, esdegerYuk_P_kN: 5, devir_rpm: 1450, rulmanTipi: "bilya", gerekliOmur_saat: 1200 }}
      mainUnit={'saat'}
      mainValueKey={'L10h_saat'}
      mainDecimals={0}
      intermediateLabels={{
        us_p: "Ömür Üssü p",
        L10_milyon_devir: "L10 (milyon devir)",
        L10h_saat: "L10h (saat)",
        omur_orani: "Ömür / Gereken",
        C_P_orani: "C / P",
      }}
    />
  );
}
