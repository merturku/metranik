"use client";

import { akimTrafosuPrimerAkimSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AkimTrafosuPrimerAkimSecimiPage() {
  return (
    <CalcPage
      module={akimTrafosuPrimerAkimSecimi}
      standardsLabel={"IEC 61869-2 (standart primer akımlar)"}
      description={"İşletme akımı ve tasarım payından gereken en küçük primer akımı bulur, IEC standart primer akım serisinden (10; 12,5; 15; 20; 25; 30; 40; 50; 60; 75 × 10ⁿ) seçer ve dönüşüm oranı ile yüklenme yüzdesini verir."}
      formula={"Ip ≥ k·Ib;  Ip ∈ {10, 12,5, 15, 20, 25, 30, 40, 50, 60, 75}·10ⁿ A;  oran = Ip / Is"}
      engineeringNote={"Ölçü akım trafolarında doğruluk sınıfı %20–%120 In arasında garanti edilir; işletme akımı bu aralıkta kalmalıdır. Koruma CT'sinde primer akım ayrıca kısa devre akımına göre doyma kontrolü (ALF′) ile doğrulanmalıdır (CT Gerçek Doğruluk Sınır Faktörü modülü). Sekonder yük (burden) ve güç sınıfı ayrıca CT Sekonder Yük Kontrolü ile denetlenir."}
      fields={[
        { key: "isletmeAkimi_A", label: "İşletme (Yük) Akımı Ib (A)", type: "number", step: 10, min: 1 },
        { key: "tasarimPayi", label: "Tasarım Payı k (örn. 1,2)", type: "number", step: 0.05, min: 1 },
        { key: "sekonderAkim_A", label: "Sekonder Anma Akımı", type: "select", options: [{ value: "5", label: "5 A" }, { value: "1", label: "1 A" }] },
      ]}
      defaults={{ isletmeAkimi_A: 173, tasarimPayi: 1.2, sekonderAkim_A: "5" }}
      mainUnit={"A"}
      mainValueKey={"primerAkim_A"}
      mainDecimals={1}
      intermediateLabels={{
        gerekli_min_primer_A: "Gerekli Asgari Primer Akım (A)",
        donusum_orani: "Dönüşüm Oranı",
        donusum_orani_sayisal: "Dönüşüm Oranı (sayısal)",
        isletme_akimi_yuzdesi: "İşletme Akımı / Primer (%)",
        uyari: "Uyarı",
      }}
    />
  );
}
