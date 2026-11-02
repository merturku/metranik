"use client";

import { betonElastisiteModulu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonElastisiteModuluPage() {
  return (
    <CalcPage
      module={betonElastisiteModulu}
      standardsLabel="TS EN 1992-1-1 Tablo 3.1 / TS 500 §3.1.5"
      description="Beton sınıfından elastisite modülünü (Eurocode ve TS 500 yaklaşımıyla) ve çelik/beton modüler oranını hesaplar."
      formula="Ecm = 22·((fck+8)/10)^0,3 GPa;   Ec(TS 500) = 3250·√fck + 14000 MPa;   n = Es/Ec"
      engineeringNote="Eurocode formülü kuvarsit agrega içindir (kireçtaşı için ~%10 düşük, bazalt için ~%20 yüksek). Bu değerler kısa süreli yükleme içindir; uzun süreli yükte sünme katsayısıyla etkin modül Ec,eff = Ecm/(1+φ) kullanılır. Çıkan Ec; Betonarme Kesit Çatlama Momenti, Kiriş Sehim ve Çatlak Genişliği modüllerinin girdisidir."
      fields={[{ key: "fck_MPa", label: "Beton Karakteristik Basınç Dayanımı fck (MPa)", type: "number", min: 12, step: 1 }]}
      defaults={{ fck_MPa: 30 }}
      mainUnit="MPa (Ecm, Eurocode)"
      mainValueKey="Ecm_MPa"
      mainDecimals={0}
      intermediateLabels={{
        fcm_MPa: "Ortalama Basınç Dayanımı fcm (MPa)",
        Ec_TS500_MPa: "Ec — TS 500 (MPa)",
        fark_yuzde: "TS 500 – Eurocode Farkı (%)",
        moduler_oran_EN: "Modüler Oran n (Eurocode)",
        moduler_oran_TS500: "Modüler Oran n (TS 500)",
      }}
    />
  );
}
