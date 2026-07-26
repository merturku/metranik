"use client";

import { kuruSistemHavaKompresoru } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KuruSistemHavaKompresoruPage() {
  return (
    <CalcPage
      module={kuruSistemHavaKompresoru}
      standardsLabel="NFPA 13"
      description="Kuru borulu sprinkler sisteminde hedef dolum süresine göre gerekli kompresör debisini hesaplar."
      formula="Q = V / t"
      engineeringNote="NFPA 13, kuru sistemlerde tetikleme süresi için sınırlar tanımlar; kompresör debisi bu süreyi sağlayacak şekilde seçilmelidir."
      fields={[
        {
          key: "boruSistemiHacmi_V_L",
          label: "Boru Sistemi Hacmi V (L)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "hedefDolumSuresi_t_dk",
          label: "Hedef Dolum Süresi t (dk)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ boruSistemiHacmi_V_L: 200, hedefDolumSuresi_t_dk: 30 }}
      mainUnit="L/dk"
      mainValueKey="gerekliDebi_Ldk"
      intermediateLabels={{ hedefDolumSuresi_dk: "Hedef Dolum Süresi (dk)" }}
    />
  );
}
