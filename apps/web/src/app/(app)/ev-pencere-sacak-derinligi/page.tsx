"use client";

import { evPencereSacakDerinligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvPencereSacakDerinligiPage() {
  return (
    <CalcPage
      module={evPencereSacakDerinligi}
      standardsLabel="Standart atfı yok"
      description="Güneş profil açısına göre pencereyi tamamen gölgelemek için gereken saçak derinliğini ve mevcut saçağın gölgeleme oranını hesaplar."
      formula="D = (a + Hp)/tan(αp);  Gölge oranı = (D·tan(αp) − a)/Hp"
      engineeringNote="Profil açısı güneş yüksekliği ve duvar-güneş azimut farkından bulunur; güney cephede öğle için αp güneş yüksekliğidir. Yaz için gerekli derinlik yazın yüksek güneş açısıyla, kışın alçak açıyla kontrol edilir. Pencere güneş kazancı için Pencere Güneş Isı Kazancı modülüne bakın."
      fields={[
        { key: "saca_pencere_mesafesi_m", label: "Saçak–Pencere Üstü Mesafesi a (m)", type: "number", step: 0.05, min: 0 },
        { key: "pencereYuksekligi_m", label: "Pencere Yüksekliği (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "profilAcisi_derece", label: "Profil Açısı αp (°)", type: "number", step: 1, min: 1 },
        { key: "mevcutDerinlik_m", label: "Mevcut Saçak Derinliği (m)", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ saca_pencere_mesafesi_m: 0.2, pencereYuksekligi_m: 1.2, profilAcisi_derece: 60, mevcutDerinlik_m: 0.4 }}
      mainUnit="m"
      mainValueKey="gerekliDerinlik_m"
      mainDecimals={2}
      intermediateLabels={{
        golge_boyu_pencere_ustunde_m: "Pencere Üstüne Düşen Gölge (m)",
        mevcut_golgelenen_oran: "Gölgelenen Oran",
        mevcut_golgelenen_yuzde: "Gölgelenen (%)",
      }}
    />
  );
}
