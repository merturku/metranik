"use client";

import { depremKatAgirligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DepremKatAgirligiPage() {
  return (
    <CalcPage
      module={depremKatAgirligi}
      standardsLabel={"TBDY 2018 (kütle tanımı)"}
      description={"Sabit yük (G) ve hareketli yükten (Q) deprem hesabında kullanılan kat ağırlığını, hareketli yük katılım katsayısı n ile hesaplar ve bina toplam ağırlığını verir."}
      formula={"wi = Gi + n·Qi;  W = Σwi"}
      engineeringNote={"Hareketli yük katılım katsayısı n bina kullanım türüne bağlıdır (konut, ofis, okul için 0,30; depo, otopark, çatı katı için daha büyük). Değeri TBDY 2018 ilgili tablosundan teyit ederek girin. Çatı katında kar yükü ayrıca ele alınmalıdır. Toplam ağırlık, Deprem Taban Kesme modülünün girdisidir."}
      fields={[
        { key: "g_kN", label: "Tipik Kat Sabit Yükü G (kN)", type: "number", step: 100, min: 0 },
        { key: "q_kN", label: "Tipik Kat Hareketli Yükü Q (kN)", type: "number", step: 50, min: 0 },
        { key: "n", label: "Hareketli Yük Katılım Katsayısı n", type: "number", step: 0.05, min: 0 },
        { key: "katSayisi", label: "Kat Sayısı", type: "number", step: 1, min: 1 },
        { key: "catiG_kN", label: "Çatı Katı Sabit Yükü (kN)", type: "number", step: 100, min: 0 },
        { key: "catiQ_kN", label: "Çatı Katı Hareketli Yükü (kN)", type: "number", step: 50, min: 0 },
      ]}
      defaults={{ g_kN: 5000, q_kN: 1000, n: 0.3, katSayisi: 5, catiG_kN: 3500, catiQ_kN: 400 }}
      mainUnit={"kN"}
      mainValueKey={"toplamAgirlik_kN"}
      mainDecimals={0}
      intermediateLabels={{
        tipik_kat_agirligi_kN: "Tipik Kat Ağırlığı (kN)",
        cati_agirligi_kN: "Çatı Katı Ağırlığı (kN)",
        tipik_kat_toplami_kN: "Tipik Katlar Toplamı (kN)",
      }}
    />
  );
}
