"use client";

import { ucFazDengesizNotrAkimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function UcFazDengesizNotrAkimiPage() {
  return (
    <CalcPage
      module={ucFazDengesizNotrAkimi}
      standardsLabel="Fazör toplamı (standart atfı yok)"
      description="Üç fazlı sistemde faz akımları dengesizse nötr iletkenden geçen akımı hesaplar; nötr iletken kapasitesi girilirse karşılaştırır."
      formula="IN = √(IA² + IB² + IC² − IA·IB − IB·IC − IC·IA),   dengesizlik = max|Ii − Iort|/Iort"
      engineeringNote="Fazlar 120° arayla ve yükler aynı güç faktöründe kabul edilir (doğrusal yük). Üçün katı harmonikler (doğrusal olmayan yükler, örn. LED sürücü, SMPS) nötrde aritmetik toplandığı için gerçek nötr akımı bunun çok üstüne çıkabilir; bunun için Akım Harmonik Bozulması (THD) modülünü kullanın. Nötr kesitinin seçimi için Nötr İletken Kesiti Seçimi modülüne bakın. Nötr iletken kapasitesi 0 girilirse karşılaştırma yapılmaz."
      fields={[
        { key: "akimL1_A", label: "L1 Faz Akımı (A)", type: "number", min: 0, step: 1 },
        { key: "akimL2_A", label: "L2 Faz Akımı (A)", type: "number", min: 0, step: 1 },
        { key: "akimL3_A", label: "L3 Faz Akımı (A)", type: "number", min: 0, step: 1 },
        { key: "notrKapasitesi_A", label: "Nötr İletken Akım Kapasitesi (A, 0 = karşılaştırma yok)", type: "number", min: 0, step: 5 },
      ]}
      defaults={{ akimL1_A: 100, akimL2_A: 80, akimL3_A: 60, notrKapasitesi_A: 50 }}
      mainUnit="A (nötr akımı)"
      mainValueKey="notrAkimi_A"
      mainDecimals={2}
      intermediateLabels={{
        ortalama_faz_akimi_A: "Ortalama Faz Akımı (A)",
        faz_akimi_dengesizligi_yuzde: "Faz Akımı Dengesizliği (%)",
        en_yuksek_faz_akimi_A: "En Yüksek Faz Akımı (A)",
        notr_faz_orani: "Nötr / En Yüksek Faz Oranı",
      }}
    />
  );
}
