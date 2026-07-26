"use client";

import { havaKompresoruSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavaKompresoruSecimiPage() {
  return (
    <CalcPage
      module={havaKompresoruSecimi}
      standardsLabel="Fiziksel Formül"
      description="Bağlı ekipmanların toplam hava tüketimine göre gerekli kompresör serbest hava debisini (FAD) hesaplar."
      formula="FAD = Toplam Tüketim × Eşzamanlılık K. × Güvenlik K."
      engineeringNote="Eşzamanlılık faktörü, tüm ekipmanın aynı anda tam kapasitede çalışmama olasılığını yansıtır; tesis tipine göre 0.6-0.9 arasında alınır."
      fields={[
        {
          key: "toplamHavaTuketimi_m3min",
          label: "Toplam Hava Tüketimi (m³/min)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "eszamanlilikFaktoru",
          label: "Eşzamanlılık Faktörü (0-1)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        {
          key: "guvenlikKatsayisi",
          label: "Güvenlik Katsayısı (örn. 1.2)",
          type: "number",
          min: 1,
          step: 0.05,
        },
      ]}
      defaults={{ toplamHavaTuketimi_m3min: 5, eszamanlilikFaktoru: 0.7, guvenlikKatsayisi: 1.2 }}
      mainUnit="m³/min"
      mainValueKey="gerekliFAD_m3min"
      intermediateLabels={{
        eszamanlilikFaktoru: "Eşzamanlılık Faktörü",
        guvenlikKatsayisi: "Güvenlik Katsayısı",
      }}
    />
  );
}
