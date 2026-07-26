"use client";

import { trafoVerimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TrafoVerimiPage() {
  return (
    <CalcPage
      module={trafoVerimi}
      standardsLabel="Fiziksel Formül"
      description="Yükte teslim edilen güce, demir (boşta) ve bakır (yük) kayıplarına göre güç trafosunun verimini hesaplar."
      formula="η = Pçıkış / (Pçıkış + Pfe + Pcu)"
      engineeringNote="Pfe ve Pcu değerleri trafo etiketindeki boşta çalışma ve kısa devre deney sonuçlarından alınır; Pcu yükle karesel orantılı değiştiğinden hesap belirli bir yük noktası için geçerlidir."
      fields={[
        { key: "cikisGucu_Pout_kW", label: "Çıkış Gücü Pçıkış (kW)", type: "number", min: 1, step: 10 },
        {
          key: "demirKaybi_Pfe_kW",
          label: "Demir Kaybı Pfe (kW)",
          type: "number",
          min: 0,
          step: 0.1,
        },
        {
          key: "bakirKaybi_Pcu_kW",
          label: "Bakır Kaybı Pcu (kW, ilgili yük noktasında)",
          type: "number",
          min: 0,
          step: 0.1,
        },
      ]}
      defaults={{ cikisGucu_Pout_kW: 500, demirKaybi_Pfe_kW: 1.2, bakirKaybi_Pcu_kW: 3.5 }}
      mainUnit="%"
      mainValueKey="verim_yuzde"
      intermediateLabels={{ toplamKayip_kW: "Toplam Kayıp (kW)" }}
    />
  );
}
