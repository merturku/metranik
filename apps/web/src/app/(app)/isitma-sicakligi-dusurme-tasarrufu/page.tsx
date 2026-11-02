"use client";

import { isitmaSicakligiDusurmeTasarrufu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsitmaSicakligiDusurmeTasarrufuPage() {
  return (
    <CalcPage
      module={isitmaSicakligiDusurmeTasarrufu}
      standardsLabel="Isı kaybı ∝ ΔT (TS 825 iletim ve havalandırma kaybı)"
      description="İç sıcaklık ayarını düşürmenin yıllık ısıtma enerjisinde ve maliyette sağlayacağı tasarrufu hesaplar."
      formula="Tasarruf = (Ti − Ti') / (Ti − Te,ort)"
      engineeringNote="Isı kaybının iç–dış sıcaklık farkıyla orantılı olduğu doğrusal modeldir; güneş ve iç kazançlar, ısı ataleti ve kısmi mekan ısıtma ihmal edilir. Te,ort ısıtma sezonu ortalama dış sıcaklığıdır (derece-gün verisinden). Orta iklimde °C başına yaklaşık %6–7 tasarruf bu bağıntının sonucudur. Konfor için Ev Sıcaklık Konfor Kontrolü (PMV/PPD) modülüyle birlikte değerlendirin."
      fields={[
        { key: "mevcutIcSicaklik_C", label: "Mevcut İç Sıcaklık (°C)", type: "number", min: 10, step: 0.5 },
        { key: "yeniIcSicaklik_C", label: "Yeni İç Sıcaklık (°C)", type: "number", min: 10, step: 0.5 },
        { key: "sezonOrtalamaDisSicaklik_C", label: "Sezon Ortalama Dış Sıcaklık (°C)", type: "number", step: 1 },
        { key: "yillikIsitmaEnerjisi_kWh", label: "Yıllık Isıtma Enerjisi (kWh)", type: "number", min: 1, step: 500 },
        { key: "birimEnerjiFiyati_TLkWh", label: "Birim Enerji Fiyatı (₺/kWh)", type: "number", min: 0, step: 0.1 },
      ]}
      defaults={{ mevcutIcSicaklik_C: 22, yeniIcSicaklik_C: 21, sezonOrtalamaDisSicaklik_C: 7, yillikIsitmaEnerjisi_kWh: 15000, birimEnerjiFiyati_TLkWh: 2 }}
      mainUnit="% (yıllık ısıtma tasarrufu)"
      mainValueKey="tasarrufOrani_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        sicaklik_dusurmesi_K: "Sıcaklık Düşürme (K)",
        yillik_enerji_tasarrufu_kWh: "Yıllık Enerji Tasarrufu (kWh)",
        yillik_para_tasarrufu_TL: "Yıllık Para Tasarrufu (₺)",
        derece_basina_tasarruf_yuzde: "°C Başına Tasarruf (%)",
        yeni_yillik_enerji_kWh: "Yeni Yıllık Enerji (kWh)",
      }}
    />
  );
}
