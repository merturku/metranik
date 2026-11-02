"use client";

import { kolonYukToplama } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KolonYukToplamaPage() {
  return (
    <CalcPage
      module={kolonYukToplama}
      standardsLabel="Etki alanı (tributary area) yöntemi"
      description="Kolonun etki alanı, kat sayısı ve birim alan tasarım yüklerinden kolon tabanındaki toplam eksenel yükü hesaplar."
      formula="N = n_kat·A·q_kat + A·q_çatı + G_kolon"
      engineeringNote="q değerleri katsayılı tasarım yüküdür (kN/m²); Düşey Yük Kombinasyonu modülüyle bulunabilir. Etki alanı, komşu açıklıkların yarılarının oluşturduğu alandır; kenar ve köşe kolonlarda küçülür, sürekli kirişlerde iç kolonda ilk mesnet nedeniyle %10–15 artış göz önüne alınabilir. Sonuç Kolon Ön Boyutlandırma modülüne N olarak girilir. Bu hesap yalnız düşey yüktür; deprem etkisi ayrıca incelenmelidir."
      fields={[
        { key: "katSayisi", label: "Kolonun Taşıdığı Normal Kat Sayısı", type: "number", min: 1, step: 1 },
        { key: "etkiAlani_m2", label: "Etki Alanı A (m²)", type: "number", min: 0.1, step: 1 },
        { key: "katTasarimYuku_kNm2", label: "Kat Tasarım Yükü q (kN/m²)", type: "number", min: 0.1, step: 0.5 },
        { key: "catiTasarimYuku_kNm2", label: "Çatı Tasarım Yükü (kN/m²)", type: "number", min: 0, step: 0.5 },
        { key: "kolonOzAgirligi_kN", label: "Kolon Öz Ağırlığı (kN)", type: "number", min: 0, step: 5 },
      ]}
      defaults={{ katSayisi: 5, etkiAlani_m2: 25, katTasarimYuku_kNm2: 12, catiTasarimYuku_kNm2: 8, kolonOzAgirligi_kN: 30 }}
      mainUnit="kN (kolon tabanı eksenel yük)"
      mainValueKey="eksenelYuk_kN"
      mainDecimals={0}
      intermediateLabels={{
        kat_yukleri_kN: "Kat Yükleri (kN)",
        cati_yuku_kN: "Çatı Yükü (kN)",
        kolon_oz_agirligi_kN: "Kolon Öz Ağırlığı (kN)",
        kat_basina_yuk_kN: "Kat Başına Yük (kN)",
      }}
    />
  );
}
