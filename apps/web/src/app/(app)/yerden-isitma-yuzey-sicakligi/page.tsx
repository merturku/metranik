"use client";

import { yerdenIsitmaYuzeySicakligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YerdenIsitmaYuzeySicakligiPage() {
  return (
    <CalcPage
      module={yerdenIsitmaYuzeySicakligi}
      standardsLabel="TS EN 1264-2"
      description="Yerden ısıtmalı bir mahallin ısı kaybını karşılamak için gereken döşeme ısı akısından ortalama döşeme yüzey sıcaklığını hesaplar ve EN 1264'ün oturma, kenar ve banyo bölgeleri için verdiği yüzey sıcaklığı sınırlarıyla karşılaştırır."
      formula="q = Q / Aaktif,   θF,m = θi + (q / 8,92)^(1/1,1),   qG = 8,92 × (θF,maks − θi)^1,1"
      engineeringNote="Temel karakteristik eğri yüzeyden odaya ısı geçişini tanımlar ve döşeme kaplamasından bağımsızdır; kaplama direnci yalnız gereken su sıcaklığını artırır. Yüzey sıcaklığı sınırları konfor/sağlık içindir: oturma bölgesi 29 °C, dış duvar boyunca en fazla 1 m genişlikteki kenar bölgesi 35 °C, banyo θi + 9 K. Sınır aşılıyorsa önce yapı kabuğu iyileştirilmeli, kenar bölgesinde boru sıklaştırılmalı veya ek ısıtıcı eklenmelidir. Aktif alan, mobilya ve sabit dolapların altındaki ısıtılmayan alanlar çıkarılarak girilmelidir."
      fields={[
        { key: "isiKaybi_W", label: "Mahal Isı Kaybı Q (W)", type: "number", min: 1, step: 100 },
        { key: "aktifDosemeAlani_m2", label: "Aktif Isıtılan Döşeme Alanı (m²)", type: "number", min: 0.5, step: 1 },
        { key: "odaSicakligi_C", label: "İç Ortam Sıcaklığı θi (°C)", type: "number", min: 5, step: 1 },
        {
          key: "bolge",
          label: "Döşeme Bölgesi",
          type: "select",
          options: [
            { value: "oturma", label: "Oturma bölgesi (29 °C)" },
            { value: "kenar", label: "Kenar bölgesi (35 °C)" },
            { value: "banyo", label: "Banyo (θi + 9 K)" },
          ],
        },
      ]}
      defaults={{
        isiKaybi_W: 1400,
        aktifDosemeAlani_m2: 20,
        odaSicakligi_C: 20,
        bolge: "oturma",
      }}
      mainUnit="°C (θF,m)"
      mainValueKey="ortalamaYuzeySicakligi_C"
      mainDecimals={1}
      intermediateLabels={{
        isi_akisi_q_Wm2: "Gereken Isı Akısı q (W/m²)",
        yuzey_oda_sicaklik_farki_K: "Yüzey − Oda Sıcaklık Farkı (K)",
        sinir_yuzey_sicakligi_C: "Sınır Yüzey Sıcaklığı (°C)",
        sinir_isi_akisi_qG_Wm2: "Sınır Isı Akısı qG (W/m²)",
      }}
    />
  );
}
