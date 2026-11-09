"use client";

import { gesPerformansOraniPr } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GesPerformansOraniPrPage() {
  return (
    <CalcPage
      module={gesPerformansOraniPr}
      standardsLabel="IEC 61724-1"
      description="Üretilen enerjiyi, kurulu güç ve panel düzlemi ışınımından hesaplanan referans enerjiyle kıyaslayarak performans oranını (PR) bulur ve değerlendirir."
      formula="PR = E_ac/(P_stc·H_düzlem/G_stc);  G_stc = 1 kW/m²"
      engineeringNote="Aynı dönem için enerji ve ışınım girilmelidir; aylık/yıllık değerlendirin (günlük ışınım ölçüm hatası PR'ı bozar). İyi kurulumlarda yıllık PR yaklaşık 0,75–0,85'tir (yaygın kıyas; proje ve iklimle karşılaştırın). Düşük PR'da kirlenme, gölgelenme, invertör sınırlaması ve kesintileri inceleyin."
      fields={[
        { key: "uretilenEnerji_kWh", label: "Üretilen Enerji (kWh)", type: "number", step: 100, min: 0 },
        { key: "kuruluGuc_kWp", label: "Kurulu Güç (kWp)", type: "number", step: 0.5, min: 0.01 },
        { key: "duzlemIsinimi_kWhm2", label: "Panel Düzlemi Işınımı (kWh/m²)", type: "number", step: 10, min: 0.1 },
      ]}
      defaults={{ uretilenEnerji_kWh: 14200, kuruluGuc_kWp: 10, duzlemIsinimi_kWhm2: 1600 }}
      mainUnit=""
      mainValueKey="performansOrani"
      mainDecimals={3}
      intermediateLabels={{
        referans_verim_kWh: "Referans Enerji (kWh)",
        kayip_yuzde: "Toplam Kayıp (%)",
        ozgul_verim_kWh_kWp: "Özgül Verim (kWh/kWp)",
        esdeger_tam_guc_saati_h: "Panel Düzlemi Işınımı (kWh/m²)",
      }}
    />
  );
}
