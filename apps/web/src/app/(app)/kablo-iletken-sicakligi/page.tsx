"use client";

import { kabloIletkenSicakligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloIletkenSicakligiPage() {
  return (
    <CalcPage
      module={kabloIletkenSicakligi}
      standardsLabel="IEC 60287 (ısıl devre) / IEC 60364-5-52"
      description="Kablonun işletme akımındaki kararlı hâl iletken sıcaklığını, akım taşıma kapasitesine oranla tahmin eder ve izin verilen sıcaklıkla karşılaştırır."
      formula="Tc = Ta + (Tmaks − Ta)·(I/Iz)²"
      engineeringNote="Iz, girilen ortam sıcaklığında iletkeni izin verilen sıcaklığa (PVC 70 °C, XLPE/EPR 90 °C) ulaştıran, kurulum düzeltmeleri uygulanmış akımdır. Direncin sıcaklıkla artışı ihmal edildiğinden sonuç hafif iyimserdir; kritik hatlarda IEC 60287 tam hesabı gerekir. Kısa devre sıcaklığı için Kablo Kısa Devre Termik Kontrolü modülüne bakın."
      fields={[
        { key: "isletmeAkimi_A", label: "İşletme Akımı (A)", type: "number", min: 0, step: 5 },
        { key: "akimTasimaKapasitesi_A", label: "Akım Taşıma Kapasitesi Iz (A)", type: "number", min: 1, step: 5 },
        { key: "ortamSicakligi_C", label: "Ortam Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "izinVerilenSicaklik_C", label: "İzin Verilen İletken Sıcaklığı (°C)", type: "number", min: 60, step: 10 },
      ]}
      defaults={{ isletmeAkimi_A: 50, akimTasimaKapasitesi_A: 100, ortamSicakligi_C: 30, izinVerilenSicaklik_C: 70 }}
      mainUnit="°C (iletken sıcaklığı)"
      mainValueKey="iletkenSicakligi_C"
      mainDecimals={1}
      intermediateLabels={{
        yuklenme_orani: "Yüklenme Oranı I/Iz",
        sicaklik_artisi_K: "Sıcaklık Artışı (K)",
        sicaklik_payi_K: "Kalan Sıcaklık Payı (K)",
      }}
    />
  );
}
