"use client";

import { pvHucreSicakligiGuc } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PvHucreSicakligiGucPage() {
  return (
    <CalcPage
      module={pvHucreSicakligiGuc}
      standardsLabel="IEC 61215 (NOCT) / IEC 61853 — PV modül güç-sıcaklık ilişkisi"
      description="Işınım ve ortam sıcaklığından PV hücre sıcaklığını bulur; sıcaklık katsayısıyla gerçek çıkış gücünü ve sıcaklık kaybını hesaplar."
      formula="Thücre = Tortam + (NOCT − 20)/800 · G;   P = Pstc · (G/1000) · [1 + γ·(Thücre − 25)]"
      engineeringNote="NOCT ve güç sıcaklık katsayısı γ (kristal silisyumda tipik −0,3…−0,4 %/K) modülün veri sayfasından alınır. NOCT modeli rüzgarsız-hafif rüzgar koşulu içindir; çatıya yakın montajda hücre daha sıcak olur. Kablo, invertör, kirlenme ve yaşlanma kayıtları dahil değildir (bkz. GES Panel Yıllık Enerji Üretimi)."
      fields={[
        { key: "pstc_W", label: "STC Panel Gücü Pstc (W)", type: "number", min: 1, step: 10 },
        { key: "isinim_Wm2", label: "Panel Düzlemi Işınımı G (W/m²)", type: "number", min: 0, step: 50 },
        { key: "ortamSicakligi_C", label: "Ortam Sıcaklığı (°C)", type: "number", min: -50, step: 1 },
        { key: "noct_C", label: "NOCT (°C)", type: "number", min: 35, step: 1 },
        { key: "gucSicaklikKatsayisi_1K", label: "Güç Sıcaklık Katsayısı γ (1/K, negatif)", type: "number", min: -0.01, step: 0.0005 },
      ]}
      defaults={{ pstc_W: 400, isinim_Wm2: 800, ortamSicakligi_C: 30, noct_C: 45, gucSicaklikKatsayisi_1K: -0.0035 }}
      mainUnit="W (gerçek çıkış gücü)"
      mainValueKey="guc_W"
      mainDecimals={1}
      intermediateLabels={{
        hucre_sicakligi_C: "Hücre Sıcaklığı (°C)",
        sicaklik_carpani: "Sıcaklık Çarpanı",
        sicaklik_kaybi_W: "Sıcaklık Kaybı (W)",
        sicaklik_kaybi_yuzde: "Sıcaklık Kaybı (%)",
      }}
    />
  );
}
