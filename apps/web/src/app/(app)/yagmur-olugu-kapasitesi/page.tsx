"use client";

import { yagmurOluguKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YagmurOluguKapasitesiPage() {
  return (
    <CalcPage
      module={yagmurOluguKapasitesi}
      standardsLabel="Manning bağıntısı (açık kanal hidroliği)"
      description="Yarım daire kesitli bir yağmur oluğunun Manning bağıntısıyla taşıyabileceği debiyi hesaplar ve çatıdan gelen yağmur debisiyle karşılaştırır."
      formula="Q = (1/n)·A·R^(2/3)·S^(1/2),   R = A/P,   Qçatı = C·i·A/(3,6·10⁶)   (θ = 2·acos(1 − y/r), A = r²(θ − sinθ)/2, P = r·θ)"
      engineeringNote="Oluk su derinliği oranı y/r = 1 tam dolu yarım dairedir; pratikte tam dolu çalışma yerine bir güvenlik payı (örn. y/r ≈ 0,8–0,9) bırakmak taşmaya karşı daha güvenlidir. Manning n değerleri malzemeye bağlıdır (PVC ≈ 0,010–0,011, galvaniz sac ≈ 0,012–0,013, beton ≈ 0,013–0,015). Eğim yüzde olarak girilir (tipik 0,3–1 %). Oluk uçlarındaki giriş/çıkış kayıpları, köşe ve iniş borusu kapasitesi hesaba katılmaz; TS EN 12056-3 oluk boyutlandırma yöntemi ve yerel yağış şiddeti (örn. 5 dakikalık, 2–10 yıl dönüşlü) ile kontrol edilmelidir."
      fields={[
        { key: "olukYaricapi_mm", label: "Oluk Yarıçapı r (mm)", type: "number", min: 10, step: 5 },
        { key: "suDerinligi_orani", label: "Su Derinliği Oranı y/r (0–1)", type: "number", min: 0.05, step: 0.05 },
        { key: "egim_yuzde", label: "Oluk Eğimi (%)", type: "number", min: 0.05, step: 0.1 },
        { key: "manningN", label: "Manning Pürüzlülük n", type: "number", min: 0.005, step: 0.001 },
        { key: "catiAlani_m2", label: "Oluğa Boşalan Çatı Alanı (m²)", type: "number", min: 1, step: 10 },
        { key: "yagisSiddeti_mmh", label: "Yağış Şiddeti i (mm/h)", type: "number", min: 1, step: 10 },
        { key: "akisKatsayisi", label: "Akış Katsayısı C (0–1)", type: "number", min: 0.1, step: 0.05 },
      ]}
      defaults={{
        olukYaricapi_mm: 62.5,
        suDerinligi_orani: 1,
        egim_yuzde: 0.5,
        manningN: 0.011,
        catiAlani_m2: 120,
        yagisSiddeti_mmh: 100,
        akisKatsayisi: 1,
      }}
      mainUnit="L/s (oluk kapasitesi)"
      mainValueKey="olukKapasitesi_Ls"
      mainDecimals={2}
      intermediateLabels={{
        islak_alan_m2: "Islak Alan A (m²)",
        islak_cevre_m: "Islak Çevre P (m)",
        hidrolik_yaricap_m: "Hidrolik Yarıçap R (m)",
        ortalama_hiz_ms: "Ortalama Hız (m/s)",
        cati_debisi_Ls: "Çatı Debisi (L/s)",
        kullanim_orani: "Kullanım Oranı (Qçatı/Q)",
      }}
    />
  );
}
