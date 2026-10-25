"use client";

import { harmonikBozulmaThdKFaktoru } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HarmonikBozulmaThdKFaktoruPage() {
  return (
    <CalcPage
      module={harmonikBozulmaThdKFaktoru}
      standardsLabel="IEC 61000-2-2 · UL 1561"
      description="Ölçülen harmonik akım bileşenlerinden toplam harmonik bozulmayı (THDI), toplam efektif akımı, trafo seçimi için K-faktörünü ve üçün katı harmoniklerin nötrde oluşturduğu akımı hesaplar."
      formula="THDI = √(Σ Ih²)/I1,  Irms = √(I1² + Σ Ih²),  K = Σ(Ih²·h²)/Σ Ih²,  In = 3·√(I3² + I9²)"
      engineeringNote="Değerler bir güç analizöründen faz başına alınmalıdır. K-faktörü trafo seçiminde kullanılır (K-4, K-13 gibi sınıflar); K > 1 ise standart trafo değer kaybına uğrar. Nötr/faz akım oranı, Nötr İletken Kesiti Seçimi modülünün harmonik çarpanı girdisidir. İzin verilen THD sınırı bağlantı noktasındaki kısa devre oranına ve dağıtım şirketi şartlarına göre belirlenir."
      fields={[
        { key: "temelBilesenAkimi_I1_A", label: "Temel Bileşen Akımı I1 (A)", type: "number", min: 0.1, step: 1 },
        { key: "harmonik3_A", label: "3. Harmonik I3 (A)", type: "number", min: 0, step: 1 },
        { key: "harmonik5_A", label: "5. Harmonik I5 (A)", type: "number", min: 0, step: 1 },
        { key: "harmonik7_A", label: "7. Harmonik I7 (A)", type: "number", min: 0, step: 1 },
        { key: "harmonik9_A", label: "9. Harmonik I9 (A)", type: "number", min: 0, step: 1 },
        { key: "harmonik11_A", label: "11. Harmonik I11 (A)", type: "number", min: 0, step: 1 },
        { key: "harmonik13_A", label: "13. Harmonik I13 (A)", type: "number", min: 0, step: 1 },
        { key: "izinVerilenThd_yuzde", label: "İzin Verilen THDI (%)", type: "number", min: 1, step: 1 },
      ]}
      defaults={{
        temelBilesenAkimi_I1_A: 100,
        harmonik3_A: 30,
        harmonik5_A: 20,
        harmonik7_A: 10,
        harmonik9_A: 5,
        harmonik11_A: 4,
        harmonik13_A: 3,
        izinVerilenThd_yuzde: 40,
      }}
      mainUnit="% THDI"
      mainValueKey="thd_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        toplam_efektif_akim_A: "Toplam Efektif Akım Irms (A)",
        k_faktoru: "K-Faktörü",
        notr_harmonik_akimi_A: "Nötr Harmonik Akımı (A)",
        notr_faz_akim_orani: "Nötr / Faz Akım Oranı",
      }}
    />
  );
}
