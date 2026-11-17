"use client";

import { tabanPlakasiKalinligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TabanPlakasiKalinligiPage() {
  return (
    <CalcPage
      module={tabanPlakasiKalinligi}
      standardsLabel={"AISC Design Guide 1 (LRFD)"}
      description={"Eksenel basınç altında ankastre olmayan kolon taban plakasının eğilme kalınlığını, konsol uzunluğu m, n ve n' üzerinden hesaplar."}
      formula={"m = (N − 0,95d)/2;  n = (B − 0,8bf)/2;  n' = √(d·bf)/4;  t = l·√(2Pu/(0,9·Fy·B·N)),  l = max(m, n, n')"}
      engineeringNote={"Uzun yöntem yerine λ = 1 alınarak tutucu davranılmıştır (λn' ≤ n' sonucu değişmez). Beton ezilme kontrolü ayrı bir modülde yapılır; burada plakanın eğilme kalınlığı bulunur. Moment, çekme (ankraj kuvveti) ve kayma bu modülün kapsamı dışındadır. Plakanın standart ticari kalınlığa yukarı yuvarlanması gerekir."}
      fields={[
        { key: "pu_kN", label: "Tasarım Eksenel Yük Pu (kN)", type: "number", step: 50, min: 1 },
        { key: "d_mm", label: "Kolon Derinliği d (mm)", type: "number", step: 10, min: 10 },
        { key: "bf_mm", label: "Kolon Başlık Genişliği bf (mm)", type: "number", step: 10, min: 10 },
        { key: "N_mm", label: "Plaka Boyu N (mm)", type: "number", step: 10, min: 10 },
        { key: "B_mm", label: "Plaka Genişliği B (mm)", type: "number", step: 10, min: 10 },
        { key: "fy_MPa", label: "Plaka Akma Dayanımı Fy (MPa)", type: "number", step: 5, min: 100 },
      ]}
      defaults={{ pu_kN: 1200, d_mm: 290, bf_mm: 300, N_mm: 400, B_mm: 400, fy_MPa: 275 }}
      mainUnit={"mm"}
      mainValueKey={"kalinlik_mm"}
      mainDecimals={2}
      intermediateLabels={{
        m_mm: "m (mm)",
        n_mm: "n (mm)",
        n_prime_mm: "n' (mm)",
        kritik_konsol_mm: "Kritik Konsol l (mm)",
        kalinlik_yukari_mm: "Kalınlık (1 mm'ye yukarı)",
      }}
    />
  );
}
