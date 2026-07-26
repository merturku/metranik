"use client";

import { panoYukCetveli } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PanoYukCetveliPage() {
  return (
    <CalcPage
      module={panoYukCetveli}
      standardsLabel="Fiziksel Formül"
      description="Toplam kurulu güce ve talep faktörüne göre panonun tasarım (talep) gücünü hesaplar."
      formula="Ptalep = ΣPkurulu × Talep Faktörü"
      engineeringNote="Talep faktörü, tüm yüklerin aynı anda tam kapasitede çalışmayacağını yansıtır; bina/tesis tipine göre tipik 0.5-0.9 arasında alınır."
      fields={[
        {
          key: "toplamKuruluGuc_kW",
          label: "Toplam Kurulu Güç (kW)",
          type: "number",
          min: 0.1,
          step: 1,
        },
        {
          key: "talepFaktoru",
          label: "Talep Faktörü (0-1)",
          type: "number",
          min: 0.05,
          step: 0.05,
        },
      ]}
      defaults={{ toplamKuruluGuc_kW: 100, talepFaktoru: 0.7 }}
      mainUnit="kW"
      mainValueKey="talepGucu_kW"
      intermediateLabels={{ talepFaktoru: "Talep Faktörü" }}
    />
  );
}
