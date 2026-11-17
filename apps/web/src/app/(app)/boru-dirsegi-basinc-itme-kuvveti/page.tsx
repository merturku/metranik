"use client";

import { boruDirsegiBasincItmeKuvveti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruDirsegiBasincItmeKuvvetiPage() {
  return (
    <CalcPage
      module={boruDirsegiBasincItmeKuvveti}
      standardsLabel={"AWWA M11 / EN 805"}
      description={"Basınçlı borunun dirseğinde iç basınç ve akış momentumundan doğan bileşke itme kuvvetini ve zemin emniyet gerilmesine göre gereken dayanak (thrust block) alanını hesaplar."}
      formula={"F = 2·(p·A + ρ·A·v²)·sin(θ/2);  Adayanak = F/σzemin"}
      engineeringNote={"θ borunun yön değiştirme açısıdır (90° dirsek için 90). Hidrolik test basıncıyla hesaplayın (işletme basıncı değil). Dayanak alanı yalnız yatay yük için zemin emniyet gerilmesiyle bulunur; kayma, devrilme ve zemin tipine özel kontroller ayrıca yapılmalıdır. Kenetli (restrained) bağlantılarda dayanak gerekmeyebilir."}
      fields={[
        { key: "basinc_bar", label: "Test / Tasarım Basıncı (bar)", type: "number", step: 1, min: 0.1 },
        { key: "icCap_mm", label: "Boru İç Çapı (mm)", type: "number", step: 10, min: 10 },
        { key: "aci_deg", label: "Yön Değiştirme Açısı θ (°)", type: "number", step: 5, min: 1 },
        { key: "hiz_ms", label: "Akış Hızı (m/s)", type: "number", step: 0.5, min: 0 },
        { key: "zeminGerilmesi_kPa", label: "Zemin Emniyet Gerilmesi (kPa)", type: "number", step: 10, min: 1 },
      ]}
      defaults={{ basinc_bar: 10, icCap_mm: 200, aci_deg: 90, hiz_ms: 2, zeminGerilmesi_kPa: 100 }}
      mainUnit={"N"}
      mainValueKey={"itmeKuvveti_N"}
      mainDecimals={0}
      intermediateLabels={{
        basinc_kuvveti_N: "Basınç Bileşeni (N)",
        momentum_kuvveti_N: "Momentum Bileşeni (N)",
        dayanak_alani_m2: "Gerekli Dayanak Alanı (m²)",
        itme_kN: "İtme Kuvveti (kN)",
      }}
    />
  );
}
