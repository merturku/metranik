"use client";

import { kacisGenisligiHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KacisGenisligiHesabiPage() {
  return (
    <CalcPage
      module={kacisGenisligiHesabi}
      standardsLabel="Yönetmelik (Kaçış Kapasitesi)"
      description="Tahliye edilecek kişi sayısı ve birim genişliğin taşıyabileceği kişi kapasitesinden gerekli kaçış merdiveni/kapı genişliğini hesaplar ve mevcut genişlikle karşılaştırır."
      formula="Gerekli Genişlik = Kişi Sayısı / Birim Genişlik Kapasitesi"
      engineeringNote="Birim genişlik kapasitesi (kişi/m) bina kullanım sınıfına ve yönetmeliğe (Binaların Yangından Korunması Hakkında Yönetmelik) göre değişir; tipik değerler 100-200 kişi/m aralığındadır, projeye uygulanacak yönetmelikten teyit edilmelidir."
      fields={[
        {
          key: "kisiSayisi",
          label: "Kişi Sayısı",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "birimGenislikKapasitesi_kisi_m",
          label: "Birim Genişlik Kapasitesi (kişi/m)",
          type: "number",
          min: 10,
          step: 10,
        },
        {
          key: "mevcutGenislik_m",
          label: "Mevcut Genişlik (m)",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
      ]}
      defaults={{
        kisiSayisi: 300,
        birimGenislikKapasitesi_kisi_m: 200,
        mevcutGenislik_m: 1.8,
      }}
      mainUnit="m"
      mainValueKey="gerekliGenislik_m"
      intermediateLabels={{ genislikMarji_m: "Genişlik Marjı (m)" }}
    />
  );
}
