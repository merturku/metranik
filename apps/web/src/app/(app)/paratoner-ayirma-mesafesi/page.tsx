"use client";

import { paratonerAyirmaMesafesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ParatonerAyirmaMesafesiPage() {
  return (
    <CalcPage
      module={paratonerAyirmaMesafesi}
      standardsLabel={"TS EN 62305-3 §6.3"}
      description={"Dış yıldırımlık sisteminin iletkenleriyle iç metal kısımlar arasında tehlikeli kıvılcım oluşmaması için gereken asgari ayırma mesafesini hesaplar."}
      formula={"s = ki·(kc/km)·l  (m)"}
      engineeringNote={"ki koruma seviyesine bağlıdır (LPL I: 0,08; II: 0,06; III–IV: 0,04), kc inen iletken sayısına göre akımın paylaşımını (1; ≈0,66; ≈0,44), km ayırma ortamının malzemesini (hava 1; beton/tuğla 0,5) temsil eder. l, mesafenin ölçüldüğü noktadan en yakın eş potansiyel bağlantıya kadar iletken boyudur. Katsayıları kullandığınız standart sürümünden teyit edin; üç ve daha fazla inen iletkende kc, yerleşime göre farklı hesaplanabilir."}
      fields={[
        { key: "lpl", label: "Yıldırımdan Korunma Seviyesi (LPL)", type: "select", options: [{ value: "1", label: "LPL I" }, { value: "2", label: "LPL II" }, { value: "3", label: "LPL III" }, { value: "4", label: "LPL IV" }] },
        { key: "inenIletkenSayisi", label: "Paratoner İnen İletken Sayısı", type: "select", options: [{ value: "1", label: "1 iletken" }, { value: "2", label: "2 iletken" }, { value: "3", label: "3 ve üzeri" }] },
        { key: "ortam", label: "Ayırma Ortamı", type: "select", options: [{ value: "hava", label: "Hava" }, { value: "beton", label: "Beton / Tuğla" }] },
        { key: "l_m", label: "İletken Boyu l (m)", type: "number", step: 1, min: 0.1 },
      ]}
      defaults={{ lpl: "3", inenIletkenSayisi: "2", ortam: "hava", l_m: 20 }}
      mainUnit={"m"}
      mainValueKey={"ayirmaMesafesi_m"}
      mainDecimals={3}
      intermediateLabels={{
        ki: "ki",
        kc: "kc",
        km: "km",
      }}
    />
  );
}
