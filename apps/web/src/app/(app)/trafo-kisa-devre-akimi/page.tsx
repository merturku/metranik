"use client";

import { trafoKisaDevreAkimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TrafoKisaDevreAkimiPage() {
  return (
    <CalcPage
      module={trafoKisaDevreAkimi}
      standardsLabel="Fiziksel Formül"
      description="Trafo gücüne, nominal gerilime ve kısa devre gerilim yüzdesine göre trafo çıkışındaki kısa devre akımını hesaplar."
      formula="Ikk = In / (Ucc%/100), In = Sn/(√3·Vn)"
      engineeringNote="Ucc (kısa devre gerilimi yüzdesi) trafo etiketinden alınır; bu hesap yalnızca trafo katkısını verir, kablo/hat empedansı ayrıca hesaba katılmalıdır."
      fields={[
        { key: "trafoGucu_Sn_kVA", label: "Trafo Gücü Sn (kVA)", type: "number", min: 1, step: 10 },
        {
          key: "nominalGerilim_Vn_V",
          label: "Nominal Gerilim Vn (V)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "kisaDevreGerilimYuzdesi_Ucc",
          label: "Kısa Devre Gerilimi Ucc (%)",
          type: "number",
          min: 1,
          step: 0.5,
        },
      ]}
      defaults={{ trafoGucu_Sn_kVA: 1000, nominalGerilim_Vn_V: 400, kisaDevreGerilimYuzdesi_Ucc: 5 }}
      mainUnit="kA"
      mainValueKey="kisaDevreAkimi_kA"
      intermediateLabels={{ nominalAkim_A: "Nominal Akım (A)" }}
    />
  );
}
