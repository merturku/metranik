"use client";

import { darbeKisaDevreAkimiIp } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DarbeKisaDevreAkimiIpPage() {
  return (
    <CalcPage
      module={darbeKisaDevreAkimiIp}
      standardsLabel="IEC 60909-0"
      description="Başlangıç simetrik kısa devre akımı ve R/X oranından darbe (tepe) kısa devre akımını hesaplar; kesici yapma kapasitesi ve bara dinamik zorlanması için kullanılır."
      formula="κ = 1,02 + 0,98·e^(−3R/X);  ip = κ·√2·Ik″"
      engineeringNote="Tek kaynaklı radyal şebeke için geçerlidir; ağlı sistemde κ için ayrı yöntemler gerekir. R/X, kısa devre noktasından görülen toplam empedansın oranıdır. Kablo Sonu Kısa Devre Akımı modülünün Ik değerini girdi olarak kullanabilirsiniz; Bara Elektrodinamik Kuvvet modülü ip ile çalışır."
      fields={[
        { key: "baslangicKisaDevreAkimi_kA", label: "Başlangıç Kısa Devre Akımı Ik″ (kA)", type: "number", step: 0.5, min: 0.01 },
        { key: "r_x_orani", label: "R/X Oranı", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ baslangicKisaDevreAkimi_kA: 20, r_x_orani: 0.1 }}
      mainUnit="kA"
      mainValueKey="darbeAkimi_kA"
      mainDecimals={2}
      intermediateLabels={{
        kappa: "κ Faktörü",
        tepe_etkin_orani_ip_Ik: "ip / Ik″",
        simetrik_tepe_kA: "Simetrik Tepe √2·Ik″ (kA)",
      }}
    />
  );
}
