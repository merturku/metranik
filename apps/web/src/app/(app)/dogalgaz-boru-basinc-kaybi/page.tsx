"use client";

import { dogalgazBoruBasincKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DogalgazBoruBasincKaybiPage() {
  return (
    <CalcPage
      module={dogalgazBoruBasincKaybi}
      standardsLabel="Renouard (lineer)"
      description="Alçak basınçlı doğalgaz iç tesisatında bir boru hattının basınç kaybını lineer Renouard formülüyle hesaplar ve izin verilen kayıpla karşılaştırır."
      formula="ΔP = 23200 × S × Le × Q^1,82 × D^−4,82   (mbar, m, m³/h, mm)"
      engineeringNote="Le, düz boru boyuna dirsek/te/vana gibi armatürlerin eşdeğer boylarının eklenmiş halidir. D borunun iç çapıdır (anma çapı değil). S doğalgaz için ~0,6, propan için ~1,52. İzin verilen kayıp gaz dağıtım şirketinin iç tesisat teknik esaslarından alınmalıdır; hat hat hesaplanıp sayaçtan en uzak cihaza kadar olan kayıplar toplanır."
      fields={[
        { key: "debi_m3h", label: "Gaz Debisi Q (m³/h)", type: "number", min: 0.1, step: 0.5 },
        { key: "icCap_mm", label: "Boru İç Çapı D (mm)", type: "number", min: 5, step: 1 },
        { key: "esdegerUzunluk_m", label: "Eşdeğer Uzunluk Le (m)", type: "number", min: 0.5, step: 1 },
        { key: "bagilYogunluk", label: "Bağıl Yoğunluk S", type: "number", min: 0.1, step: 0.05 },
        { key: "izinVerilenKayip_mbar", label: "İzin Verilen Kayıp (mbar)", type: "number", min: 0.1, step: 0.1 },
      ]}
      defaults={{
        debi_m3h: 6,
        icCap_mm: 26,
        esdegerUzunluk_m: 20,
        bagilYogunluk: 0.6,
        izinVerilenKayip_mbar: 1.5,
      }}
      mainUnit="mbar"
      mainValueKey="basincKaybi_mbar"
      mainDecimals={3}
      intermediateLabels={{
        gaz_hizi_ms: "Gaz Hızı (m/s)",
        kullanim_orani_yuzde: "İzin Verilen Kaybın Kullanımı (%)",
      }}
    />
  );
}
