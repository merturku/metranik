"use client";

import { suDarbesiDalgaHizi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SuDarbesiDalgaHiziPage() {
  return (
    <CalcPage
      module={suDarbesiDalgaHizi}
      standardsLabel={"Korteweg / Joukowsky (Wylie & Streeter)"}
      description={"Akışkanın hacimsel modülü, boru çapı, et kalınlığı ve boru malzemesinin elastisite modülünden basınç dalgasının boru içindeki yayılma hızını hesaplar; Su Darbesi Basıncı (Joukowsky) modülünün c girdisini üretir."}
      formula={"a = √(K/ρ) / √(1 + (K/E)·(D/e)·c1);  c1 = 1−ν² (tüm ankrajlı) | 1−ν/2 (genleşme derzli) | 1,25−ν (üst uç ankrajlı)"}
      engineeringNote={"İnce cidarlı boru (D/e > 25) varsayımıdır; kalın cidarda formül yaklaşıktır. Havası alınmamış su ya da gaz kabarcığı dalga hızını belirgin düşürür; bu modül saf su kabul eder. Çelik boruda tipik 1000–1300 m/s, PVC/PE'de 200–500 m/s çıkar. Sonucu Joukowsky ΔP = ρ·a·Δv bağıntısına girdi olarak kullanın."}
      fields={[
        { key: "hacimselModul_GPa", label: "Suyun Hacimsel Modülü K (GPa)", type: "number", step: 0.1, min: 0.1 },
        { key: "yogunluk_kgm3", label: "Akışkan Yoğunluğu (kg/m³)", type: "number", step: 10, min: 1 },
        { key: "borucapi_mm", label: "Boru İç Çapı D (mm)", type: "number", step: 10, min: 1 },
        { key: "etKalinligi_mm", label: "Et Kalınlığı e (mm)", type: "number", step: 0.5, min: 0.1 },
        { key: "elastisiteModulu_GPa", label: "Boru Elastisite Modülü E (GPa)", type: "number", step: 1, min: 1 },
        { key: "poisson", label: "Poisson Oranı ν", type: "number", step: 0.05, min: 0 },
        { key: "ankraj", label: "Boru Mesnet / Ankraj Durumu", type: "select", options: [{ value: "tum", label: "Tüm boy ankrajlı (c1 = 1−ν²)" }, { value: "genlesme", label: "Genleşme derzli (c1 = 1−ν/2)" }, { value: "serbest", label: "Üst ucu ankrajlı (c1 = 1,25−ν)" }] },
      ]}
      defaults={{ hacimselModul_GPa: 2.2, yogunluk_kgm3: 1000, borucapi_mm: 300, etKalinligi_mm: 6, elastisiteModulu_GPa: 207, poisson: 0.3, ankraj: "genlesme" }}
      mainUnit={"m/s"}
      mainValueKey={"dalgaHizi_ms"}
      mainDecimals={0}
      intermediateLabels={{
        rijit_boru_dalga_hizi_ms: "Rijit Boru Dalga Hızı √(K/ρ) (m/s)",
        c1_katsayisi: "c1 Katsayısı",
        D_e_orani: "D/e Oranı",
        esneklik_carpani: "Esneklik Çarpanı",
        uyari: "Uyarı",
      }}
    />
  );
}
