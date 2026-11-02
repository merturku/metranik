"use client";

import { sogutmaKulesiMakyajSuyu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SogutmaKulesiMakyajSuyuPage() {
  return (
    <CalcPage
      module={sogutmaKulesiMakyajSuyu}
      standardsLabel="ASHRAE HVAC Systems and Equipment — soğutma kuleleri (kütle/enerji dengesi)"
      description="Soğutma kulesinin buharlaşma, blöf ve sürüklenme kayıplarını ve toplam makyaj suyu ihtiyacını hesaplar."
      formula="E = Q·ρ·cp·Range/h_fg;   B + D = E/(COC − 1);   M = E + B + D = E·COC/(COC − 1)"
      engineeringNote="h_fg ≈ 2430 kJ/kg ve cp = 4,186 kJ/kgK alınmıştır. Range, kule giriş–çıkış su sıcaklık farkıdır. Yoğunlaşma çevrimi (COC) makyaj suyu kalitesine ve kireçlenme/korozyon sınırına göre belirlenir (genelde 3–6). Sürüklenme kaybı damlacık tutucu özelliğidir (modern kulelerde %0,005–0,02); blöf bundan büyükse negatif olamayacağı için sıfıra sınırlanır. Kule kapasite kontrolü için Soğutma Kulesi Kapasitesi Kontrolü modülüne bakın."
      fields={[
        { key: "dolasimDebisi_m3h", label: "Dolaşım Su Debisi (m³/h)", type: "number", min: 1, step: 10 },
        { key: "rangeSicakligi_K", label: "Range — Giriş/Çıkış Sıcaklık Farkı (K)", type: "number", min: 0.5, step: 0.5 },
        { key: "yogunlasmaCevrimi", label: "Yoğunlaşma Çevrimi COC", type: "number", min: 1.1, step: 0.5 },
        { key: "suruklenmeYuzde", label: "Sürüklenme Kaybı (% dolaşım)", type: "number", min: 0, step: 0.005 },
      ]}
      defaults={{ dolasimDebisi_m3h: 100, rangeSicakligi_K: 5, yogunlasmaCevrimi: 4, suruklenmeYuzde: 0.005 }}
      mainUnit="m³/h (toplam makyaj suyu)"
      mainValueKey="makyajSuyu_m3h"
      mainDecimals={2}
      intermediateLabels={{
        buharlasma_m3h: "Buharlaşma (m³/h)",
        blof_m3h: "Blöf (m³/h)",
        suruklenme_m3h: "Sürüklenme (m³/h)",
        makyaj_yuzde_dolasim: "Makyaj / Dolaşım (%)",
        gunluk_makyaj_m3_24h: "24 Saatlik Makyaj (m³)",
      }}
    />
  );
}
