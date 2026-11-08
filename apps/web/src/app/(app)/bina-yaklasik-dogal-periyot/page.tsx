"use client";

import { binaYaklasikDogalPeriyot } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BinaYaklasikDogalPeriyotPage() {
  return (
    <CalcPage
      module={binaYaklasikDogalPeriyot}
      standardsLabel="TBDY 2018 (teyit edin)"
      description="Bina yüksekliğinden ampirik bağıntıyla yaklaşık birinci doğal titreşim periyodunu ve frekansını hesaplar."
      formula="T ≈ Ct·HN^(3/4);  kaba kural T ≈ 0,1·N"
      engineeringNote="Ct yapı sistemine bağlıdır (çerçeveli betonarme ≈ 0,07, çelik çerçeve ≈ 0,08, perdeli/diğer ≈ 0,05); yönetmelikten teyit edin. Elastik Tasarım Spektrumu modülünün T girdisi için ön değerdir; kesin periyot modal analizden alınır."
      fields={[
        { key: "katsayiCt", label: "Katsayı Ct", type: "number", step: 0.01, min: 0.01 },
        { key: "binaYuksekligi_m", label: "Bina Yüksekliği HN (m)", type: "number", step: 1, min: 1 },
        { key: "katSayisi", label: "Kat Sayısı N", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ katsayiCt: 0.07, binaYuksekligi_m: 30, katSayisi: 10 }}
      mainUnit="s"
      mainValueKey="periyot_s"
      mainDecimals={3}
      intermediateLabels={{
        HN_uzeri_0_75: "HN^0,75",
        kaba_kural_T_0_1N_s: "Kaba Kural T = 0,1N (s)",
        dogal_frekans_Hz: "Doğal Frekans (Hz)",
        ortalama_kat_yuksekligi_m: "Ortalama Kat Yüksekliği (m)",
      }}
    />
  );
}
