"use client";

import { yildizUcgenYolVerme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YildizUcgenYolVermePage() {
  return (
    <CalcPage
      module={yildizUcgenYolVerme}
      standardsLabel="IEC 60034-12"
      description="Doğrudan yol verme değerlerinden yıldız-üçgen kalkışında hat akımını ve kalkış momentini hesaplar; yük momentiyle kıyaslayıp hızlanabilirliği değerlendirir."
      formula="I_Y = I_DOL/3;  T_Y = T_DOL/3;  marj = T_Y/T_yük"
      engineeringNote="Yıldızda sargı gerilimi 1/√3'e düşer; akım ve moment 1/3 olur. Yıldız momenti yük momentini en az %10 aşmalıdır; aksi hâlde motor yıldızda hızlanamaz. Açık geçişte üçgene geçiş anında akım darbesi olur. Motor Yol Verme Akımı modülü DOL değerini verir."
      fields={[
        { key: "dolKalkisAkimi_A", label: "DOL Kalkış Akımı (A)", type: "number", step: 1, min: 1 },
        { key: "dolKalkisMomenti_Nm", label: "DOL Kalkış Momenti (Nm)", type: "number", step: 5, min: 1 },
        { key: "yukKalkisMomenti_Nm", label: "Yük Kalkış Momenti (Nm)", type: "number", step: 5, min: 0 },
      ]}
      defaults={{ dolKalkisAkimi_A: 240, dolKalkisMomenti_Nm: 300, yukKalkisMomenti_Nm: 60 }}
      mainUnit="A"
      mainValueKey="yildizKalkisAkimi_A"
      mainDecimals={1}
      intermediateLabels={{
        yildiz_kalkis_momenti_Nm: "Yıldız Kalkış Momenti (Nm)",
        akim_azalmasi_yuzde: "Akım Azalması (%)",
        moment_marji_Ty_Tyuk: "Moment Marjı T_Y / T_yük",
      }}
    />
  );
}
