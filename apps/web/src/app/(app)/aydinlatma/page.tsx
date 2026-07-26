"use client";

import { aydinlatmaEn12464 } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AydinlatmaPage() {
  return (
    <CalcPage
      module={aydinlatmaEn12464}
      standardsLabel="EN 12464-1"
      description="Lümen (lüks) yöntemiyle gerekli toplam ışık akısını hesaplar."
      formula="Φ = E × A / (UF × MF)"
      engineeringNote="Hedef aydınlık (E) ve kullanım faktörü (UF) EN 12464-1 mekan tablolarından mühendis tarafından seçilir."
      fields={[
        { key: "hedefAydinlik_lux", label: "Hedef Aydınlık (lux)", type: "number", min: 1, step: 1 },
        { key: "alan_m2", label: "Alan (m²)", type: "number", min: 1, step: 1 },
        {
          key: "faydaliKullanimFaktoru",
          label: "Faydalı Kullanım Faktörü (UF)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        { key: "bakimFaktoru", label: "Bakım Faktörü (MF)", type: "number", min: 0.01, step: 0.01 },
      ]}
      defaults={{ hedefAydinlik_lux: 500, alan_m2: 20, faydaliKullanimFaktoru: 0.6, bakimFaktoru: 0.8 }}
      mainUnit="lm"
      mainValueKey="gerekliAkilAr_lm"
      mainDecimals={0}
      intermediateLabels={{ hedefAydinlik_lux: "Hedef Aydınlık (lux)", alan_m2: "Alan (m²)" }}
    />
  );
}
