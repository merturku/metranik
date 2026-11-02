"use client";

import { yukKombinasyonuTasarimYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YukKombinasyonuTasarimYukuPage() {
  return (
    <CalcPage
      module={yukKombinasyonuTasarimYuku}
      standardsLabel="TS 500 §6.2 / TS EN 1990 Denklem 6.10"
      description="Sabit (ölü) ve hareketli yükten, TS 500 ve Eurocode kısmi katsayılarıyla düşey tasarım yükünü hesaplar."
      formula="TS 500: Fd = 1,4·G + 1,6·Q;   TS EN 1990: Fd = 1,35·G + 1,5·Q;   servis: G + Q"
      engineeringNote="Yükler aynı birimde girilir (kN/m², kN/m veya kN); sonuç da o birimdedir. Eurocode katsayıları önerilen değerlerdir, ulusal ekten teyit edin. Rüzgâr, kar ve deprem içeren kombinasyonlar (TBDY 2018 G+Q+E, EN 1990 6.10a/b ψ katsayıları) bu modülün kapsamı dışındadır. Hareketli yük değerleri için ilgili yük standardına (TS 498 / TS EN 1991-1-1) bakın."
      fields={[
        { key: "oluYuk", label: "Sabit (Ölü) Yük G", type: "number", min: 0, step: 1 },
        { key: "hareketliYuk", label: "Hareketli Yük Q", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ oluYuk: 20, hareketliYuk: 10 }}
      mainUnit="(yük birimi) — TS 500 tasarım yükü"
      mainValueKey="Fd_TS500"
      mainDecimals={2}
      intermediateLabels={{
        Fd_EN1990_610: "Tasarım Yükü — TS EN 1990 (6.10)",
        servis_G_Q: "Servis Yükü G+Q",
        TS500_servis_orani: "TS 500 / Servis Oranı",
        hareketli_yuk_payi_yuzde: "Hareketli Yük Payı (%)",
      }}
    />
  );
}
