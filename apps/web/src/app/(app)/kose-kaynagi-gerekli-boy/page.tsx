"use client";

import { koseKaynagiGerekliBoy } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KoseKaynagiGerekliBoyPage() {
  return (
    <CalcPage
      module={koseKaynagiGerekliBoy}
      standardsLabel={"TS EN 1993-1-8 §4.5.3.3"}
      description={"Aktarılacak kuvvet ve dikiş kalınlığına göre köşe kaynağının gereken etkin ve toplam boyunu hesaplar (Köşe Kaynağı Dikiş Kapasitesi'nin ters yönü)."}
      formula={"fvw,d = (fu/√3)/(βw·γM2);  Leff = F/(a·fvw,d) ≥ max(30 mm; 6a);  L = Leff + 2a"}
      engineeringNote={"Basitleştirilmiş yöntem: kuvvet, kaynağın etkin kesit alanına dik/paralel ayrımı yapılmadan bileşke kayma gerilmesiyle karşılanır. Etkin boy, minimum 30 mm ve 6a koşuluna uyar; dikiş boyu uçlardaki krater payıyla 2a artırılır. 150a'yı aşan uzun bindirmeli birleşimlerde azaltma (βLw) ayrıca uygulanmalıdır. βw değerleri çelik sınıfına göre (S235: 0,80; S275: 0,85; S355: 0,90) ilgili tablodan alınmalıdır."}
      fields={[
        { key: "f_kN", label: "Tasarım Kuvveti F (kN)", type: "number", step: 10, min: 0.1 },
        { key: "a_mm", label: "Dikiş Kalınlığı a (mm)", type: "number", step: 0.5, min: 1 },
        { key: "fu_MPa", label: "Çekme Dayanımı fu (MPa)", type: "number", step: 10, min: 100 },
        { key: "betaW", label: "Korelasyon Katsayısı βw", type: "number", step: 0.05, min: 0.5 },
        { key: "gammaM2", label: "Kısmi Katsayı γM2", type: "number", step: 0.05, min: 1 },
      ]}
      defaults={{ f_kN: 150, a_mm: 5, fu_MPa: 360, betaW: 0.8, gammaM2: 1.25 }}
      mainUnit={"mm"}
      mainValueKey={"dikisBoyu_mm"}
      mainDecimals={1}
      intermediateLabels={{
        fvw_d_MPa: "fvw,d (MPa)",
        birim_kapasite_Nmm: "Birim Boy Kapasitesi (N/mm)",
        etkin_boy_mm: "Etkin Boy Leff (mm)",
        asgari_boy_mm: "Asgari Etkin Boy (mm)",
      }}
    />
  );
}
