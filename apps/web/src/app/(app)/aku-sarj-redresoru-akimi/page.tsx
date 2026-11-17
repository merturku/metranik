"use client";

import { akuSarjRedresoruAkimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AkuSarjRedresoruAkimiPage() {
  return (
    <CalcPage
      module={akuSarjRedresoruAkimi}
      standardsLabel={"Akü şarj akımı dengesi (C/t) — IEEE 485 ilkesi"}
      description={"Akü kapasitesi, hedef şarj süresi ve sürekli DC yükten redresörün çıkış akımını ve gücünü hesaplar."}
      formula={"Iredresör = I yük + k·C/t;  P = U·Iredresör"}
      engineeringNote={"k şarj verimsizliği katsayısıdır (kurşun-asit akülerde 1,1–1,2; Ah verimi yaklaşık %85–90). t, deşarj sonrası tam şarj için hedef süredir (genellikle 8–12 saat). Redresör çıkış gerilimi, şarj (yüzdürme/hızlı) gerilimi ve hücre sayısına göre seçilir. Gerilim ve verim, üretici verisinden teyit edilmelidir."}
      fields={[
        { key: "kapasite_Ah", label: "Akü Kapasitesi C (Ah)", type: "number", step: 10, min: 1 },
        { key: "sarjSuresi_h", label: "Hedef Şarj Süresi t (saat)", type: "number", step: 1, min: 1 },
        { key: "yukAkimi_A", label: "Sürekli DC Yük Akımı (A)", type: "number", step: 1, min: 0 },
        { key: "k", label: "Şarj Verimsizlik Katsayısı k", type: "number", step: 0.05, min: 1 },
        { key: "gerilim_V", label: "Çıkış Gerilimi (V)", type: "number", step: 2, min: 1 },
      ]}
      defaults={{ kapasite_Ah: 200, sarjSuresi_h: 10, yukAkimi_A: 15, k: 1.1, gerilim_V: 110 }}
      mainUnit={"A"}
      mainValueKey={"redresorAkimi_A"}
      mainDecimals={1}
      intermediateLabels={{
        sarj_akimi_A: "Şarj Akımı k·C/t (A)",
        redresor_gucu_kW: "Redresör Gücü (kW)",
      }}
    />
  );
}
