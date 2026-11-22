"use client";

import { ongermeliBulonSurtunmeBirlesimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function OngermeliBulonSurtunmeBirlesimiPage() {
  return (
    <CalcPage
      module={ongermeliBulonSurtunmeBirlesimi}
      standardsLabel={'TS EN 1993-1-8 §3.9'}
      description={'Öngerilmeli yüksek dayanımlı bulonlarla yapılan sürtünme (kaymaya karşı kritik) birleşimin kayma dayanımını, yüzey sınıfı, delik tipi ve eş zamanlı çekme etkisiyle hesaplar.'}
      formula={'Fp,C = 0,7·fub·As;  Fs,Rd = ks·n·μ·(Fp,C − 0,8·Ft,Ed)/γM3;  Ved ≤ nb·Fs,Rd'}
      engineeringNote={'Yalnız kayma kontrolüdür; bulon kesme/ezilme dayanımı ve net kesit kontrolü Bulonlu Birleşim modülüyle yapılmalıdır. Sürtünme katsayısı μ yüzey hazırlığına bağlıdır (A kumlanmış 0,5; B 0,4; C 0,3; D 0,2) ve yalnız belirtilen işleme uyulursa geçerlidir. γM3 = 1,25 (kayma sınır durumu), 1,1 (kategori B, kullanılabilirlik); ks delik tipine göre. Değerleri ulusal ek ve sürümden teyit edin. Öngerme uygulama yöntemi şantiye kontrolü gerektirir.'}
      fields={[
        { key: "bulonSinifi", label: "Bulon Sınıfı", type: "select", options: [
          { value: "8.8", label: "8.8 (fub 800 MPa)" },
          { value: "10.9", label: "10.9 (fub 1000 MPa)" },
        ] },
        { key: "gerilmeAlani_As_mm2", label: "Gerilme Alanı As (mm²) — M16: 157", type: "number", step: 1, min: 1 },
        { key: "bulonAdedi", label: "Bulon Adedi", type: "number", step: 1, min: 1 },
        { key: "surtunmeYuzeyi_n", label: "Sürtünme Yüzeyi Sayısı n (1–2)", type: "number", step: 1, min: 1 },
        { key: "yuzeySinifi", label: "Yüzey Sınıfı", type: "select", options: [
          { value: "A", label: "A (μ 0,5)" },
          { value: "B", label: "B (μ 0,4)" },
          { value: "C", label: "C (μ 0,3)" },
          { value: "D", label: "D (μ 0,2)" },
        ] },
        { key: "delikTipi_ks", label: "Delik Tipi (ks)", type: "select", options: [
          { value: "1.0", label: "Normal delik (1,0)" },
          { value: "0.85", label: "Büyük/kısa oval delik (0,85)" },
          { value: "0.7", label: "Uzun oval delik (0,7)" },
        ] },
        { key: "gammaM3", label: "γM3", type: "select", options: [
          { value: "1.25", label: "1,25 (kayma sınır durumu)" },
          { value: "1.1", label: "1,10 (kullanılabilirlik)" },
        ] },
        { key: "bulonCekmesi_Ft_kN", label: "Bulon Başına Çekme Ft,Ed (kN)", type: "number", step: 5, min: 0 },
        { key: "tasarimKesme_Ved_kN", label: "Tasarım Kesme Kuvveti Ved (kN)", type: "number", step: 5, min: 0 },
      ]}
      defaults={{ bulonSinifi: "8.8", gerilmeAlani_As_mm2: 157, bulonAdedi: 4, surtunmeYuzeyi_n: 1, yuzeySinifi: "B", delikTipi_ks: "1.0", gammaM3: "1.25", bulonCekmesi_Ft_kN: 0, tasarimKesme_Ved_kN: 90 }}
      mainUnit={'kN'}
      mainValueKey={'birlesimKayma_FsRd_kN'}
      mainDecimals={1}
      intermediateLabels={{
        fub_MPa: "fub (MPa)",
        mu: "Sürtünme Katsayısı μ",
        ks: "ks",
        Fp_C_kN: "Öngerme Kuvveti Fp,C (kN)",
        bulon_basina_FsRd_kN: "Bulon Başına Fs,Rd (kN)",
        talep_kapasite_orani: "Ved / Fs,Rd",
      }}
    />
  );
}
