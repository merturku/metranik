"use client";
import { CalcPage } from "@/components/calc-page";
import { sogutmaKulesiKapasitesiKontrolu } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={sogutmaKulesiKapasitesiKontrolu}
      standardsLabel="Enerji Dengesi (Q = ṁ×cp×ΔT)"
      description="Soğutma kulesinin işletme debisi ve sıcaklıklarından attığı ısıyı hesaplar; tasarım ısı yükünü tasarım çıkış sıcaklığında karşılayıp karşılamadığını kontrol eder."
      formula="Q = ṁ×cp×(Tgiriş - Tçıkış), Approach = Tçıkış - Tyaş"
      engineeringNote="Kule, tasarım ısı yükünü çıkış suyu tasarım sıcaklığının altında kalırken atabiliyorsa yeterlidir. Çıkış suyu yaş termometre sıcaklığının altına inemez; yaklaşma sıcaklığı küçüldükçe gereken kule boyutu hızla büyür."
      fields={[
        { key: "tasarim_isi_yuku_kW", label: "Tasarım Isı Yükü (kW)", type: "number", min: 1, step: 50 },
        { key: "su_debisi_m3h", label: "Su Debisi (m³/h)", type: "number", min: 1, step: 5 },
        { key: "giris_sicakligi_C", label: "Giriş Su Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "cikis_sicakligi_C", label: "Çıkış Su Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "yas_termometre_sicakligi_C", label: "Yaş Termometre Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "tasarim_cikis_sicakligi_C", label: "Tasarım Çıkış Sıcaklığı (°C)", type: "number", step: 1 },
      ]}
      defaults={{
        tasarim_isi_yuku_kW: 800,
        su_debisi_m3h: 100,
        giris_sicakligi_C: 35,
        cikis_sicakligi_C: 28,
        yas_termometre_sicakligi_C: 24,
        tasarim_cikis_sicakligi_C: 28,
      }}
      mainUnit="kW"
      mainValueKey="atilan_isi_kW"
      mainDecimals={1}
      intermediateLabels={{
        range_C: "Range (°C)",
        approach_C: "Approach (°C)",
        kutleselDebi_kgs: "Kütlesel Debi (kg/s)",
        kapasiteOrani: "Atılan Isı / Tasarım Yükü",
      }}
    />
  );
}
