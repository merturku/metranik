"use client";

import { donatiBindirmeBoyu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DonatiBindirmeBoyuPage() {
  return (
    <CalcPage
      module={donatiBindirmeBoyu}
      standardsLabel={'TS EN 1992-1-1 §8.7.3'}
      description={'Temel kenetlenme boyundan bindirme (ek) boyunu, α6 katsayısını ve asgari sınırları hesaplar.'}
      formula={'l0 = α1·α2·α3·α5·α6·lb,rqd ≥ max(0,3·α6·lb,rqd; 15φ; 200 mm);  α6 = √(ρ1/25), 1 ≤ α6 ≤ 1,5'}
      engineeringNote={'lb,rqd değerini Donatı Kenetlenme Boyu modülünden alın. α1, α2, α3, α5 katsayılarının çarpımı çubuk şekli, paspayı, enine donatı ve basınç etkisine göre EC2 Tablo 8.2\'den girilir. TS 500 bindirme kuralları farklıdır; ulusal ek ve TBDY 2018 süneklik bölgesi koşullarını ayrıca kontrol edin.'}
      fields={[
        { key: "temelKenetlenmeBoyu_mm", label: "Temel Kenetlenme Boyu lb,rqd (mm)", type: "number", step: 10, min: 1 },
        { key: "capi_mm", label: "Donatı Çapı φ (mm)", type: "number", step: 2, min: 1 },
        { key: "bindirilenOrani_yuzde", label: "Bindirilen Çubuk Oranı ρ1 (%)", type: "number", step: 5, min: 0 },
        { key: "digerKatsayilarCarpimi", label: "α1·α2·α3·α5 Çarpımı", type: "number", step: 0.05, min: 0.1 },
      ]}
      defaults={{ temelKenetlenmeBoyu_mm: 600, capi_mm: 16, bindirilenOrani_yuzde: 50, digerKatsayilarCarpimi: 1 }}
      mainUnit={'mm'}
      mainValueKey={'bindirmeBoyu_mm'}
      mainDecimals={0}
      intermediateLabels={{
        alfa6: "α6",
        hesaplanan_l0_mm: "Hesaplanan l0 (mm)",
        asgari_l0min_mm: "Asgari l0,min (mm)",
        bindirme_boyu_cap_kati: "l0/φ",
        asgari_belirleyici: "Belirleyici",
      }}
    />
  );
}
