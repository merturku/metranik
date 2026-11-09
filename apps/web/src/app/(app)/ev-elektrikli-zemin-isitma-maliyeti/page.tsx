"use client";

import { evElektrikliZeminIsitmaMaliyeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvElektrikliZeminIsitmaMaliyetiPage() {
  return (
    <CalcPage
      module={evElektrikliZeminIsitmaMaliyeti}
      standardsLabel="Standart atfı yok"
      description="Elektrikli yerden ısıtma matının kurulu gücünü, aylık enerji tüketimini ve maliyetini hesaplar."
      formula="P = q·A;  E = P·t·λ·gün;  Maliyet = E·fiyat"
      engineeringNote="Güç yoğunluğu yalıtıma ve ısı kaybına göre seçilir (ana ısıtmada tipik 100–150 W/m², konforda 60–100 W/m²). λ termostat çalışma oranıdır. Gerekli güç için Isıtma Yükü ve Pencere/Duvar Isı Kaybı modüllerini kullanın."
      fields={[
        { key: "guc_yogunlugu_Wm2", label: "Güç Yoğunluğu (W/m²)", type: "number", step: 5, min: 1 },
        { key: "alan_m2", label: "Isıtılan Alan (m²)", type: "number", step: 1, min: 0.1 },
        { key: "gunlukSaat_h", label: "Günlük Çalışma (h)", type: "number", step: 0.5, min: 0.1 },
        { key: "calismaOrani", label: "Termostat Çalışma Oranı (0–1)", type: "number", step: 0.05, min: 0.05 },
        { key: "aylikGun", label: "Aylık Gün", type: "number", step: 1, min: 1 },
        { key: "birimFiyat_TLkWh", label: "Elektrik Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ guc_yogunlugu_Wm2: 120, alan_m2: 10, gunlukSaat_h: 6, calismaOrani: 0.6, aylikGun: 30, birimFiyat_TLkWh: 3 }}
      mainUnit="₺/ay"
      mainValueKey="aylikMaliyet_TL"
      mainDecimals={0}
      intermediateLabels={{
        kurulu_guc_kW: "Kurulu Güç (kW)",
        gunluk_enerji_kWh: "Günlük Enerji (kWh)",
        aylik_enerji_kWh: "Aylık Enerji (kWh)",
        faz_basina_akim_A_230V: "Akım (A, 230 V)",
      }}
    />
  );
}
