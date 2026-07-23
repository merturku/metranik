"use client";

import { depremTabanKesmeTbdy2018 } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DepremTabanKesmePage() {
  return (
    <CalcPage
      module={depremTabanKesmeTbdy2018}
      standardsLabel="TBDY 2018"
      description="Basitleştirilmiş eşdeğer statik yük yöntemiyle taban kesme kuvvetini hesaplar. Spektral ivme, önem ve taşıyıcı sistem katsayılarını TBDY 2018 tasarım spektrumuna göre siz belirlersiniz."
      fields={[
        { key: "spektralIvme_Sa", label: "Spektral İvme Sa (g)", type: "number", min: 0.01, step: 0.01 },
        { key: "binaAgirligi_kN", label: "Bina Ağırlığı (kN)", type: "number", min: 1, step: 1 },
        { key: "onemKatsayisi_I", label: "Önem Katsayısı (I)", type: "number", min: 0.1, step: 0.1 },
        {
          key: "tasiyiciSistemKatsayisi_R",
          label: "Taşıyıcı Sistem Katsayısı (R)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        spektralIvme_Sa: 0.5,
        binaAgirligi_kN: 10000,
        onemKatsayisi_I: 1.0,
        tasiyiciSistemKatsayisi_R: 4,
      }}
      mainUnit="kN"
      mainValueKey="tabanKesmeKuvveti_kN"
      intermediateLabels={{ spektralIvme_Sa: "Spektral İvme (g)", etkinKatsayi_I_R: "I/R Oranı" }}
    />
  );
}
