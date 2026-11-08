"use client";

import { tankBosalmaSuresiTorricelli } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TankBosalmaSuresiTorricelliPage() {
  return (
    <CalcPage
      module={tankBosalmaSuresiTorricelli}
      standardsLabel="Torricelli teoremi (standart atfı yok)"
      description="Düzgün kesitli açık tankın alt delik veya boru çıkışından boşalma süresini ve başlangıç debisini hesaplar."
      formula="Q = Cd·a·√(2g·h);  t = (A/(Cd·a))·√(2/g)·(√H − √h₂)"
      engineeringNote="Cd keskin kenarlı delikte ≈ 0,60–0,62, yuvarlatılmış çıkış veya kısa boruda 0,8–0,98'dir; boru sürtünmesi ve vana kayıpları Cd'ye katılmalıdır. Tam boşalma için son yüksekliği 0 girin. Kapalı/basınçlı tankta ek basınç yükü hesaba katılmaz. Tam boşalma süresi başlangıç debisiyle boşalma süresinin 2 katıdır."
      fields={[
        { key: "tankKesitAlani_m2", label: "Tank Kesit Alanı A (m²)", type: "number", step: 0.1, min: 0.001 },
        { key: "baslangicYuksekligi_m", label: "Başlangıç Su Yüksekliği H (m)", type: "number", step: 0.1, min: 0.01 },
        { key: "sonYukseklik_m", label: "Son Su Yüksekliği h₂ (m)", type: "number", step: 0.1, min: 0 },
        { key: "cikisCapi_mm", label: "Çıkış Çapı d (mm)", type: "number", step: 1, min: 1 },
        { key: "debiKatsayisi_Cd", label: "Debi Katsayısı Cd", type: "number", step: 0.01, min: 0.1 },
      ]}
      defaults={{ tankKesitAlani_m2: 1, baslangicYuksekligi_m: 2, sonYukseklik_m: 0, cikisCapi_mm: 50, debiKatsayisi_Cd: 0.62 }}
      mainUnit="s"
      mainValueKey="bosalmaSuresi_s"
      mainDecimals={0}
      intermediateLabels={{
        cikis_kesit_alani_m2: "Çıkış Kesit Alanı (m²)",
        baslangic_debisi_m3s: "Başlangıç Debisi (m³/s)",
        baslangic_debisi_Ls: "Başlangıç Debisi (L/s)",
        bosalan_hacim_m3: "Boşalan Hacim (m³)",
        sure_dakika: "Süre (dk)",
        ortalama_debi_m3s: "Ortalama Debi (m³/s)",
        not: "Not",
      }}
    />
  );
}
