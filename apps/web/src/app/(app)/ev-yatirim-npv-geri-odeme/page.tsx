"use client";

import { evYatirimNpvGeriOdeme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvYatirimNpvGeriOdemePage() {
  return (
    <CalcPage
      module={evYatirimNpvGeriOdeme}
      standardsLabel="Mühendislik ekonomisi"
      description="Sabit yıllık tasarruflu bir enerji/tasarruf yatırımının net bugünkü değerini, iskontolu geri ödemesini ve iç verim oranını hesaplar."
      formula="NPV = −I + S·[1 − (1 + r)^(−n)]/r;  iskontolu geri ödeme = −ln(1 − I·r/S)/ln(1 + r)"
      engineeringNote="Yıllık tasarruf sabit ve yıl sonu ödemeli kabul edilir; fiyat artışı varsa reel iskonto oranı kullanın. Basit geri ödeme modülleri (güneş paneli, yalıtım, LED) iskontoyu dikkate almaz; bu modül onları tamamlar. IRR, NPV'nin sıfır olduğu iskonto oranıdır."
      fields={[
        { key: "yatirim_TL", label: "Yatırım Bedeli (₺)", type: "number", step: 1000, min: 1 },
        { key: "yillikTasarruf_TL", label: "Yıllık Tasarruf (₺)", type: "number", step: 500, min: 1 },
        { key: "iskontoOrani_yuzde", label: "İskonto Oranı (%)", type: "number", step: 0.5, min: 0 },
        { key: "omur_yil", label: "Ekonomik Ömür (yıl)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ yatirim_TL: 100000, yillikTasarruf_TL: 20000, iskontoOrani_yuzde: 10, omur_yil: 10 }}
      mainUnit="₺"
      mainValueKey="netBugunkuDeger_TL"
      mainDecimals={0}
      intermediateLabels={{
        basit_geri_odeme_yil: "Basit Geri Ödeme (yıl)",
        iskontolu_geri_odeme_yil: "İskontolu Geri Ödeme (yıl)",
        ic_verim_orani_yuzde: "İç Verim Oranı IRR (%)",
        karlilik_endeksi: "Karlılık Endeksi",
        toplam_nominal_tasarruf_TL: "Toplam Nominal Tasarruf (₺)",
      }}
    />
  );
}
