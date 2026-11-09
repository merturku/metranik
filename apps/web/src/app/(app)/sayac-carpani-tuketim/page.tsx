"use client";

import { sayacCarpaniTuketim } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SayacCarpaniTuketimPage() {
  return (
    <CalcPage
      module={sayacCarpaniTuketim}
      standardsLabel="Dolaylı sayaç çarpanı"
      description="Akım ve gerilim trafolu sayaçta endeks farkından, trafo oranlarını çarparak gerçek tüketimi hesaplar; endeks taşmasını düzeltir."
      formula="Tüketim = (Son − İlk)·çarpan;  çarpan = (CT primer/sekonder)·VT oranı"
      engineeringNote="Yarı dolaylı ölçümde (yalnız akım trafosu) VT oranı 1'dir. Endeks sıfırlanmışsa sayaç basamak sayısını girin (0 = taşma düzeltmesi yok). Aktif ve reaktif tüketimi Reaktif Enerji Oranı Kontrolü modülüne girerek oranı değerlendirin."
      fields={[
        { key: "ilkEndeks", label: "İlk Endeks", type: "number", step: 1, min: 0 },
        { key: "sonEndeks", label: "Son Endeks", type: "number", step: 1, min: 0 },
        { key: "ctPrimer_A", label: "CT Primer (A)", type: "number", step: 5, min: 1 },
        { key: "ctSekonder_A", label: "CT Sekonder (A)", type: "number", step: 1, min: 1 },
        { key: "vtOrani", label: "VT Oranı (1 = yok)", type: "number", step: 1, min: 0.01 },
        { key: "sayacBasamakSayisi", label: "Sayaç Basamak Sayısı (0 = düzeltme yok)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ ilkEndeks: 12000, sonEndeks: 12500, ctPrimer_A: 200, ctSekonder_A: 5, vtOrani: 1, sayacBasamakSayisi: 0 }}
      mainUnit="kWh"
      mainValueKey="tuketim"
      mainDecimals={0}
      intermediateLabels={{
        endeks_farki: "Endeks Farkı",
        carpan: "Çarpan",
        ct_orani: "CT Oranı",
        endeks_tasmasi_duzeltildi: "Endeks Taşması Düzeltildi",
      }}
    />
  );
}
