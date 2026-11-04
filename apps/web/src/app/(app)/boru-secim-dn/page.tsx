"use client";

import { boruSecimDn } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruSecimDnPage() {
  return (
    <CalcPage
      module={boruSecimDn}
      standardsLabel="EN 10220 — dış çap serisi"
      description="Debi ve tasarım hızından gerekli iç çapı bulur, standart dış çap serisinden uygun DN'yi seçer ve gerçek hızı verir."
      formula="D = √(4Q/(π·V));   iç çap = OD − 2t ≥ D olan en küçük DN"
      engineeringNote="Et kalınlığı boru sınıfına (siyah/galvaniz, schedule) göre değişir ve kullanıcı girdisidir; üretici tablosundan alın. Tasarım hızı hat tipine bağlıdır (emme tarafı daha düşük). Basınç kaybı için Boru Basınç Kaybı modülü ile kontrol edin. DN300'ün üstü kapsam dışıdır."
      fields={[
        { key: "debi_m3h", label: "Debi (m³/h)", type: "number", step: 1, min: 0.01 },
        { key: "tasarimHizi_ms", label: "Tasarım Hızı (m/s)", type: "number", step: 0.1, min: 0.1 },
        { key: "etKalinligi_mm", label: "Et Kalınlığı t (mm)", type: "number", step: 0.1, min: 0.5 },
      ]}
      defaults={{ debi_m3h: 20, tasarimHizi_ms: 1.5, etKalinligi_mm: 3.6 }}
      mainUnit="DN"
      mainValueKey="dn"
      mainDecimals={0}
      intermediateLabels={{
        gerekli_ic_cap_mm: "Gerekli İç Çap (mm)",
        dis_cap_mm: "Seçilen Dış Çap (mm)",
        secilen_ic_cap_mm: "Seçilen İç Çap (mm)",
        gercek_hiz_ms: "Gerçek Hız (m/s)",
      }}
    />
  );
}
