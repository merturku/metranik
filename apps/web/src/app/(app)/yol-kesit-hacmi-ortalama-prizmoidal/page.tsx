"use client";

import { yolKesitHacmiOrtalamaPrizmoidal } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YolKesitHacmiOrtalamaPrizmoidalPage() {
  return (
    <CalcPage
      module={yolKesitHacmiOrtalamaPrizmoidal}
      standardsLabel={"Ortalama alan / prizmoidal formül"}
      description={"İki uç kesit alanından ortalama alan yöntemiyle, orta kesit de biliniyorsa prizmoidal formülle hafriyat/dolgu hacmini hesaplar ve iki yöntem farkını verir."}
      formula={"Vort = L·(A1 + A2)/2;  Vpriz = L·(A1 + 4·Am + A2)/6"}
      engineeringNote={"Ortalama alan yöntemi pratik ama kesitler arasında alan doğrusal değişmiyorsa hacmi fazla verir; prizmoidal formül (Simpson) doğrusal olmayan değişimde daha doğrudur. Kesit aralığı L'yi yoldaki ardışık enkesit mesafesi olarak alın. Orta kesit alanı Am, iki uç kesit arasındaki ortadaki gerçek kesittir (ortalamaları değil)."}
      fields={[
        { key: "L_m", label: "Kesit Aralığı L (m)", type: "number", step: 5, min: 0.1 },
        { key: "a1_m2", label: "Başlangıç Kesit Alanı A1 (m²)", type: "number", step: 1, min: 0 },
        { key: "a2_m2", label: "Bitiş Kesit Alanı A2 (m²)", type: "number", step: 1, min: 0 },
        { key: "am_m2", label: "Orta Kesit Alanı Am (m²)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ L_m: 20, a1_m2: 30, a2_m2: 50, am_m2: 42 }}
      mainUnit={"m³"}
      mainValueKey={"prizmoidalHacim_m3"}
      mainDecimals={2}
      intermediateLabels={{
        ortalama_alan_hacmi_m3: "Ortalama Alan Hacmi (m³)",
        fark_m3: "Fark (Ortalama − Prizmoidal) (m³)",
        fark_pct: "Fark (%)",
      }}
    />
  );
}
