"use client";

import { kanalAskiMalzemeMetraji } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalAskiMalzemeMetrajiPage() {
  return (
    <CalcPage
      module={kanalAskiMalzemeMetraji}
      standardsLabel="SMACNA"
      description="Düz kanal hattında SMACNA pratiğine göre asgari askı aralığından yola çıkarak askı adedini ve gerekli askı malzemesi (kayış/çubuk) metrajını hesaplar."
      formula="Adet = ⌈L/S⌉ + 1, Malzeme = Adet × (Çevre + Pay)"
      engineeringNote="Maksimum askı aralığı SMACNA HVAC Duct Construction Standards pratiğinden (yaygın olarak ~3.0 m) alınır; ağır/büyük kesitli kanallarda üretici/proje şartnamesindeki daha sık aralık esas alınmalıdır."
      fields={[
        {
          key: "kanalUzunlugu_L_m",
          label: "Kanal Uzunluğu L (m)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "maksimumAskiAraligi_S_m",
          label: "Maksimum Askı Aralığı S (m)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "kanalCevresi_P_m",
          label: "Kanal Çevresi P (m)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "baglamaPayi_m",
          label: "Bağlama Payı (m)",
          type: "number",
          min: 0,
          step: 0.1,
        },
      ]}
      defaults={{
        kanalUzunlugu_L_m: 30,
        maksimumAskiAraligi_S_m: 3,
        kanalCevresi_P_m: 1.0,
        baglamaPayi_m: 0.3,
      }}
      mainUnit="m"
      mainValueKey="toplamAskiMalzemesi_m"
      intermediateLabels={{
        askiAdedi: "Askı Adedi",
        askiBasinaMalzeme_m: "Askı Başına Malzeme (m)",
      }}
    />
  );
}
