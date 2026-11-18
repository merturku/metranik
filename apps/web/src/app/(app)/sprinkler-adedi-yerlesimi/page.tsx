"use client";

import { sprinklerAdediYerlesimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SprinklerAdediYerlesimiPage() {
  return (
    <CalcPage
      module={sprinklerAdediYerlesimi}
      standardsLabel={"NFPA 13 / TS EN 12845 (yerleşim kuralları)"}
      description={"Dikdörtgen bir mahalde, sprinkler başına azami koruma alanı ve azami aralık sınırlarına uyan en az sprinkler sayısını ve ızgara aralıklarını hesaplar."}
      formula={"nx = ⌈L/Smaks⌉,  ny = ⌈W/Smaks⌉;  (L/nx)·(W/ny) ≤ Amaks olana kadar büyük aralıklı doğrultuda sprinkler eklenir"}
      engineeringNote={"Azami koruma alanı ve azami aralık tehlike sınıfına göre (örn. hafif tehlike ≈ 20 m², orta tehlike ≈ 12 m²; azami aralık ≈ 4,6 m) NFPA 13 / TS EN 12845'ten teyit edilerek girilir. Duvara azami mesafe (aralığın yarısı), asgari 1,8 m aralık, engeller, kirişler ve tavan eğimi bu modülde yoktur. Sprinkler debisi ve boru çapı ayrı modüllerle hesaplanır."}
      fields={[
        { key: "boy_m", label: "Mahal Boyu L (m)", type: "number", step: 1, min: 1 },
        { key: "en_m", label: "Mahal Eni W (m)", type: "number", step: 1, min: 1 },
        { key: "aMaks_m2", label: "Sprinkler Başına Azami Alan (m²)", type: "number", step: 0.5, min: 1 },
        { key: "sMaks_m", label: "Azami Aralık (m)", type: "number", step: 0.1, min: 0.5 },
      ]}
      defaults={{ boy_m: 20, en_m: 12, aMaks_m2: 12, sMaks_m: 4.6 }}
      mainUnit={"adet"}
      mainValueKey={"sprinklerAdedi"}
      mainDecimals={0}
      intermediateLabels={{
        nx: "Boy Doğrultusunda Sıra",
        ny: "En Doğrultusunda Sıra",
        aralik_x_m: "Boy Aralığı (m)",
        aralik_y_m: "En Aralığı (m)",
        sprinkler_basina_alan_m2: "Sprinkler Başına Alan (m²)",
      }}
    />
  );
}
