"use client";

import { awgMm2Donusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AwgMm2DonusumuPage() {
  return (
    <CalcPage
      module={awgMm2Donusumu}
      standardsLabel={"ASTM B258 (AWG formülü)"}
      description={"AWG (American Wire Gauge) numarasından iletken çapını ve kesit alanını hesaplar; en yakın IEC 60228 standart kesitini gösterir."}
      formula={"d = 0,127·92^((36 − n)/39) mm;  A = π·d²/4"}
      engineeringNote={"n = 0, −1, −2, −3 sırasıyla 1/0, 2/0, 3/0, 4/0 anlamına gelir. Formül tek telli iletken çapı içindir; çok telli iletkenlerde kesit aynı kalır fakat dış çap daha büyüktür. IEC 60228 serisi, Avrupa'da kullanılan standart kesitlerdir (örn. 2,5 mm², 6 mm²). Akım taşıma kapasitesi AWG'ye göre değil, kurulum koşuluna göre belirlenir."}
      fields={[
        { key: "awg", label: "AWG Numarası (4/0 için −3, 1/0 için −0 → 0, 2/0 için −1, 3/0 için −2)", type: "number", step: 1, min: -3 },
      ]}
      defaults={{ awg: 10 }}
      mainUnit={"mm²"}
      mainValueKey={"kesit_mm2"}
      mainDecimals={3}
      intermediateLabels={{
        cap_mm: "İletken Çapı (mm)",
        en_yakin_iec_kesit_mm2: "En Yakın Standart IEC Kesit (mm²)",
      }}
    />
  );
}
