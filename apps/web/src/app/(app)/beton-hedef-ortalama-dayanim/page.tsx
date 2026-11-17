"use client";

import { betonHedefOrtalamaDayanim } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonHedefOrtalamaDayanimPage() {
  return (
    <CalcPage
      module={betonHedefOrtalamaDayanim}
      standardsLabel={"ACI 318-19 §26.4.3"}
      description={"Şartnamedeki karakteristik silindir dayanımı ve (varsa) standart sapmadan, karışım tasarımında hedeflenecek ortalama dayanımı hesaplar."}
      formula={"f'cr = max[f'c + 1,34s;  f'c + 2,33s − 3,5] (f'c ≤ 35 MPa);  f'cr = max[f'c + 1,34s;  0,90f'c + 2,33s] (f'c > 35 MPa)"}
      engineeringNote={"Standart sapma s, aynı tesisten en az 30 ardışık sonuçtan hesaplanmalıdır; veri yoksa ACI Tablo 26.4.3.1 sabit artışları kullanılır (f'c < 21: +7; 21–35: +8,5; > 35: 1,10f'c + 5,0 MPa). TS EN 206 ve TS 13515 farklı kabul kriteri kullanır (örn. fck + 1,48σ); proje şartnamesindeki kriteri esas alın. Basınç dayanımı silindir (f'c) cinsindendir; küp dayanımı değil."}
      fields={[
        { key: "fc_MPa", label: "Şartname Silindir Dayanımı f'c (MPa)", type: "number", step: 1, min: 1 },
        { key: "veri", label: "Standart Sapma Verisi", type: "select", options: [{ value: "var", label: "Var (s girilir)" }, { value: "yok", label: "Yok (tablo artışı)" }] },
        { key: "s_MPa", label: "Standart Sapma s (MPa)", type: "number", step: 0.5, min: 0 },
      ]}
      defaults={{ fc_MPa: 30, veri: "var", s_MPa: 3 }}
      mainUnit={"MPa"}
      mainValueKey={"hedefDayanim_MPa"}
      mainDecimals={2}
      intermediateLabels={{
        yontem: "Kullanılan Yöntem",
        denklem_1_MPa: "Denklem 1 (f'c + 1,34s)",
        denklem_2_MPa: "Denklem 2",
      }}
    />
  );
}
