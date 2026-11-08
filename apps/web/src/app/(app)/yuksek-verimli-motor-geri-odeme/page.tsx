"use client";

import { yuksekVerimliMotorGeriOdeme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YuksekVerimliMotorGeriOdemePage() {
  return (
    <CalcPage
      module={yuksekVerimliMotorGeriOdeme}
      standardsLabel="IEC 60034-30-1 (verim sınıfları)"
      description="Eski motoru daha verimli bir motorla değiştirmenin yıllık enerji tasarrufunu, maliyet kazancını ve basit geri ödeme süresini hesaplar."
      formula="ΔP = Pmil·yük·(1/η₁ − 1/η₂);  E = ΔP·h;  geri ödeme = ek yatırım / (E·fiyat)"
      engineeringNote="Verimler motorun çalıştığı yükteki değerlerdir; etiket verimi tam yük içindir. Fiyat sabit kabul edilir (basit geri ödeme, iskonto yok). Verim sınıf değerlerini üretici veri sayfasından alın. Motor Giriş Gücü modülü giriş gücünü ayrıca verir."
      fields={[
        { key: "milGucu_kW", label: "Mil Gücü (kW)", type: "number", step: 0.5, min: 0.1 },
        { key: "yukOrani", label: "Yük Oranı (0–1)", type: "number", step: 0.05, min: 0.05 },
        { key: "eskiVerim_yuzde", label: "Eski Motor Verimi (%)", type: "number", step: 0.5, min: 50 },
        { key: "yeniVerim_yuzde", label: "Yeni Motor Verimi (%)", type: "number", step: 0.5, min: 50 },
        { key: "yillikCalismaSaati_h", label: "Yıllık Çalışma Saati (h)", type: "number", step: 100, min: 1 },
        { key: "birimFiyat_TLkWh", label: "Elektrik Birim Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
        { key: "ekYatirim_TL", label: "Ek Yatırım (₺)", type: "number", step: 500, min: 0 },
      ]}
      defaults={{ milGucu_kW: 15, yukOrani: 0.75, eskiVerim_yuzde: 90, yeniVerim_yuzde: 94, yillikCalismaSaati_h: 6000, birimFiyat_TLkWh: 3, ekYatirim_TL: 20000 }}
      mainUnit="kWh/yıl"
      mainValueKey="yillikTasarruf_kWh"
      mainDecimals={0}
      intermediateLabels={{
        eski_giris_gucu_kW: "Eski Giriş Gücü (kW)",
        yeni_giris_gucu_kW: "Yeni Giriş Gücü (kW)",
        guc_tasarrufu_kW: "Güç Tasarrufu (kW)",
        yillik_tasarruf_TL: "Yıllık Tasarruf (₺)",
        geri_odeme_yil: "Geri Ödeme (yıl)",
      }}
    />
  );
}
