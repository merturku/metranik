"use client";

import { sayacDogrulukKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SayacDogrulukKontroluPage() {
  return (
    <CalcPage
      module={sayacDogrulukKontrolu}
      standardsLabel={"IEC 62053-21 (sınıf 1, 2) / IEC 62053-22 (sınıf 0,5S)"}
      description={"Sayaç okuması ile referans (kontrol) sayaç değerini karşılaştırır, yüzde hatayı hesaplar ve sayaç doğruluk sınıfı sınırlarıyla değerlendirir."}
      formula={"e (%) = (Esayaç − Ereferans)/Ereferans × 100;  |e| ≤ sınıf sınırı"}
      engineeringNote={"Sınıf sınırları anma akımında, cosφ = 1 için: sınıf 0,5S ±%0,5; sınıf 1 ±%1; sınıf 2 ±%2'dir; düşük akım ve cosφ ≠ 1 noktaları için farklı sınırlar vardır. Karşılaştırma yeterince uzun ve sabit yükte, aynı zaman aralığında yapılmalı; referansın kendi belirsizliği sonucun küçük bir kısmı olmalıdır. Yasal metroloji doğrulaması akredite laboratuvar işidir."}
      fields={[
        { key: "sayac_kWh", label: "Test Edilen Sayaç Enerjisi (kWh)", type: "number", step: 0.1, min: 0.001 },
        { key: "referans_kWh", label: "Referans Sayaç Enerjisi (kWh)", type: "number", step: 0.1, min: 0.001 },
        { key: "sinif", label: "Doğruluk Sınıfı", type: "select", options: [{ value: "0.5", label: "0,5S (±%0,5)" }, { value: "1", label: "1 (±%1)" }, { value: "2", label: "2 (±%2)" }] },
      ]}
      defaults={{ sayac_kWh: 100.8, referans_kWh: 100, sinif: "1" }}
      mainUnit={"%"}
      mainValueKey={"hata_pct"}
      mainDecimals={3}
      intermediateLabels={{
        sinir_pct: "Sınıf Sınırı (±%)",
        sinir_kullanimi: "Sınır Kullanımı (|e|/sınır)",
      }}
    />
  );
}
