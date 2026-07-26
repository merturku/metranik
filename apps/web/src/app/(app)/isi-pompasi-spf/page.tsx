"use client";

import { isiPompasiSpf } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiPompasiSpfPage() {
  return (
    <CalcPage
      module={isiPompasiSpf}
      standardsLabel="Fiziksel Formül"
      description="Bir sezon boyunca toplam ısıtma çıktısına ve elektrik tüketimine göre ısı pompasının gerçek mevsimsel performans katsayısını (SPF) hesaplar."
      formula="SPF = Toplam Isıtma Çıktısı / Toplam Elektrik Girdisi"
      engineeringNote="SPF, tek nokta COP değerinden farklı olarak gerçek işletme koşullarını (değişken dış sıcaklık, defrost döngüleri) yansıtır; enerji kimlik belgesi hesaplarında kullanılır."
      fields={[
        {
          key: "toplamIsitmaCiktisi_kWh",
          label: "Toplam Isıtma Çıktısı (kWh)",
          type: "number",
          min: 1,
          step: 100,
        },
        {
          key: "toplamElektrikGirdisi_kWh",
          label: "Toplam Elektrik Girdisi (kWh)",
          type: "number",
          min: 1,
          step: 100,
        },
      ]}
      defaults={{ toplamIsitmaCiktisi_kWh: 15000, toplamElektrikGirdisi_kWh: 4500 }}
      mainUnit=""
      mainValueKey="spf"
      intermediateLabels={{ toplamElektrikGirdisi_kWh: "Toplam Elektrik Girdisi (kWh)" }}
    />
  );
}
