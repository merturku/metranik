"use client";

import { zeminAtterbergKivamIndeksi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminAtterbergKivamIndeksiPage() {
  return (
    <CalcPage
      module={zeminAtterbergKivamIndeksi}
      standardsLabel="TS 1900-1 / ASTM D4318"
      description="Likit limit, plastik limit ve doğal su içeriğinden plastisite indeksini, likidite/kıvam indeksini ve kıvam durumunu hesaplar."
      formula="PI = LL − PL;  LI = (w − PL)/PI;  CI = (LL − w)/PI"
      engineeringNote="Limitler laboratuvar deneyinden alınır (girdi). LI < 0 katı, 0–1 plastik, > 1 akıcıdır. Plastisite derecesi Burmister sınıflarına göredir. Yalnız kohezyonlu (ince daneli) zeminler için anlamlıdır; taşıma gücü ve oturma için ilgili modüllerle birlikte değerlendirin."
      fields={[
        { key: "likitLimit_LL", label: "Likit Limit LL (%)", type: "number", step: 0.5, min: 1 },
        { key: "plastikLimit_PL", label: "Plastik Limit PL (%)", type: "number", step: 0.5, min: 1 },
        { key: "dogalSuIcerigi_w", label: "Doğal Su İçeriği w (%)", type: "number", step: 0.5, min: 1 },
      ]}
      defaults={{ likitLimit_LL: 45, plastikLimit_PL: 22, dogalSuIcerigi_w: 30 }}
      mainUnit=""
      mainValueKey="plastisiteIndeksi_PI"
      mainDecimals={1}
      intermediateLabels={{
        likidite_indeksi_LI: "Likidite İndeksi LI",
        kivam_indeksi_CI: "Kıvam İndeksi CI",
        plastisite_derecesi: "Plastisite Derecesi",
        kivam_durumu: "Kıvam Durumu",
        not: "Not",
      }}
    />
  );
}
