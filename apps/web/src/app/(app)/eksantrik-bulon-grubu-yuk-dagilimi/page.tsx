"use client";

import { eksantrikBulonGrubuYukDagilimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EksantrikBulonGrubuYukDagilimiPage() {
  return (
    <CalcPage
      module={eksantrikBulonGrubuYukDagilimi}
      standardsLabel={"TS EN 1993-1-8"}
      description={"Dikdörtgen düzenli bulon grubunda, ağırlık merkezine e kadar dışmerkez düşey yükün oluşturduğu burulma etkisiyle en çok zorlanan (köşe) bulonun bileşke kuvvetini elastik yöntemle hesaplar ve bulon kesme dayanımıyla karşılaştırır."}
      formula={"T = V·e;  Fd = V/n;  Fx = T·ry/Σr²;  Fy = Fd + T·rx/Σr²;  F = √(Fx² + Fy²)"}
      engineeringNote={"Elastik (vektörel) yöntem muhafazakârdır; TS EN 1993-1-8 plastik dağılıma da izin verir. Yük yalnız düzlem içinde ve ağırlık merkezine e dışmerkezlikle etkir; levha ezilmesi, çekme ve kesme-çekme etkileşimi ayrıca kontrol edilmelidir (bkz. bulonlu birleşim modülleri). e, bulon grubunun ağırlık merkezinden yük doğrultusuna dik ölçülen mesafedir. Fv,Rd bulon sınıfı ve kesme düzlemine göre ayrıca hesaplanır."}
      fields={[
        { key: "nx", label: "Yatay Bulon Sayısı (sütun)", type: "number", step: 1, min: 1 },
        { key: "ny", label: "Düşey Bulon Sayısı (sıra)", type: "number", step: 1, min: 1 },
        { key: "sx_mm", label: "Yatay Aralık (mm)", type: "number", step: 5, min: 0 },
        { key: "sy_mm", label: "Düşey Aralık (mm)", type: "number", step: 5, min: 0 },
        { key: "V_kN", label: "Düşey Yük V (kN)", type: "number", step: 5, min: 0 },
        { key: "e_mm", label: "Yük Eksantrikliği e (mm)", type: "number", step: 10, min: 0 },
        { key: "FvRd_kN", label: "Bulon Kesme Dayanımı Fv,Rd (kN)", type: "number", step: 5, min: 0.1 },
      ]}
      defaults={{ nx: 2, ny: 3, sx_mm: 100, sy_mm: 100, V_kN: 100, e_mm: 150, FvRd_kN: 60 }}
      mainUnit={"kN"}
      mainValueKey={"enBuyukBulonKuvveti_kN"}
      mainDecimals={2}
      intermediateLabels={{
        bulon_sayisi: "Bulon Sayısı",
        sum_r2_mm2: "Σr² (mm²)",
        burulma_momenti_kNmm: "Burulma Momenti T (kN·mm)",
        dogrudan_kesme_kN: "Doğrudan Kesme V/n (kN)",
        yatay_bilesen_kN: "Köşe Bulonu Yatay Bileşen (kN)",
        dusey_bilesen_kN: "Köşe Bulonu Düşey Bileşen (kN)",
        kullanim_orani: "Kullanım Oranı",
      }}
    />
  );
}
