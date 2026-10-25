"use client";

import { elektrikBorusuDolulukOrani } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ElektrikBorusuDolulukOraniPage() {
  return (
    <CalcPage
      module={elektrikBorusuDolulukOrani}
      standardsLabel="NEC Bölüm 9 Tablo 1"
      description="Elektrik borusu (spiral, PVC veya çelik konduit) içinden geçirilecek kabloların kesit doluluk oranını hesaplar, kablo sayısına göre izin verilen oranla karşılaştırır ve gereken en küçük boru iç çapını verir."
      formula="Doluluk = n·d² / D²,   sınır: 1 kablo %53 · 2 kablo %31 · 3+ kablo %40,   Dmin = d·√(n / sınır)"
      engineeringNote="D borunun iç çapıdır (M20, M25 gibi anma çapı dış çaptır; iç çapı üretici tablosundan alın). d, yalıtımlı kablonun dış çapıdır. Oranlar ABD NEC'den alınmıştır ve kabloların çekilebilmesi ile ısı atımı için yaygın kabul görür. Uzun hatlarda ve çok dirsekte (iki çekme kutusu arasında toplam 360°'yi aşmayın) daha düşük doluluk tercih edin. Aynı boruda farklı çaplı kablolar varsa her birinin kesitini toplayıp boru kesitine bölün."
      fields={[
        { key: "boruIcCapi_D_mm", label: "Boru İç Çapı D (mm)", type: "number", min: 1, step: 1 },
        { key: "kabloDisCapi_d_mm", label: "Kablo Dış Çapı d (mm)", type: "number", min: 0.5, step: 0.5 },
        { key: "kabloSayisi", label: "Kablo Sayısı n", type: "number", min: 1, step: 1 },
      ]}
      defaults={{
        boruIcCapi_D_mm: 20,
        kabloDisCapi_d_mm: 6,
        kabloSayisi: 4,
      }}
      mainUnit="% doluluk"
      mainValueKey="dolulukOrani_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        izin_verilen_oran_yuzde: "İzin Verilen Oran (%)",
        gereken_en_kucuk_ic_cap_mm: "Gereken En Küçük İç Çap (mm)",
        bu_boruya_3_ve_uzeri_azami_kablo: "Bu Boruya Azami Kablo (3+)",
      }}
    />
  );
}
