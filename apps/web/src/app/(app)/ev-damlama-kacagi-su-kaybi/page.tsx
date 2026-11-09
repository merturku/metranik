"use client";

import { evDamlamaKacagiSuKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvDamlamaKacagiSuKaybiPage() {
  return (
    <CalcPage
      module={evDamlamaKacagiSuKaybi}
      standardsLabel="Standart atfı yok"
      description="Damlayan musluk veya rezervuar kaçağından günlük ve yıllık su kaybını ve maliyetini hesaplar."
      formula="mL/dk = damla/dk × damla hacmi;  L/gün = mL/dk × 1,44;  L/yıl = L/gün × 365"
      engineeringNote="Tipik damla hacmi ≈ 0,05 mL (20 damla/mL). Sürekli ince akıntıda ölçülen debiyi (mL/dk) damla sayısı olarak, damla hacmini 1 mL girerek kullanın. Sıcak su kaçağında ayrıca ısıtma enerjisi kaybı vardır."
      fields={[
        { key: "damlaSayisi_dk", label: "Damla Sayısı (damla/dk)", type: "number", step: 5, min: 0 },
        { key: "damlaHacmi_mL", label: "Damla Hacmi (mL)", type: "number", step: 0.01, min: 0.001 },
        { key: "suBirimFiyati_TLm3", label: "Su + Atık Su Bedeli (₺/m³)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ damlaSayisi_dk: 60, damlaHacmi_mL: 0.05, suBirimFiyati_TLm3: 50 }}
      mainUnit="L/yıl"
      mainValueKey="yillikKayip_L"
      mainDecimals={0}
      intermediateLabels={{
        kacak_debisi_mL_dk: "Kaçak Debisi (mL/dk)",
        gunluk_kayip_L: "Günlük Kayıp (L)",
        yillik_kayip_m3: "Yıllık Kayıp (m³)",
        yillik_maliyet_TL: "Yıllık Maliyet (₺)",
      }}
    />
  );
}
