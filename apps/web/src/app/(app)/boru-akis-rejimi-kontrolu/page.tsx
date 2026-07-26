"use client";

import { boruAkisRejimiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruAkisRejimiKontroluPage() {
  return (
    <CalcPage
      module={boruAkisRejimiKontrolu}
      standardsLabel="Reynolds Sayısı (Klasik Akışkanlar Mekaniği)"
      description="Akışkan yoğunluğu, akış hızı, boru çapı ve viskoziteye göre Reynolds sayısını hesaplar ve akışın laminer, geçiş veya türbülanslı rejimde olduğunu belirler."
      formula="Re = ρ×v×D / μ"
      engineeringNote="Re<2300 laminer, 2300-4000 geçiş bölgesi, Re>4000 türbülanslıdır. Çoğu HVAC/sıhhi tesisat hattında türbülanslı akış normaldir; bu sınıflandırma sürtünme kaybı hesabında hangi korelasyonun (Darcy-Weisbach vb.) kullanılacağını belirler."
      fields={[
        {
          key: "yogunluk_rho_kgm3",
          label: "Akışkan Yoğunluğu ρ (kg/m³)",
          type: "number",
          min: 1,
          step: 10,
        },
        { key: "akisHizi_v_ms", label: "Akış Hızı v (m/s)", type: "number", min: 0.01, step: 0.1 },
        {
          key: "boruIcCapi_D_m",
          label: "Boru İç Çapı D (m)",
          type: "number",
          min: 0.001,
          step: 0.005,
        },
        {
          key: "dinamikViskozite_mu_Pas",
          label: "Dinamik Viskozite μ (Pa·s)",
          type: "number",
          min: 0.0000001,
          step: 0.0001,
        },
      ]}
      defaults={{
        yogunluk_rho_kgm3: 1000,
        akisHizi_v_ms: 2,
        boruIcCapi_D_m: 0.05,
        dinamikViskozite_mu_Pas: 0.001,
      }}
      mainUnit=""
      mainValueKey="reynoldsSayisi_Re"
      mainDecimals={0}
      intermediateLabels={{
        dinamikViskozite_mu_Pas: "Dinamik Viskozite (Pa·s)",
        akisRejimi: "Akış Rejimi",
      }}
    />
  );
}
