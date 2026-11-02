"use client";

import { buharTuketimiIsiSerpantini } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BuharTuketimiIsiSerpantiniPage() {
  return (
    <CalcPage
      module={buharTuketimiIsiSerpantini}
      standardsLabel="Buhar tabloları (gizli ısı) — enerji dengesi"
      description="Buharlı ısıtıcı, eşanjör veya serpantinin ısı yükünden gereken doymuş buhar debisini ve oluşan kondens debisini hesaplar."
      formula="ṁ = Q / (h_fg·η)"
      engineeringNote="h_fg işletme basıncındaki doymuş buharın gizli ısısıdır (buhar tablosundan; yaklaşık 2 bar(a) → 2202, 8 bar(a) → 2048 kJ/kg). Verim, kondensat alt soğutması ve hat kayıplarını temsil eder (1 = ideal). Debi, Buhar Hattı Çapı ve Buhar Trap Kapasitesi modüllerinin girdisidir. Kazan kapasitesi için Buhar Kazanı Kapasitesi modülüne bakın."
      fields={[
        { key: "isiYuku_kW", label: "Isı Yükü (kW)", type: "number", min: 0.1, step: 10 },
        { key: "gizliIsi_kJkg", label: "Buharın Gizli Isısı h_fg (kJ/kg)", type: "number", min: 1500, step: 10 },
        { key: "verim", label: "Verim η (0–1)", type: "number", min: 0.1, step: 0.05 },
      ]}
      defaults={{ isiYuku_kW: 500, gizliIsi_kJkg: 2100, verim: 1 }}
      mainUnit="kg/h (buhar debisi)"
      mainValueKey="buharDebisi_kgh"
      mainDecimals={0}
      intermediateLabels={{
        buhar_debisi_kgs: "Buhar Debisi (kg/s)",
        kondens_debisi_kgh: "Kondens Debisi (kg/h)",
        gunluk_buhar_ton_8h: "8 Saatlik Tüketim (ton)",
      }}
    />
  );
}
