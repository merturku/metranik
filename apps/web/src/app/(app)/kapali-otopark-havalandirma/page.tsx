"use client";

import { kapaliOtoparkHavalandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KapaliOtoparkHavalandirmaPage() {
  return (
    <CalcPage
      module={kapaliOtoparkHavalandirma}
      standardsLabel="CO Seyreltme Yöntemi"
      description="Kapalı otoparkta araçların ürettiği karbon monoksiti izin verilen sınırın altında tutmak için gerekli havalandırma debisini, kirletici seyreltme (dilüsyon) prensibiyle hesaplar."
      formula="Q = (Araç Sayısı × Araç Başı CO Üretimi) / (İzin Verilen CO - Dış Ortam CO)"
      engineeringNote="Basit hava değişimi (ACH) yerine kirletici bazlı seyreltme kullanılır (ASHRAE 62.1 / NFPA 88A ruhu); araç başı CO üretimi araç tipine, motor sıcaklığına ve trafik yoğunluğuna göre büyük ölçüde değişir, yerel yönetmelik/CO sensörlü kademeli kontrol tercih edilebilir."
      fields={[
        {
          key: "aracSayisi",
          label: "Araç Sayısı",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "aracBasiCOUretimi_m3h",
          label: "Araç Başı CO Üretimi (m³/h)",
          type: "number",
          min: 0.0001,
          step: 0.0001,
        },
        {
          key: "izinVerilenCO_ppm",
          label: "İzin Verilen CO (ppm)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "disOrtamCO_ppm",
          label: "Dış Ortam CO (ppm)",
          type: "number",
          min: 0,
          step: 1,
        },
      ]}
      defaults={{
        aracSayisi: 50,
        aracBasiCOUretimi_m3h: 0.001,
        izinVerilenCO_ppm: 35,
        disOrtamCO_ppm: 5,
      }}
      mainUnit="m³/h"
      mainValueKey="gerekliDebi_m3h"
      intermediateLabels={{
        toplamCOUretimi_m3h: "Toplam CO Üretimi (m³/h)",
        derisimFarki_ppm: "Derişim Farkı (ppm)",
      }}
    />
  );
}
