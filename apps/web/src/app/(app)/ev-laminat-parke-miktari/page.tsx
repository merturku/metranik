"use client";

import { evLaminatParkeMiktari } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvLaminatParkeMiktariPage() {
  return (
    <CalcPage
      module={evLaminatParkeMiktari}
      standardsLabel="Standart atfı yok"
      description="Oda alanı, paket kapsama alanı ve fire oranından gereken laminat veya parke paket sayısını hesaplar."
      formula="Paket = ⌈A·(1 + fire)/A_paket⌉"
      engineeringNote="Fire düz döşemede yaklaşık %5–7, diyagonal döşemede %10–15 alınır. Süpürgelik ve eşik profilleri ayrıca hesaplanır. Aynı üretim partisinden alın; ek paket küçük tonfark riski taşır."
      fields={[
        { key: "alan_m2", label: "Oda Alanı (m²)", type: "number", step: 1, min: 0.1 },
        { key: "paketAlani_m2", label: "Paket Kapsama Alanı (m²)", type: "number", step: 0.1, min: 0.1 },
        { key: "fireYuzde", label: "Fire (%)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ alan_m2: 24, paketAlani_m2: 2.2, fireYuzde: 7 }}
      mainUnit="paket"
      mainValueKey="paketSayisi"
      mainDecimals={0}
      intermediateLabels={{
        fireli_alan_m2: "Fireli Alan (m²)",
        satin_alinan_alan_m2: "Satın Alınan Alan (m²)",
        artan_alan_m2: "Artan Alan (m²)",
      }}
    />
  );
}
