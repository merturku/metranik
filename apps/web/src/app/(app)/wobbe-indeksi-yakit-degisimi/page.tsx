"use client";

import { wobbeIndeksiYakitDegisimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function WobbeIndeksiYakitDegisimiPage() {
  return (
    <CalcPage
      module={wobbeIndeksiYakitDegisimi}
      standardsLabel={'TS EN 437'}
      description={'Referans ve yeni gazın üst ısıl değer ve bağıl yoğunluğundan Wobbe indekslerini ve brülör ısıl gücündeki değişimi hesaplar.'}
      formula={'W = Hs/√d;  Q2/Q1 = W2/W1 (aynı basınç ve enjektör)'}
      engineeringNote={'Wobbe indeksi yalnız ısıl güç eşdeğerliğini verir; yanma hızı, geri tepme ve sarı uç eğilimi ayrı kontrol gerektirir. İzin verilen sapma cihaz ailesine ve üreticiye göre belirlenir; sınırı standarttan teyit edin.'}
      fields={[
        { key: "referansUstIsilDeger_MJm3", label: "Referans Gaz Hs (MJ/m³)", type: "number", step: 0.1, min: 1 },
        { key: "referansBagilYogunluk", label: "Referans Bağıl Yoğunluk d", type: "number", step: 0.01, min: 0.1 },
        { key: "yeniUstIsilDeger_MJm3", label: "Yeni Gaz Hs (MJ/m³)", type: "number", step: 0.1, min: 1 },
        { key: "yeniBagilYogunluk", label: "Yeni Bağıl Yoğunluk d", type: "number", step: 0.01, min: 0.1 },
        { key: "izinVerilenSapma_yuzde", label: "İzin Verilen Wobbe Sapması (%)", type: "number", step: 0.5, min: 0.5 },
      ]}
      defaults={{ referansUstIsilDeger_MJm3: 39.9, referansBagilYogunluk: 0.555, yeniUstIsilDeger_MJm3: 45.7, yeniBagilYogunluk: 0.65, izinVerilenSapma_yuzde: 5 }}
      mainUnit={'MJ/m³'}
      mainValueKey={'yeniWobbe_MJm3'}
      mainDecimals={2}
      intermediateLabels={{
        referans_Wobbe_MJm3: "Referans Wobbe (MJ/m³)",
        Wobbe_sapmasi_yuzde: "Wobbe Sapması (%)",
        isil_guc_orani: "Isıl Güç Oranı W2/W1",
      }}
    />
  );
}
