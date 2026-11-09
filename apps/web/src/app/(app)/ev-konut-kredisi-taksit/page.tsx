"use client";

import { evKonutKredisiTaksit } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvKonutKredisiTaksitPage() {
  return (
    <CalcPage
      module={evKonutKredisiTaksit}
      standardsLabel="Standart atfı yok"
      description="Eşit taksitli kredide anapara, aylık faiz ve vadeden aylık taksit, toplam ödeme ve toplam faizi hesaplar."
      formula="A = P·i / (1 − (1+i)^−n);  Toplam faiz = A·n − P"
      engineeringNote="Faiz oranı aylık yüzde olarak girilir (yıllık oran / 12 değildir; bankanın aylık oranını kullanın). BSMV, KKDF, dosya masrafı ve sigorta dahil değildir; bankanın ödeme planı esastır."
      fields={[
        { key: "anapara", label: "Kredi Tutarı (₺)", type: "number", step: 1000, min: 1 },
        { key: "aylikFaizYuzde", label: "Aylık Faiz Oranı (%)", type: "number", step: 0.01, min: 0 },
        { key: "vadeAy", label: "Vade (ay)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ anapara: 1000000, aylikFaizYuzde: 2.5, vadeAy: 120 }}
      mainUnit="₺/ay"
      mainValueKey="aylikTaksit"
      mainDecimals={2}
      intermediateLabels={{
        toplam_odeme: "Toplam Ödeme (₺)",
        toplam_faiz: "Toplam Faiz (₺)",
        faiz_anapara_orani: "Faiz / Anapara",
      }}
    />
  );
}
