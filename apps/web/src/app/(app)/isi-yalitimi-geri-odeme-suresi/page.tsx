"use client";

import { isiYalitimiGeriOdemeSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiYalitimiGeriOdemeSuresiPage() {
  return (
    <CalcPage
      module={isiYalitimiGeriOdemeSuresi}
      standardsLabel="Fiziksel Formül"
      description="Isı yalıtımı yatırımının, azalan yıllık ısı kaybının yakıt maliyetine dönüştürülmesiyle kaç yılda kendini ödeyeceğini hesaplar."
      formula="Geri Ödeme (yıl) = Yatırım Tutarı / (Yıllık Isı Kaybı Azalması × Yakıt Fiyatı)"
      engineeringNote="Yıllık ısı kaybı azalması, yalıtımsız/yalıtımlı durum için ısı yalıtım kalınlığı hesabı (TS 825) veya pencere/duvar ısı kaybı modülüyle bulunan farktan alınabilir."
      fields={[
        {
          key: "yatirimTutari_TL",
          label: "Yatırım Tutarı (TL)",
          type: "number",
          min: 1,
          step: 100,
        },
        {
          key: "yillikIsiKaybiAzalmasi_kWh",
          label: "Yıllık Isı Kaybı Azalması (kWh)",
          type: "number",
          min: 1,
          step: 100,
        },
        {
          key: "yakitFiyati_TL_kWh",
          label: "Yakıt Fiyatı (TL/kWh)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        yatirimTutari_TL: 15000,
        yillikIsiKaybiAzalmasi_kWh: 3000,
        yakitFiyati_TL_kWh: 2,
      }}
      mainUnit="yıl"
      mainValueKey="geriOdemeSuresi_yil"
      intermediateLabels={{ yillikTasarruf_TL: "Yıllık Tasarruf (TL)" }}
    />
  );
}
