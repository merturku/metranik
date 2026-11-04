"use client";

import { zeminFazIliskileri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminFazIliskileriPage() {
  return (
    <CalcPage
      module={zeminFazIliskileri}
      standardsLabel="Zemin mekaniği faz ilişkileri"
      description="Özgül ağırlık, boşluk oranı ve su muhtevasından doğal, kuru, doygun ve batık birim hacim ağırlıkları ile porozite ve doygunluk derecesini hesaplar."
      formula="γ = Gs·γw·(1+w)/(1+e);   γd = Gs·γw/(1+e);   Sr = w·Gs/e"
      engineeringNote="γw = 9,81 kN/m³ alınmıştır. Gs genelde kum için 2,65, kil için 2,70–2,75 mertebesindedir; laboratuvar verisini kullanın. Sr > %100 olacak girdi kabul edilmez. Sonuçlar taşıma gücü ve istinat hesaplarının birim hacim ağırlığı girdisi olarak kullanılabilir."
      fields={[
        { key: "ozgulAgirlikGs", label: "Tane Özgül Ağırlığı Gs", type: "number", step: 0.01, min: 2 },
        { key: "bosluk_orani_e", label: "Boşluk Oranı e", type: "number", step: 0.05, min: 0.01 },
        { key: "su_muhtevasi_w", label: "Su Muhtevası w (oran, örn. 0,20)", type: "number", step: 0.01, min: 0 },
      ]}
      defaults={{ ozgulAgirlikGs: 2.65, bosluk_orani_e: 0.7, su_muhtevasi_w: 0.2 }}
      mainUnit="kN/m³"
      mainValueKey="dogalBirimHacimAgirlik_kNm3"
      mainDecimals={2}
      intermediateLabels={{
        kuru_birim_hacim_agirlik_kNm3: "Kuru Birim Hacim Ağırlık (kN/m³)",
        doygun_birim_hacim_agirlik_kNm3: "Doygun Birim Hacim Ağırlık (kN/m³)",
        batik_birim_hacim_agirlik_kNm3: "Batık Birim Hacim Ağırlık (kN/m³)",
        porozite_n: "Porozite n",
        doygunluk_derecesi_Sr_yuzde: "Doygunluk Derecesi Sr (%)",
      }}
    />
  );
}
