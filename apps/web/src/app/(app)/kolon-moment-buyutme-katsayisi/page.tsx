"use client";

import { kolonMomentBuyutmeKatsayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KolonMomentBuyutmeKatsayisiPage() {
  return (
    <CalcPage
      module={kolonMomentBuyutmeKatsayisi}
      standardsLabel={"ACI 318-19 §6.6.4.5"}
      description={"Ötelenmesi önlenmiş kolonda, eksenel yük altında narinlik etkisini hesaba katan moment büyütme katsayısını (δns) ve kritik burkulma yükünü hesaplar."}
      formula={"Pc = π²·(EI)eff/(k·lu)²;  (EI)eff = 0,4·Ec·Ig/(1 + βdns);  δns = Cm/(1 − Pu/(0,75·Pc)) ≥ 1"}
      engineeringNote={"ACI 318-19 ötelenmesiz çerçeve yöntemidir (TS 500'de benzer ikinci mertebe düzeltmesi vardır, ancak katsayılar farklıdır). Pu ≥ 0,75Pc ise kolon stabil değildir (sonuç yok). Ig brüt kesit atalet momentidir (eğilme eksenine göre); sünme için βdns = kalıcı yükün toplam yüke oranı. Kolon eğilmesi için Cm = 0,6 + 0,4·M1/M2 ≥ 0,4 (tek eğrilikte M1/M2 pozitif), yük arası yük yoksa Cm = 1,0 tutucudur."}
      fields={[
        { key: "pu_kN", label: "Tasarım Eksenel Yük Pu (kN)", type: "number", step: 50, min: 0 },
        { key: "ec_MPa", label: "Beton Elastisite Modülü Ec (MPa)", type: "number", step: 500, min: 1 },
        { key: "b_mm", label: "Kesit Genişliği b (mm)", type: "number", step: 50, min: 1 },
        { key: "h_mm", label: "Eğilme Doğrultusundaki Kesit Yüksekliği h (mm)", type: "number", step: 50, min: 1 },
        { key: "betaDns", label: "Sünme Oranı βdns (0–1)", type: "number", step: 0.1, min: 0 },
        { key: "k", label: "Etkin Boy Katsayısı k", type: "number", step: 0.1, min: 0.5 },
        { key: "lu_m", label: "Kolon Serbest Boyu lu (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "cm", label: "Cm Katsayısı (0,4–1,0)", type: "number", step: 0.1, min: 0.4 },
      ]}
      defaults={{ pu_kN: 1500, ec_MPa: 30000, b_mm: 400, h_mm: 400, betaDns: 0.6, k: 1, lu_m: 3.5, cm: 1 }}
      mainUnit={""}
      mainValueKey={"delta_ns"}
      mainDecimals={3}
      intermediateLabels={{
        Pc_kN: "Kritik Yük Pc (kN)",
        EI_eff_kNm2: "(EI)eff (kN·m²)",
        Pu_Pc_orani: "Pu / (0,75·Pc)",
      }}
    />
  );
}
