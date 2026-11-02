"use client";

import { betonCatlamaMomenti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonCatlamaMomentiPage() {
  return (
    <CalcPage
      module={betonCatlamaMomenti}
      standardsLabel="TS EN 1992-1-1 Tablo 3.1 — Beton çekme dayanımı"
      description="Dikdörtgen betonarme kesitin çatlama momentini hesaplar ve servis momentiyle karşılaştırarak kesitin çatlayıp çatlamadığını gösterir."
      formula="Mcr = fctm · b·h²/6,   fctm = 0,30·fck^(2/3)   (fck ≤ 50 MPa)"
      engineeringNote="Brüt kesit ve donatı katkısız yaklaşıktır (dönüştürülmüş kesit biraz daha yüksek Mcr verir). fctm ortalama çekme dayanımıdır; alt/üst karakteristik değerler için fctk,0.05 = 0,7·fctm kullanılır. Servis momenti Mcr'yi aşıyorsa sehim (Kiriş Sehim Kontrolü) ve çatlak genişliği hesapları çatlamış kesitle yapılmalıdır. fck > 50 MPa için formül farklıdır, bu modül kapsamında değildir."
      fields={[
        { key: "fck_MPa", label: "Beton Karakteristik Basınç Dayanımı fck (MPa)", type: "number", min: 12, step: 1 },
        { key: "genislik_mm", label: "Kesit Genişliği b (mm)", type: "number", min: 1, step: 10 },
        { key: "yukseklik_mm", label: "Kesit Yüksekliği h (mm)", type: "number", min: 1, step: 10 },
        { key: "servisMomenti_kNm", label: "Servis Momenti Msd (kNm)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ fck_MPa: 30, genislik_mm: 300, yukseklik_mm: 500, servisMomenti_kNm: 30 }}
      mainUnit="kNm (çatlama momenti Mcr)"
      mainValueKey="Mcr_kNm"
      mainDecimals={1}
      intermediateLabels={{
        fctm_MPa: "Ortalama Çekme Dayanımı fctm (MPa)",
        kesit_modulu_mm3: "Kesit Modülü W (mm³)",
        Msd_Mcr_orani: "Msd / Mcr",
        durum: "Kesit Durumu",
      }}
    />
  );
}
