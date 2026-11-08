"use client";

import { ucYolluVanaKarisimDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function UcYolluVanaKarisimDebisiPage() {
  return (
    <CalcPage
      module={ucYolluVanaKarisimDebisi}
      standardsLabel="Kütle ve enerji dengesi"
      description="Primer gidiş ve sekonder dönüş suyunun karışımıyla hedef sıcaklığa ulaşmak için gereken primer debi payını ve bypass debisini hesaplar."
      formula="x = (Tm − T₂)/(T₁ − T₂);  Q_primer = x·Q;  Q_bypass = (1 − x)·Q"
      engineeringNote="Aynı akışkan ve sabit özgül ısı kabul edilir. T₂ < Tm ≤ T₁ olmalıdır. Vana boyutlandırması için Kontrol Vanası Otoritesi modülünü kullanın; karışım oranı kapanma konumuna göre doğrusal değildir (vana karakteristiği)."
      fields={[
        { key: "primerSicaklik_C", label: "Primer Gidiş Sıcaklığı T₁ (°C)", type: "number", step: 1 },
        { key: "donusSicakligi_C", label: "Sekonder Dönüş Sıcaklığı T₂ (°C)", type: "number", step: 1 },
        { key: "hedefKarisimSicakligi_C", label: "Hedef Karışım Sıcaklığı Tm (°C)", type: "number", step: 1 },
        { key: "sekonderDebi_m3h", label: "Sekonder Debi Q (m³/h)", type: "number", step: 0.5, min: 0.01 },
      ]}
      defaults={{ primerSicaklik_C: 80, donusSicakligi_C: 40, hedefKarisimSicakligi_C: 60, sekonderDebi_m3h: 10 }}
      mainUnit="m³/h"
      mainValueKey="primerDebi_m3h"
      mainDecimals={2}
      intermediateLabels={{
        primer_payi_x: "Primer Payı x",
        bypass_donus_debisi_m3h: "Bypass/Dönüş Debisi (m³/h)",
        sekonder_debi_m3h: "Sekonder Debi (m³/h)",
        not: "Not",
      }}
    />
  );
}
