"use client";

import { kazanBlofOraniTds } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KazanBlofOraniTdsPage() {
  return (
    <CalcPage
      module={kazanBlofOraniTds}
      standardsLabel={"TDS kütle dengesi / EN 12953-10"}
      description={"Besi suyu ve kazan suyu TDS değerlerinden blöf debisini, blöf oranını ve gereken besi suyu debisini hesaplar."}
      formula={"B = S·Sf/(Sk − Sf);  F = S + B;  Blöf oranı = B/F = Sf/Sk"}
      engineeringNote={"Sf besi suyu, Sk izin verilen kazan suyu TDS'idir (ppm veya µS/cm, aynı birimde). Kazan suyu üst sınırı kazan tipine ve basıncına göre üretici/EN 12953-10 tablosundan alınır. Sürekli blöf kütle dengesidir; ısı geri kazanım (flaş tankı) bu modülde yoktur. Kazan Besi Suyu modülünün blöf oranı girdisini üretir."}
      fields={[
        { key: "buharDebisi_kgh", label: "Buhar Debisi S (kg/h)", type: "number", step: 500, min: 1 },
        { key: "tdsBesi_ppm", label: "Besi Suyu TDS Sf (ppm)", type: "number", step: 10, min: 0.1 },
        { key: "tdsKazan_ppm", label: "İzin Verilen Kazan Suyu TDS Sk (ppm)", type: "number", step: 100, min: 1 },
      ]}
      defaults={{ buharDebisi_kgh: 10000, tdsBesi_ppm: 200, tdsKazan_ppm: 3000 }}
      mainUnit={"kg/h"}
      mainValueKey={"blofDebisi_kgh"}
      mainDecimals={1}
      intermediateLabels={{
        besi_suyu_debisi_kgh: "Besi Suyu Debisi F (kg/h)",
        blof_orani_besi_pct: "Blöf Oranı B/F (%)",
        blof_orani_buhar_pct: "Blöf Oranı B/S (%)",
      }}
    />
  );
}
