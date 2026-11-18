"use client";

import { celikIKesitSinifi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CelikIKesitSinifiPage() {
  return (
    <CalcPage
      module={celikIKesitSinifi}
      standardsLabel={"TS EN 1993-1-1 Tablo 5.2"}
      description={"Çift simetrik I/H profilinde başlık (basınç) ve gövde (eğilme) narinliklerinden kesit sınıfını (1–4) belirler."}
      formula={"ε = √(235/fy);  başlık: c/t ≤ 9ε / 10ε / 14ε;  gövde (eğilme): c/t ≤ 72ε / 83ε / 124ε"}
      engineeringNote={"Başlık dış çıkıntı için c = (b − tw − 2r)/2, gövde için c = h − 2tf − 2r alınır. Gövde eğilme için tabloda saf eğilme sınırları kullanılır; eksenel yük varsa ayrı kontrol gerekir. Sınıf 1–2 plastik, sınıf 3 elastik dayanım, sınıf 4 etkin kesit (yerel burkulma) gerektirir. Kaynaklı kesitte r = 0 girin (köşe kaynağı payı ayrıca düşülür)."}
      fields={[
        { key: "fy_MPa", label: "Akma Dayanımı fy (MPa)", type: "number", step: 20, min: 100 },
        { key: "h_mm", label: "Profil Yüksekliği h (mm)", type: "number", step: 10, min: 10 },
        { key: "b_mm", label: "Başlık Genişliği b (mm)", type: "number", step: 10, min: 10 },
        { key: "tf_mm", label: "Başlık Kalınlığı tf (mm)", type: "number", step: 0.5, min: 1 },
        { key: "tw_mm", label: "Gövde Kalınlığı tw (mm)", type: "number", step: 0.5, min: 1 },
        { key: "r_mm", label: "Kök Yarıçapı r (mm)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ fy_MPa: 355, h_mm: 300, b_mm: 150, tf_mm: 10.7, tw_mm: 7.1, r_mm: 15 }}
      mainUnit={""}
      mainValueKey={"kesitSinifi"}
      mainDecimals={0}
      intermediateLabels={{
        epsilon: "ε",
        baslik_c_t: "Başlık c/t",
        baslik_sinifi: "Başlık Sınıfı",
        govde_c_t: "Gövde c/t",
        govde_sinifi: "Gövde Sınıfı",
      }}
    />
  );
}
