"use client";

import { agregaNemDuzeltmesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AgregaNemDuzeltmesiPage() {
  return (
    <CalcPage
      module={agregaNemDuzeltmesi}
      standardsLabel="TS EN 1097-6 · TS 802"
      description="İnce ve iri agreganın nem ve su emme değerlerinden serbest suyu, tartılacak nemli agrega miktarını ve eklenecek karışım suyunu hesaplar."
      formula="Serbest su = M_kuru·(w − emme)/100;  Tartım = M_kuru·(1 + w/100);  Su = tasarım suyu − Σ serbest su"
      engineeringNote="Tasarım suyu SSD (yüzey kuru doygun) esasında verilmişse emmeyi girin; kuru esaslı tasarımda emme değerlerini 0 girin. Nem ve emme laboratuvar ölçümünden alınır. Eklenecek su negatifse agrega aşırı ıslaktır."
      fields={[
        { key: "tasarimSuyu_kgm3", label: "Tasarım Suyu (kg/m³)", type: "number", step: 1, min: 0 },
        { key: "ince_kuru_kgm3", label: "İnce Agrega – Kuru (kg/m³)", type: "number", step: 5, min: 0 },
        { key: "ince_nem_yuzde", label: "İnce Agrega Nemi (%)", type: "number", step: 0.1, min: 0 },
        { key: "ince_emme_yuzde", label: "İnce Agrega Emme (%)", type: "number", step: 0.1, min: 0 },
        { key: "iri_kuru_kgm3", label: "İri Agrega – Kuru (kg/m³)", type: "number", step: 5, min: 0 },
        { key: "iri_nem_yuzde", label: "İri Agrega Nemi (%)", type: "number", step: 0.1, min: 0 },
        { key: "iri_emme_yuzde", label: "İri Agrega Emme (%)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ tasarimSuyu_kgm3: 180, ince_kuru_kgm3: 800, ince_nem_yuzde: 4, ince_emme_yuzde: 1.5, iri_kuru_kgm3: 1000, iri_nem_yuzde: 1, iri_emme_yuzde: 0.8 }}
      mainUnit="kg/m³"
      mainValueKey="eklenecekSu_kgm3"
      mainDecimals={1}
      intermediateLabels={{
        ince_serbest_su_kgm3: "İnce Agrega Serbest Su (kg/m³)",
        iri_serbest_su_kgm3: "İri Agrega Serbest Su (kg/m³)",
        tartilacak_ince_kgm3: "Tartılacak İnce Agrega (kg/m³)",
        tartilacak_iri_kgm3: "Tartılacak İri Agrega (kg/m³)",
        toplam_serbest_su_kgm3: "Toplam Serbest Su (kg/m³)",
      }}
    />
  );
}
