"use client";

import { dcKabloGerilimDusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DcKabloGerilimDusumuPage() {
  return (
    <CalcPage
      module={dcKabloGerilimDusumu}
      standardsLabel="IEC 62548 — PV DC hat tasarımı (kılavuz)"
      description="GES string/DC hattı veya akü hattında gidiş-dönüş gerilim düşümünü, hat kaybını ve izin verilen yüzdeye göre gereken minimum kesiti hesaplar."
      formula="ΔV = 2·ρ·L·I / A;   %ΔV = ΔV / V_sistem·100;   ρ(Cu, 75 °C) = 0,0225 Ω·mm²/m"
      engineeringNote="İzin verilen yüzde tasarımcı kararıdır (GES DC hatlarında yaygın hedef ≤ %1–1,5; proje şartnamesinden teyit edin). Kesit seçiminde ayrıca akım taşıma kapasitesi ve DC kısa devre/ark koşulları kontrol edilmelidir. AC gerilim düşümü için Gerilim Düşümü Kontrolü modülünü kullanın."
      fields={[
        { key: "sistemGerilimi_V", label: "Sistem DC Gerilimi (V)", type: "number", min: 1, step: 10 },
        { key: "akim_A", label: "Hat Akımı (A)", type: "number", min: 0.1, step: 1 },
        { key: "tekYonUzunluk_m", label: "Tek Yön Kablo Uzunluğu (m)", type: "number", min: 0.1, step: 5 },
        { key: "kesit_mm2", label: "Kablo Kesiti (mm²)", type: "number", min: 0.5, step: 0.5 },
        { key: "izinVerilenYuzde", label: "İzin Verilen Gerilim Düşümü (%)", type: "number", min: 0.1, step: 0.1 },
      ]}
      defaults={{ sistemGerilimi_V: 600, akim_A: 10, tekYonUzunluk_m: 50, kesit_mm2: 6, izinVerilenYuzde: 1.5 }}
      mainUnit="V (gerilim düşümü)"
      mainValueKey="gerilimDusumu_V"
      mainDecimals={2}
      intermediateLabels={{
        gerilim_dusumu_yuzde: "Gerilim Düşümü (%)",
        hat_kaybi_W: "Hat Kaybı (W)",
        gereken_min_kesit_mm2: "Gereken Minimum Kesit (mm²)",
      }}
    />
  );
}
