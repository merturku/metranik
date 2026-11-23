"use client";

import { celikKesitPlastikMoment } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CelikKesitPlastikMomentPage() {
  return (
    <CalcPage
      module={celikKesitPlastikMoment}
      standardsLabel={'TS EN 1993-1-1 §6.2.5'}
      description={'Dikdörtgen veya I kesitin elastik/plastik mukavemet momentini, şekil faktörünü ve Mpl,Rd değerini hesaplar.'}
      formula={'Wpl(dikd.) = b·h²/4;  Wpl(I) = bf·tf·(h − tf) + tw·hw²/4;  Mpl,Rd = Wpl·fy/γM0;  α = Wpl/Wel'}
      engineeringNote={'Kök yuvarlatmaları ihmal edilir ve kesitin sınıf 1–2 olduğu varsayılır; sınıf kontrolü için Çelik I Kesit Sınıflandırması modülünü kullanın. Bileşik kesit (eksenel kuvvet, kesme) etkileşimi ve yanal burulmalı burkulma dahil değildir. I kesitte b başlık genişliği, h toplam yüksekliktir.'}
      fields={[
        { key: "kesitTipi", label: "Kesit Tipi", type: "select", options: [{ value: "I", label: "I kesit" }, { value: "dikdortgen", label: "Dikdörtgen" }] },
        { key: "genislik_b_mm", label: "Genişlik / Başlık Genişliği b (mm)", type: "number", step: 5, min: 1 },
        { key: "yukseklik_h_mm", label: "Toplam Yükseklik h (mm)", type: "number", step: 5, min: 1 },
        { key: "govdeKalinligi_tw_mm", label: "Gövde Kalınlığı tw (mm, yalnız I)", type: "number", step: 1, min: 0 },
        { key: "basliKalinligi_tf_mm", label: "Başlık Kalınlığı tf (mm, yalnız I)", type: "number", step: 1, min: 0 },
        { key: "akmaDayanimi_MPa", label: "Akma Dayanımı fy (MPa)", type: "number", step: 5, min: 1 },
        { key: "gammaM0", label: "γM0", type: "number", step: 0.05, min: 1 },
      ]}
      defaults={{ kesitTipi: "I", genislik_b_mm: 150, yukseklik_h_mm: 200, govdeKalinligi_tw_mm: 6, basliKalinligi_tf_mm: 10, akmaDayanimi_MPa: 355, gammaM0: 1 }}
      mainUnit={'kN·m'}
      mainValueKey={'plastikMomentDayanimi_kNm'}
      mainDecimals={1}
      intermediateLabels={{
        Wel_mm3: "Wel (mm³)",
        Wpl_mm3: "Wpl (mm³)",
        sekil_faktoru_alfa: "Şekil faktörü α",
        elastik_moment_dayanimi_kNm: "Mel,Rd (kN·m)",
      }}
    />
  );
}
