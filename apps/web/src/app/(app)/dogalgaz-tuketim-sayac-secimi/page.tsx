"use client";

import { dogalgazTuketimSayacSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DogalgazTuketimSayacSecimiPage() {
  return (
    <CalcPage
      module={dogalgazTuketimSayacSecimi}
      standardsLabel="TS EN 1359"
      description="Kombi/kazan, ocak ve diğer gaz cihazlarının ısıl yüklerinden anlık doğalgaz debisini hesaplar ve bu debiyi karşılayan en küçük diyaframlı gaz sayacını (G sınıfı) önerir. Debi, Renouard basınç kaybı modülünün girdisidir."
      formula="V̇ = f × ΣQgiriş / Hu,   sayaç: Qmaks(G) ≥ V̇   (G1,6 2,5 · G2,5 4 · G4 6 · G6 10 · G10 16 · G16 25 m³/h)"
      engineeringNote="Cihaz gücü olarak etiketteki ısıl yük (giriş gücü, Hi esaslı) kullanılmalıdır; ısıl güç (çıkış) verim kadar düşüktür. Hu, dağıtım şirketinin esas aldığı alt ısıl değerdir (Türkiye'de genellikle 8250 kcal/m³ ≈ 9,59 kWh/m³). Eşzamanlılık katsayısı, tek dairede genellikle 1 alınır; çok daireli kolon hatları için dağıtım şirketinin teknik esaslarındaki katsayıları kullanın. Sayaç seçimi ve proje onayı dağıtım şirketine aittir."
      fields={[
        { key: "kombiKazanYuku_kW", label: "Kombi / Kazan Isıl Yükü (kW)", type: "number", min: 0, step: 1 },
        { key: "ocakYuku_kW", label: "Ocak / Fırın Isıl Yükü (kW)", type: "number", min: 0, step: 0.5 },
        { key: "digerCihazYuku_kW", label: "Diğer Cihazlar (şofben vb.) (kW)", type: "number", min: 0, step: 1 },
        { key: "esZamanlilikKatsayisi", label: "Eşzamanlılık Katsayısı f (0–1)", type: "number", min: 0.1, step: 0.05 },
        { key: "altIsilDeger_Hu_kWhm3", label: "Alt Isıl Değer Hu (kWh/m³)", type: "number", min: 1, step: 0.01 },
      ]}
      defaults={{
        kombiKazanYuku_kW: 24,
        ocakYuku_kW: 8,
        digerCihazYuku_kW: 0,
        esZamanlilikKatsayisi: 1,
        altIsilDeger_Hu_kWhm3: 9.59,
      }}
      mainUnit="m³/h"
      mainValueKey="gazDebisi_m3h"
      mainDecimals={2}
      intermediateLabels={{
        toplam_isil_yuk_kW: "Toplam Isıl Yük (kW)",
        es_zamanli_isil_yuk_kW: "Eşzamanlı Isıl Yük (kW)",
        onerilen_sayac: "Önerilen Sayaç",
        sayac_azami_debisi_m3h: "Sayaç Azami Debisi (m³/h)",
        sayac_doluluk_yuzde: "Sayaç Doluluk Oranı (%)",
      }}
    />
  );
}
