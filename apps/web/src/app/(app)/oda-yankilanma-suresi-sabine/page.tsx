"use client";

import { odaYankilanmaSuresiSabine } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function OdaYankilanmaSuresiSabinePage() {
  return (
    <CalcPage
      module={odaYankilanmaSuresiSabine}
      standardsLabel="Sabine formülü (kuramsal)"
      description="Oda hacmi ve yüzeylerin ses yutum katsayılarından yankılanma süresini (T60) hesaplar, hedefle karşılaştırır ve gereken ek yutum alanını verir."
      formula="T60 = 0,161·V/A;  A = Σ(Sᵢ·αᵢ)"
      engineeringNote="Yaygın ses alanı varsayar (ortalama α < 0,2'de iyi sonuç verir). α değerleri 500 Hz için malzeme verisinden alınır (çıplak beton ≈ 0,02–0,05, halı ≈ 0,3, akustik tavan ≈ 0,6–0,9). Hedef T60 kullanım amacına bağlıdır; ölçüm için TS EN ISO 3382-2 uygulanır."
      fields={[
        { key: "hacim_m3", label: "Oda Hacmi V (m³)", type: "number", step: 1, min: 1 },
        { key: "yuzey1_m2", label: "Yüzey 1 Alanı (m²)", type: "number", step: 1, min: 0 },
        { key: "yuzey1_alfa", label: "Yüzey 1 α (0–1)", type: "number", step: 0.01, min: 0 },
        { key: "yuzey2_m2", label: "Yüzey 2 Alanı (m²)", type: "number", step: 1, min: 0 },
        { key: "yuzey2_alfa", label: "Yüzey 2 α (0–1)", type: "number", step: 0.01, min: 0 },
        { key: "yuzey3_m2", label: "Yüzey 3 Alanı (m²)", type: "number", step: 1, min: 0 },
        { key: "yuzey3_alfa", label: "Yüzey 3 α (0–1)", type: "number", step: 0.01, min: 0 },
        { key: "hedefT60_s", label: "Hedef T60 (s)", type: "number", step: 0.1, min: 0.1 },
      ]}
      defaults={{ hacim_m3: 100, yuzey1_m2: 50, yuzey1_alfa: 0.05, yuzey2_m2: 40, yuzey2_alfa: 0.1, yuzey3_m2: 20, yuzey3_alfa: 0.3, hedefT60_s: 1.5 }}
      mainUnit="s"
      mainValueKey="t60_s"
      mainDecimals={2}
      intermediateLabels={{
        toplam_yutum_alani_A_m2: "Toplam Yutum Alanı A (m²)",
        toplam_yuzey_alani_m2: "Toplam Yüzey Alanı (m²)",
        ortalama_alfa: "Ortalama α",
        hedef_icin_gerekli_A_m2: "Hedef İçin Gerekli A (m²)",
        eklenmesi_gereken_yutum_m2: "Eklenmesi Gereken Yutum (m²)",
        not: "Not",
      }}
    />
  );
}
