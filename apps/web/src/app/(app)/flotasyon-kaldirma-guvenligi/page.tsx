"use client";

import { flotasyonKaldirmaGuvenligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FlotasyonKaldirmaGuvenligiPage() {
  return (
    <CalcPage
      module={flotasyonKaldirmaGuvenligi}
      standardsLabel="Hidrostatik kaldırma; EN 1997-1"
      description="Bodrum, havuz veya gömülü tank için su kaldırma kuvvetini ve stabilize eden ağırlığa göre güvenlik katsayısını hesaplar."
      formula="U = γw·hw·A;  FS = W/U"
      engineeringNote="Zemin sürtünmesi ve ankraj güvenli tarafta ihmal edilir. EN 1997-1 UPL durumunda kısmi katsayılı kontrol ayrıca yapılmalıdır. Su seviyesi için en yüksek olası taşkın/yeraltı suyu seviyesi alınmalıdır; inşaat aşamasında bina henüz yüklenmemiştir, ayrıca kontrol edin."
      fields={[
        { key: "tabanAlani_m2", label: "Taban Alanı (m²)", type: "number", step: 1, min: 0.1 },
        { key: "suYuksekligi_m", label: "Taban Üstü Su Yüksekliği (m)", type: "number", step: 0.1, min: 0 },
        { key: "stabilizeEdenYuk_kN", label: "Stabilize Eden Yük (kN)", type: "number", step: 10, min: 1 },
        { key: "gerekliFS", label: "Gerekli FS", type: "number", step: 0.05, min: 1 },
      ]}
      defaults={{ tabanAlani_m2: 100, suYuksekligi_m: 3, stabilizeEdenYuk_kN: 3500, gerekliFS: 1.1 }}
      mainUnit=""
      mainValueKey="guvenlikKatsayisi"
      mainDecimals={2}
      intermediateLabels={{
        kaldirma_kuvveti_kN: "Kaldırma Kuvveti (kN)",
        gereken_agirlik_kN: "Gereken Ağırlık (kN)",
        ek_agirlik_ihtiyaci_kN: "Ek Ağırlık İhtiyacı (kN)",
      }}
    />
  );
}
