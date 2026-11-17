"use client";

import { yagTutucuNominalBoyut } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YagTutucuNominalBoyutPage() {
  return (
    <CalcPage
      module={yagTutucuNominalBoyut}
      standardsLabel={"TS EN 1825-2"}
      description={"Mutfak atık suyu için yağ tutucunun nominal boyutunu (NS) azami atık su debisi ve düzeltme katsayılarıyla hesaplar ve bir üst standart boyutu önerir."}
      formula={"NS = Qs·ft·fd·fr"}
      engineeringNote={"Qs (L/s) mutfak cihazlarının eşzamanlı deşarjından bulunan azami atık su debisidir. ft sıcaklık katsayısı (≤ 60 °C için 1,0; daha sıcakta 1,3), fd yağ yoğunluğu katsayısı (≤ 0,94 g/cm³ için 1,0), fr yıkama maddesi/deterjan katsayısıdır (deterjan yoksa 1,0). Katsayıları ve ticari NS serisini (1, 2, 4, 7, 10, 15, 20, 25, 30...) standardın güncel baskısından ve üretici kataloğundan teyit edin."}
      fields={[
        { key: "qs_Ls", label: "Azami Atık Su Debisi Qs (L/s)", type: "number", step: 0.5, min: 0.01 },
        { key: "ft", label: "Sıcaklık Katsayısı ft", type: "number", step: 0.1, min: 1 },
        { key: "fd", label: "Yağ Yoğunluğu Katsayısı fd", type: "number", step: 0.1, min: 1 },
        { key: "fr", label: "Yıkama Maddesi Katsayısı fr", type: "number", step: 0.1, min: 1 },
      ]}
      defaults={{ qs_Ls: 4, ft: 1.3, fd: 1, fr: 1 }}
      mainUnit={"NS"}
      mainValueKey={"nominalBoyut_NS"}
      mainDecimals={2}
      intermediateLabels={{
        onerilen_standart_NS: "Önerilen Standart Boyut (NS)",
      }}
    />
  );
}
