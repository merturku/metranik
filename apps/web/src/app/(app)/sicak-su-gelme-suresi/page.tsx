"use client";

import { sicakSuGelmeSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SicakSuGelmeSuresiPage() {
  return (
    <CalcPage
      module={sicakSuGelmeSuresi}
      standardsLabel={'Hidrolik süreklilik'}
      description={'Sıcak su borusunun içindeki soğumuş suyun boşalma süresini, boşa giden su miktarını ve yıllık maliyeti hesaplar.'}
      formula={'V = π·D²·L/4;  t = V/Q'}
      engineeringNote={'Boru ve çevresinin ısıl kütlesi ihmal edildiğinden gerçek süre daha uzundur. Süre sınırı yerel şartname veya üretici önerisinden alınmalıdır. Sirkülasyon hattı veya yerel ısıtıcı ile süre kısaltılabilir.'}
      fields={[
        { key: "boruIcCapi_mm", label: "Boru İç Çapı (mm)", type: "number", step: 1, min: 1 },
        { key: "boruUzunlugu_m", label: "Boru Uzunluğu (m)", type: "number", step: 1, min: 0.5 },
        { key: "musluk_debisi_Ldk", label: "Musluk Debisi (L/dk)", type: "number", step: 0.5, min: 0.5 },
        { key: "gunlukKullanimSayisi", label: "Günlük Kullanım Sayısı", type: "number", step: 1, min: 0 },
        { key: "suBirimFiyati_TLm3", label: "Su Birim Fiyatı (₺/m³)", type: "number", step: 1, min: 0 },
        { key: "izinVerilenSure_s", label: "İzin Verilen Süre (s)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ boruIcCapi_mm: 16, boruUzunlugu_m: 20, musluk_debisi_Ldk: 6, gunlukKullanimSayisi: 10, suBirimFiyati_TLm3: 50, izinVerilenSure_s: 30 }}
      mainUnit={'s'}
      mainValueKey={'gelmeSuresi_s'}
      mainDecimals={1}
      intermediateLabels={{
        boru_ici_hacim_L: "Boru İçi Hacim (L)",
        boru_ici_hiz_ms: "Boru İçi Hız (m/s)",
        yillik_bosa_giden_su_m3: "Yıllık Boşa Giden Su (m³)",
        yillik_maliyet_TL: "Yıllık Maliyet (₺)",
      }}
    />
  );
}
