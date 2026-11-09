"use client";

import { fanToplamStatikDinamikBasinc } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FanToplamStatikDinamikBasincPage() {
  return (
    <CalcPage
      module={fanToplamStatikDinamikBasinc}
      standardsLabel="ISO 5801 · Bernoulli"
      description="Fan statik basıncı, çıkış ağzı hızı ve havanın yoğunluğundan dinamik ve toplam basıncı hesaplar."
      formula="V = Q/A;  Pv = ρ·V²/2;  Pt = Ps + Pv"
      engineeringNote="Fan katalog eğrileri statik veya toplam basınçla verilebilir; karşılaştırmada aynı tanım kullanılmalıdır. ρ rakım ve sıcaklığa göre düzeltilmelidir (Rakım Hava Yoğunluğu modülü). Mil gücü için Fan Mil Gücü modülünü kullanın."
      fields={[
        { key: "statikBasinc_Pa", label: "Fan Statik Basıncı Ps (Pa)", type: "number", step: 10 },
        { key: "debi_m3s", label: "Debi Q (m³/s)", type: "number", step: 0.1, min: 0.001 },
        { key: "cikisAlani_m2", label: "Çıkış Ağzı Alanı (m²)", type: "number", step: 0.01, min: 0.001 },
        { key: "havaYogunlugu_kgm3", label: "Hava Yoğunluğu (kg/m³)", type: "number", step: 0.01, min: 0.1 },
      ]}
      defaults={{ statikBasinc_Pa: 500, debi_m3s: 2, cikisAlani_m2: 0.5, havaYogunlugu_kgm3: 1.2 }}
      mainUnit="Pa"
      mainValueKey="toplamBasinc_Pa"
      mainDecimals={1}
      intermediateLabels={{
        cikis_hizi_ms: "Çıkış Hızı (m/s)",
        dinamik_basinc_Pa: "Dinamik Basınç (Pa)",
        dinamik_oran_yuzde: "Dinamik / Toplam (%)",
        hava_gucu_toplam_W: "Hava Gücü (Pt, W)",
        hava_gucu_statik_W: "Hava Gücü (Ps, W)",
      }}
    />
  );
}
