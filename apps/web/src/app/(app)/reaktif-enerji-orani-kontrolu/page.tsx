"use client";

import { reaktifEnerjiOraniKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ReaktifEnerjiOraniKontroluPage() {
  return (
    <CalcPage
      module={reaktifEnerjiOraniKontrolu}
      standardsLabel="EPDK tarife uygulaması (teyit edin)"
      description="Aylık aktif ve reaktif enerji sayaç değerlerinden endüktif/kapasitif oranı hesaplar, sınırlarla karşılaştırır ve aşan reaktif enerjiyi verir."
      formula="Oran = Qreaktif/P·100 (kVArh/kWh);  cosφ = P/√(P² + Q²);  aşan = Q − sınır·P"
      engineeringNote="Varsayılan sınırlar (endüktif %20, kapasitif %15) uygulamada geçerli tarifeden teyit edilmelidir; mevzuat dönemine göre değişir ve girdidir. Endüktif aşım kompanzasyon eksikliğini, kapasitif aşım aşırı kompanzasyonu (düşük yükte kademeli kontrol sorunu) gösterir. Kompanzasyon gücü için Kompanzasyon modülünü kullanın."
      fields={[
        { key: "aktifEnerji_kWh", label: "Aktif Enerji (kWh/ay)", type: "number", step: 100, min: 1 },
        { key: "enduktifReaktif_kVArh", label: "Endüktif Reaktif (kVArh/ay)", type: "number", step: 100, min: 0 },
        { key: "kapasitifReaktif_kVArh", label: "Kapasitif Reaktif (kVArh/ay)", type: "number", step: 100, min: 0 },
        { key: "enduktifSinir_yuzde", label: "Endüktif Sınır (%)", type: "number", step: 1, min: 1 },
        { key: "kapasitifSinir_yuzde", label: "Kapasitif Sınır (%)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ aktifEnerji_kWh: 10000, enduktifReaktif_kVArh: 1500, kapasitifReaktif_kVArh: 0, enduktifSinir_yuzde: 20, kapasitifSinir_yuzde: 15 }}
      mainUnit="%"
      mainValueKey="enduktifOran_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        kapasitif_oran_yuzde: "Kapasitif Oran (%)",
        ortalama_cosphi_enduktif: "Ortalama cosφ (endüktif)",
        sinir_asan_enduktif_kVArh: "Sınırı Aşan Endüktif (kVArh)",
        sinir_asan_kapasitif_kVArh: "Sınırı Aşan Kapasitif (kVArh)",
      }}
    />
  );
}
