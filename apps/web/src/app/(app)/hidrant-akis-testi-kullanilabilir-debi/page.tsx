"use client";

import { hidrantAkisTestiKullanilabilirDebi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HidrantAkisTestiKullanilabilirDebiPage() {
  return (
    <CalcPage
      module={hidrantAkisTestiKullanilabilirDebi}
      standardsLabel={"NFPA 291"}
      description={"Hidrant akış testinde ölçülen statik/kalan basınç ve debiden, istenen kalan basınçta (örn. 1,4 bar) şebekenin verebileceği debiyi hesaplar ve gerekli yangın debisiyle karşılaştırır."}
      formula={"QR = QF·[(Ps − PR)/(Ps − PF)]^0,54"}
      engineeringNote={"NFPA 291 ve N^1,85 hidrolik bağıntısı (Q ∝ ΔP^0,54) kullanılır. Ekstrapolasyon testteki basınç düşümünün (Ps−PF) küçük olduğu durumda hata büyütür; düşüm statik basıncın en az %10'u olmalıdır. İstenen kalan basınç ve gerekli debi ilgili yangın yönetmeliğinden teyit edilmelidir."}
      fields={[
        { key: "statikBasinc_bar", label: "Statik Basınç Ps (bar)", type: "number", step: 0.1, min: 0.1 },
        { key: "kalanBasinc_bar", label: "Akış Sırasında Kalan Basınç PF (bar)", type: "number", step: 0.1, min: 0 },
        { key: "testDebisi_Lmin", label: "Test Debisi QF (L/dk)", type: "number", step: 100, min: 1 },
        { key: "hedefKalanBasinc_bar", label: "İstenen Kalan Basınç PR (bar)", type: "number", step: 0.1, min: 0 },
        { key: "gerekliDebi_Lmin", label: "Gerekli Yangın Debisi (L/dk)", type: "number", step: 100, min: 1 },
      ]}
      defaults={{ statikBasinc_bar: 5, kalanBasinc_bar: 4, testDebisi_Lmin: 3000, hedefKalanBasinc_bar: 1.4, gerekliDebi_Lmin: 4000 }}
      mainUnit={"L/dk"}
      mainValueKey={"kullanilabilirDebi_Lmin"}
      mainDecimals={0}
      intermediateLabels={{
        basinc_dusum_orani: "(Ps−PR)/(Ps−PF)",
        kullanilabilir_debi_m3h: "Kullanılabilir Debi (m³/h)",
        gerekli_debiye_oran: "Kullanılabilir / Gerekli",
      }}
    />
  );
}
