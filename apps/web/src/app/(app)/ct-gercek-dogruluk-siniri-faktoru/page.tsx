"use client";

import { ctGercekDogrulukSiniriFaktoru } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CtGercekDogrulukSiniriFaktoruPage() {
  return (
    <CalcPage
      module={ctGercekDogrulukSiniriFaktoru}
      standardsLabel={"IEC 61869-2"}
      description={"Koruma akım trafosunun anma doğruluk sınır faktörünü, gerçek bağlı yüke göre düzeltir (ALF′); röle doyma kontrolü için kullanılır."}
      formula={"ALF′ = ALF·(Sin + Sn)/(Sin + Sb);  Sin = In²·Rct"}
      engineeringNote={"Gerçek yük anma yükten küçükse ALF′ artar, büyükse azalır. Rölenin doyma olmadan çalışması için ALF′ ≥ Ikısadevre/In (gerekli sınır faktörü) olmalıdır. Rct (sekonder sargı direnci) üretici veri sayfasından alınmalıdır."}
      fields={[
        { key: "alf", label: "Anma Doğruluk Sınır Faktörü ALF (örn. 5P10 → 10)", type: "number", step: 1, min: 1 },
        { key: "sn_VA", label: "Anma Yükü Sn (VA)", type: "number", step: 1, min: 0.1 },
        { key: "sb_VA", label: "Gerçek Bağlı Yük Sb (VA)", type: "number", step: 0.5, min: 0 },
        { key: "in_A", label: "Sekonder Anma Akımı In (A)", type: "number", step: 4, min: 0.1 },
        { key: "rct_ohm", label: "Sekonder Sargı Direnci Rct (Ω)", type: "number", step: 0.05, min: 0 },
        { key: "gerekliSinir", label: "Gerekli Sınır Faktörü (Ik/In)", type: "number", step: 1, min: 0.1 },
      ]}
      defaults={{ alf: 10, sn_VA: 15, sb_VA: 5, in_A: 5, rct_ohm: 0.5, gerekliSinir: 12 }}
      mainUnit={""}
      mainValueKey={"alfGercek"}
      mainDecimals={2}
      intermediateLabels={{
        sin_VA: "Sargı Kaybı Sin (VA)",
        gerekli_sinir: "Gerekli Sınır Faktörü",
      }}
    />
  );
}
