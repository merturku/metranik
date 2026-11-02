"use client";

import { yanginYukuYogunlugu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanginYukuYogunluguPage() {
  return (
    <CalcPage
      module={yanginYukuYogunlugu}
      standardsLabel="TS EN 1991-1-2 Ek E — yangın yükü yoğunluğu"
      description="Mahaldeki yanıcı malzemelerin kütle ve ısıl değerinden birim zemin alanı başına yangın yükünü (MJ/m²) ve odun eşdeğerini hesaplar."
      formula="q_f = Σ(m_i·H_i) / A_f   [MJ/m²];   odun eşdeğeri = q_f/17,5 kg/m²"
      engineeringNote="Isıl değerler (MJ/kg): odun/selüloz yaklaşık 17,5; plastikler 30–45 (EN 1991-1-2 Tablo E.3 veya ürün verisi). Bu modül risk sınıfı veya güvenlik katsayısı uygulamaz; yangın direnci ve sprinkler tasarımı için yönetmelik eşikleri ve tehlike sınıfı ayrıca değerlendirilmelidir. İkinci malzeme kullanılmayacaksa kütleyi 0 girin."
      fields={[
        { key: "malzeme1Kutlesi_kg", label: "Malzeme 1 Kütlesi (kg)", type: "number", min: 0, step: 50 },
        { key: "malzeme1IsilDegeri_MJkg", label: "Malzeme 1 Isıl Değeri (MJ/kg)", type: "number", min: 0, step: 0.5 },
        { key: "malzeme2Kutlesi_kg", label: "Malzeme 2 Kütlesi (kg)", type: "number", min: 0, step: 50 },
        { key: "malzeme2IsilDegeri_MJkg", label: "Malzeme 2 Isıl Değeri (MJ/kg)", type: "number", min: 0, step: 0.5 },
        { key: "zeminAlani_m2", label: "Zemin Alanı (m²)", type: "number", min: 1, step: 5 },
      ]}
      defaults={{ malzeme1Kutlesi_kg: 500, malzeme1IsilDegeri_MJkg: 17.5, malzeme2Kutlesi_kg: 100, malzeme2IsilDegeri_MJkg: 40, zeminAlani_m2: 50 }}
      mainUnit="MJ/m² (yangın yükü yoğunluğu)"
      mainValueKey="yanginYuku_MJm2"
      mainDecimals={0}
      intermediateLabels={{
        toplam_enerji_MJ: "Toplam Enerji (MJ)",
        malzeme1_enerji_MJ: "Malzeme 1 Enerjisi (MJ)",
        malzeme2_enerji_MJ: "Malzeme 2 Enerjisi (MJ)",
        odun_esdegeri_kgm2: "Odun Eşdeğeri (kg/m²)",
        toplam_enerji_kWh: "Toplam Enerji (kWh)",
      }}
    />
  );
}
