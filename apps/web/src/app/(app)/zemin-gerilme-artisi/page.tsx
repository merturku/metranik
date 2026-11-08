"use client";

import { zeminGerilmeArtisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminGerilmeArtisiPage() {
  return (
    <CalcPage
      module={zeminGerilmeArtisi}
      standardsLabel="Klasik zemin mekaniği (standart atfı yok)"
      description="Temel yükünün zeminde z derinliğinde oluşturduğu düşey gerilme artışını 2:1 yayılma veya Boussinesq noktasal yük çözümüyle hesaplar."
      formula="2:1 → Δσ = P/((B+z)(L+z));   Boussinesq → Δσ = 3P/(2π·z²)·[1/(1+(r/z)²)]^(5/2)"
      engineeringNote="2:1 yöntemi temel altı merkez için kaba bir ön değerdir. Boussinesq noktasal yükün yatay mesafedeki etkisini verir; geniş temelde yükü parçalara bölüp üst üste bindirin (süperpozisyon). Konsolidasyon ve elastik oturma modüllerine bu gerilim girdi olarak verilebilir. Yatay mesafe yalnız Boussinesq için kullanılır; B ve L yalnız 2:1 için."
      fields={[
        { key: "yontem", label: "Yöntem", type: "select", options: [{ value: "iki-bir", label: "2:1 yayılma (dikdörtgen temel)" }, { value: "boussinesq", label: "Boussinesq (noktasal yük)" }] },
        { key: "yuk_kN", label: "Yük P (kN)", type: "number", step: 10, min: 0.1 },
        { key: "genislik_B_m", label: "Temel Genişliği B (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "uzunluk_L_m", label: "Temel Uzunluğu L (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "derinlik_z_m", label: "Derinlik z (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "yatayMesafe_r_m", label: "Yatay Mesafe r (m, Boussinesq)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ yontem: "iki-bir", yuk_kN: 1000, genislik_B_m: 2, uzunluk_L_m: 2, derinlik_z_m: 2, yatayMesafe_r_m: 0 }}
      mainUnit="kPa"
      mainValueKey="gerilmeArtisi_kPa"
      mainDecimals={2}
      intermediateLabels={{
        temel_basinci_kPa: "Temel Basıncı q₀ (kPa)",
        yayilmis_alan_m2: "Yayılmış Alan (m²)",
        gerilme_orani_Ds_q0: "Δσ / q₀",
        etki_katsayisi_IB: "Etki Katsayısı I_B",
        r_z_orani: "r / z",
      }}
    />
  );
}
