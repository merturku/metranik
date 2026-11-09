"use client";

import { evHavuzHacmiDolumSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvHavuzHacmiDolumSuresiPage() {
  return (
    <CalcPage
      module={evHavuzHacmiDolumSuresi}
      standardsLabel="Standart atfı yok"
      description="Dikdörtgen veya dairesel havuzun hacmini ve verilen dolum debisiyle dolum süresini hesaplar."
      formula="V = boy·en·derinlik (dikdörtgen);  V = π·D²/4·derinlik (daire);  t = V/Q"
      engineeringNote="Düz tabanlı ve dik cidarlı havuz kabulüdür; eğimli tabanda ortalama derinlik girin. Dairesel havuzda yalnız boyut 1 (çap) kullanılır. Hacim Havuz Klor Dozajı, Havuz Su Sirkülasyon Debisi ve Havuz İlk Isıtma Süresi modüllerine girdi olur."
      fields={[
        { key: "sekil", label: "Şekil", type: "select", options: [{ value: "dikdortgen", label: "Dikdörtgen" }, { value: "daire", label: "Daire" }] },
        { key: "boyut1_m", label: "Boyut 1 — Boy veya Çap (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "boyut2_m", label: "Boyut 2 — En (m, dikdörtgen)", type: "number", step: 0.1, min: 0 },
        { key: "derinlik_m", label: "Ortalama Derinlik (m)", type: "number", step: 0.05, min: 0.05 },
        { key: "dolumDebisi_Ldk", label: "Dolum Debisi (L/dk)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ sekil: "dikdortgen", boyut1_m: 5, boyut2_m: 3, derinlik_m: 1.2, dolumDebisi_Ldk: 100 }}
      mainUnit="m³"
      mainValueKey="hacim_m3"
      mainDecimals={2}
      intermediateLabels={{
        yuzey_alani_m2: "Yüzey Alanı (m²)",
        hacim_L: "Hacim (L)",
        dolum_suresi_saat: "Dolum Süresi (saat)",
        dolum_suresi_dakika: "Dolum Süresi (dk)",
        dolum_suresi_gun: "Dolum Süresi (gün)",
      }}
    />
  );
}
