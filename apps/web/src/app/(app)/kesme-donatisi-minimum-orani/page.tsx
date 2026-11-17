"use client";

import { kesmeDonatisiMinimumOrani } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KesmeDonatisiMinimumOraniPage() {
  return (
    <CalcPage
      module={kesmeDonatisiMinimumOrani}
      standardsLabel={"TS 500 §8.1.5"}
      description={"Kirişte enine donatının asgari hacimsel oranını (ρw,min) ve seçilen etriye için buna karşılık gelen azami aralığı hesaplar."}
      formula={"ρw,min = 0,3·fctd/fywd;  fctd = 0,35·√fck/γc;  fywd = fywk/γs;  smaks = Asw/(ρw,min·b)"}
      engineeringNote={"TS 500 §8.1.5 minimum enine donatı koşuludur; hesaptan çıkan kesme donatısı ve TBDY 2018 (sıklaştırma bölgeleri, azami aralık d/2 ve 200 mm gibi) sınırları ayrıca sağlanmalıdır. γc = 1,5 ve γs = 1,15 alınmıştır. Asw, bir kesitteki etriye kollarının toplam alanıdır."}
      fields={[
        { key: "fck_MPa", label: "Beton Karakteristik Dayanımı fck (MPa)", type: "number", step: 5, min: 1 },
        { key: "fywk_MPa", label: "Etriye Karakteristik Akma Dayanımı fywk (MPa)", type: "number", step: 20, min: 100 },
        { key: "b_mm", label: "Kiriş Gövde Genişliği b (mm)", type: "number", step: 25, min: 1 },
        { key: "etriyeCapi_mm", label: "Etriye Çapı (mm)", type: "number", step: 2, min: 4 },
        { key: "kolSayisi", label: "Etriye Kolu Sayısı", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ fck_MPa: 30, fywk_MPa: 420, b_mm: 300, etriyeCapi_mm: 8, kolSayisi: 2 }}
      mainUnit={""}
      mainValueKey={"roMin"}
      mainDecimals={5}
      intermediateLabels={{
        fctd_MPa: "fctd (MPa)",
        fywd_MPa: "fywd (MPa)",
        Asw_mm2: "Etriye Toplam Alanı Asw (mm²)",
        s_maks_mm: "Azami Etriye Aralığı (mm)",
      }}
    />
  );
}
