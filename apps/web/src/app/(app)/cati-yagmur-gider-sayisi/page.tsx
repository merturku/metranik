"use client";

import { catiYagmurGiderSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CatiYagmurGiderSayisiPage() {
  return (
    <CalcPage
      module={catiYagmurGiderSayisi}
      standardsLabel="TS EN 12056-3 — çatı drenajı (rasyonel yöntem)"
      description="Çatı alanı ve yağış şiddetinden yağmur debisini, gereken gider adedini ve taşma giderini hesaplar."
      formula="Q = C·i·A/3600  [L/s];   n = ⌈Q/Q_gider⌉"
      engineeringNote="Gider kapasitesi, seçilen gider çapı ve izin verilen su derinliğine göre üretici verisidir. Yağış şiddeti yerel yağış verisinden (dönüş periyodu; yönetmeliğe göre genelde 5–100 yıl) alınmalıdır. Ana tahliyeden bağımsız taşma (emniyet) gideri ayrıca öngörülmelidir (sonuçta +1 olarak belirtilir). Yatay toplayıcı boru için Gravite Boru Kapasitesi (Manning) modülünü kullanın."
      fields={[
        { key: "catiAlani_m2", label: "Çatı Projeksiyon Alanı (m²)", type: "number", min: 1, step: 10 },
        { key: "yagisSiddeti_mmh", label: "Yağış Şiddeti i (mm/h)", type: "number", min: 1, step: 10 },
        { key: "akisKatsayisi", label: "Akış Katsayısı C (0–1)", type: "number", min: 0.1, step: 0.05 },
        { key: "giderKapasitesi_Ls", label: "Gider Kapasitesi (L/s)", type: "number", min: 0.5, step: 0.5 },
      ]}
      defaults={{ catiAlani_m2: 800, yagisSiddeti_mmh: 150, akisKatsayisi: 1, giderKapasitesi_Ls: 8 }}
      mainUnit="adet (ana gider)"
      mainValueKey="giderSayisi"
      mainDecimals={0}
      intermediateLabels={{
        yagmur_debisi_Ls: "Yağmur Debisi (L/s)",
        yagmur_debisi_m3h: "Yağmur Debisi (m³/h)",
        tasma_dahil_toplam_gider: "Taşma Gideri Dahil Toplam",
        gider_basina_alan_m2: "Gider Başına Alan (m²)",
        gider_doluluk_yuzde: "Gider Doluluğu (%)",
      }}
    />
  );
}
