"use client";

import { akimTrafosuYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AkimTrafosuYukuPage() {
  return (
    <CalcPage
      module={akimTrafosuYuku}
      standardsLabel="IEC 61869-2 — Akım trafoları, sekonder yük (burden)"
      description="Akım trafosunun sekonder devresindeki kablo ve röle/ölçü cihazı yükünü hesaplar ve CT anma gücüyle karşılaştırır."
      formula="S = I2n²·(ρ·2L/A) + S_röle   ≤   S_CT"
      engineeringNote="Bakır özdirenci 75 °C için 0,0225 Ω·mm²/m alınmıştır (tutucu). Röle/ölçü cihazı yükü, cihazın anma sekonder akımındaki VA değeridir (üretici kataloğu). Gidiş-dönüş kablo boyu 2L alınır; yıldız noktası ortak bağlantıda değişir. 5 A yerine 1 A sekonder kablo yükünü 25 kat azaltır. Doyma/ALF (accuracy limit factor) kontrolü bu modülün kapsamı dışındadır."
      fields={[
        {
          key: "sekonderAkimi_A",
          label: "Sekonder Anma Akımı",
          type: "select",
          options: [
            { value: "5", label: "5 A" },
            { value: "1", label: "1 A" },
          ],
        },
        { key: "kabloUzunlugu_m", label: "CT–Cihaz Kablo Uzunluğu (m, tek yön)", type: "number", min: 0, step: 1 },
        { key: "kabloKesiti_mm2", label: "Kablo Kesiti (mm²)", type: "number", min: 0.5, step: 0.5 },
        { key: "roleYuku_VA", label: "Röle / Ölçü Cihazı Yükü (VA)", type: "number", min: 0, step: 0.5 },
        { key: "ctAnmaGucu_VA", label: "CT Anma Gücü (VA)", type: "number", min: 0.5, step: 0.5 },
      ]}
      defaults={{ sekonderAkimi_A: "5", kabloUzunlugu_m: 20, kabloKesiti_mm2: 2.5, roleYuku_VA: 5, ctAnmaGucu_VA: 15 }}
      mainUnit="VA (toplam sekonder yük)"
      mainValueKey="toplamYuk_VA"
      mainDecimals={1}
      intermediateLabels={{
        kablo_direnci_ohm: "Kablo Direnci (Ω, gidiş-dönüş)",
        kablo_yuku_VA: "Kablo Yükü (VA)",
        doluluk_yuzde: "CT Doluluk (%)",
        bos_kapasite_VA: "Kalan Kapasite (VA)",
      }}
    />
  );
}
