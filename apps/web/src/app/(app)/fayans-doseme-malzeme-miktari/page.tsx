"use client";

import { fayansDosemeMalzemeMiktari } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FayansDosemeMalzemeMiktariPage() {
  return (
    <CalcPage
      module={fayansDosemeMalzemeMiktari}
      standardsLabel="Sektör Kuralı"
      description="Döşenecek alana ve fire oranına göre gerekli fayans/döşeme malzemesi miktarını hesaplar."
      formula="Miktar = Alan × (1 + Fire Oranı)"
      engineeringNote="Fire oranı kesim kaybı, desen uyumu ve kırılma payını içerir; düz döşemede ~%5-10, çapraz/desenlide daha yüksek alınır."
      fields={[
        { key: "alan_m2", label: "Alan (m²)", type: "number", min: 1, step: 1 },
        { key: "fireOrani", label: "Fire Oranı (0-1)", type: "number", min: 0, step: 0.01 },
      ]}
      defaults={{ alan_m2: 30, fireOrani: 0.1 }}
      mainUnit="m²"
      mainValueKey="gerekliMalzeme_m2"
      intermediateLabels={{ fireOrani_yuzde: "Fire Oranı (%)" }}
    />
  );
}
