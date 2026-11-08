"use client";

import { sesYalitimiKutleYasasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SesYalitimiKutleYasasiPage() {
  return (
    <CalcPage
      module={sesYalitimiKutleYasasi}
      standardsLabel="Kütle yasası (kuramsal)"
      description="Tek tabakalı homojen duvar veya döşemenin belirli frekanstaki hava ses yalıtımını (TL) yüzey kütlesinden tahmin eder ve hedef için gereken kütleyi verir."
      formula="TL ≈ 20·log₁₀(m·f) − 47 [dB];  m = ρ·t (kg/m²)"
      engineeringNote="Kütle ve frekans iki katına çıkınca yalıtım yaklaşık 6 dB artar. Kuramsal değerdir: koinsidans çukuru, boşluklu/çok katmanlı yapı, kapı-menfez-bağlantı kaçakları gerçek yalıtımı düşürür. Konut ayırıcı elemanlar için tek sayı değerlendirmeyi (Rw) laboratuvar ölçümü ve ilgili yönetmelikten teyit edin."
      fields={[
        { key: "kalinlik_mm", label: "Kalınlık t (mm)", type: "number", step: 5, min: 1 },
        { key: "yogunluk_kgm3", label: "Malzeme Yoğunluğu ρ (kg/m³)", type: "number", step: 50, min: 10 },
        { key: "frekans_Hz", label: "Frekans f (Hz)", type: "number", step: 50, min: 20 },
        { key: "hedefTL_dB", label: "Hedef Ses Yalıtımı (dB)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ kalinlik_mm: 200, yogunluk_kgm3: 2400, frekans_Hz: 500, hedefTL_dB: 50 }}
      mainUnit="dB"
      mainValueKey="ses_yalitimi_dB"
      mainDecimals={1}
      intermediateLabels={{
        yuzey_kutlesi_kgm2: "Yüzey Kütlesi (kg/m²)",
        hedef_icin_gerekli_kutle_kgm2: "Hedef İçin Gerekli Kütle (kg/m²)",
        kutle_iki_katinda_TL_dB: "Kütle 2 Katında TL (dB)",
      }}
    />
  );
}
