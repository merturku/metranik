"use client";

import { pisSuPompaKuyusuHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PisSuPompaKuyusuHacmiPage() {
  return (
    <CalcPage
      module={pisSuPompaKuyusuHacmi}
      standardsLabel="ANSI/HI 9.8 — pompa kuyusu (çevrim süresi yöntemi)"
      description="Drenaj veya pis su pompa kuyusunun, pompa motorunun azami kalkış sayısını aşmayacak faydalı (start–stop arası) hacmini hesaplar."
      formula="T_min = 60/N;   V = Q_pompa·T_min/4"
      engineeringNote="V = Q·T/4 bağıntısı en kötü durumu (gelen debi pompa debisinin yarısı) esas alır. Faydalı hacim, durma ve çalışma seviyeleri arasındaki hacimdir; kuyu toplam derinliği ayrıca pompa minimum su seviyesi (NPSH/dalma) ve gelen boru kotuna göre belirlenir. Azami kalkış sayısı motor üretici verisidir. Atık su debisi için Atık Su Debisi modülüne bakın."
      fields={[
        { key: "pompaDebisi_Lmin", label: "Pompa Debisi (L/dk)", type: "number", min: 1, step: 10 },
        { key: "azamiKalkisSayisi_saat", label: "Azami Kalkış Sayısı (1/saat)", type: "number", min: 1, step: 1 },
        { key: "kuyuKesitAlani_m2", label: "Kuyu Kesit Alanı (m²)", type: "number", min: 0.1, step: 0.1 },
      ]}
      defaults={{ pompaDebisi_Lmin: 300, azamiKalkisSayisi_saat: 6, kuyuKesitAlani_m2: 1 }}
      mainUnit="L (faydalı hacim)"
      mainValueKey="faydaliHacim_L"
      mainDecimals={0}
      intermediateLabels={{
        en_kisa_cevrim_dk: "En Kısa Çevrim Süresi (dk)",
        faydali_hacim_m3: "Faydalı Hacim (m³)",
        start_stop_seviye_farki_m: "Start–Stop Seviye Farkı (m)",
      }}
    />
  );
}
