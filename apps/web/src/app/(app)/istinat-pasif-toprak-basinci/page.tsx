"use client";

import { istinatPasifToprakBasinci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IstinatPasifToprakBasinciPage() {
  return (
    <CalcPage
      module={istinatPasifToprakBasinci}
      standardsLabel="Rankine teorisi (standart atfı yok)"
      description="Yatay yüzeyli zeminde duvarın önündeki pasif toprak direncini (Rankine) hesaplar; devrilme ve kayma kontrollerine girdi sağlar."
      formula="Kp = tan²(45° + φ/2);  Pp = ½·γ·H²·Kp + 2·c·H·√Kp"
      engineeringNote="Aktif Toprak Basıncı modülünün karşılığıdır. Pasif direncin tam mobilize olması büyük deplasman ister; tasarımda azaltın ve donma/kazı riski olan üst tabakayı ihmal edin (H'yi buna göre alın). Duvar sürtünmesi ve eğimli yüzey dikkate alınmaz."
      fields={[
        { key: "birimHacimAgirlik_kNm3", label: "Birim Hacim Ağırlık γ (kN/m³)", type: "number", step: 0.5, min: 1 },
        { key: "yukseklik_m", label: "Pasif Bölge Yüksekliği H (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "icSurtunmeAcisi_derece", label: "İç Sürtünme Açısı φ (°)", type: "number", step: 1, min: 0 },
        { key: "kohezyon_kPa", label: "Kohezyon c (kPa)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ birimHacimAgirlik_kNm3: 18, yukseklik_m: 1.5, icSurtunmeAcisi_derece: 30, kohezyon_kPa: 0 }}
      mainUnit="kN/m"
      mainValueKey="pasifKuvvet_kNm"
      mainDecimals={2}
      intermediateLabels={{
        pasif_katsayi_Kp: "Pasif Katsayı Kp",
        surtunme_bileseni_kNm: "Sürtünme Bileşeni (kN/m)",
        kohezyon_bileseni_kNm: "Kohezyon Bileşeni (kN/m)",
        taban_pasif_gerilmesi_kPa: "Tabandaki Pasif Gerilme (kPa)",
      }}
    />
  );
}
