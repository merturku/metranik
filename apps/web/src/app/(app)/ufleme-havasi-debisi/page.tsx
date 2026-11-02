"use client";

import { uflemeHavasiDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function UflemeHavasiDebisiPage() {
  return (
    <CalcPage
      module={uflemeHavasiDebisi}
      standardsLabel="ASHRAE Fundamentals — duyulur ısı denklemi"
      description="Mahalin duyulur soğutma (veya ısıtma) yükünü karşılamak için gereken üfleme havası debisini ve hava değişim sayısını hesaplar."
      formula="V̇ = q_s / (ρ·cp·ΔT);   ρ = 1,2 kg/m³,  cp = 1006 J/kgK"
      engineeringNote="ΔT oda ile üfleme sıcaklığı farkıdır; soğutmada difüzör türüne göre 8–12 K yaygındır (çok yüksek ΔT çeken hava hissi yaratır, Hava Akımı Rahatsızlığı modülüyle kontrol edin). Duyulur yükü Mahal İç Isı Kazancı ve Soğutma Yükü modüllerinden alın. Gizli yük ve taze hava minimumu ayrıca kontrol edilmelidir; sonuç bunların büyüğü seçilir. Deniz seviyesi dışı yerler için Rakım Hava Yoğunluğu modülüne bakın."
      fields={[
        { key: "duyulurYuk_W", label: "Duyulur Yük (W)", type: "number", min: 1, step: 100 },
        { key: "sicaklikFarki_K", label: "Oda – Üfleme Sıcaklık Farkı ΔT (K)", type: "number", min: 1, step: 1 },
        { key: "odaHacmi_m3", label: "Oda Hacmi (m³)", type: "number", min: 1, step: 5 },
      ]}
      defaults={{ duyulurYuk_W: 3000, sicaklikFarki_K: 10, odaHacmi_m3: 100 }}
      mainUnit="m³/h (üfleme debisi)"
      mainValueKey="debi_m3h"
      mainDecimals={0}
      intermediateLabels={{
        debi_m3s: "Debi (m³/s)",
        debi_Ls: "Debi (L/s)",
        kutlesel_debi_kgs: "Kütlesel Debi (kg/s)",
        hava_degisim_sayisi_ACH: "Hava Değişim Sayısı (1/h)",
      }}
    />
  );
}
