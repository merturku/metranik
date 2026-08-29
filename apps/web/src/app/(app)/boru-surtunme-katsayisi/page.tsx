"use client";

import { boruSurtunmeKatsayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruSurtunmeKatsayisiPage() {
  return (
    <CalcPage
      module={boruSurtunmeKatsayisi}
      standardsLabel="Swamee-Jain Denklemi"
      description="Reynolds sayısı, boru iç çapı ve mutlak pürüzlülükten, Darcy-Weisbach sürtünme katsayısını (f) hesaplar. Boru Basınç Kaybı modülünün doğrudan girdi olarak aldığı f değerini üretir."
      formula="f = 0.25 / [log10(ε/(3.7D) + 5.74/Re^0.9)]²"
      engineeringNote="Colebrook-White denkleminin iteratifsiz (açık) yaklaşımıdır, Re>4000 türbülanslı akış için geçerlidir. Reynolds sayısı Boru Akış Rejimi modülünden alınabilir."
      fields={[
        {
          key: "reynoldsSayisi_Re",
          label: "Reynolds Sayısı Re",
          type: "number",
          min: 4001,
          step: 1000,
        },
        {
          key: "boruIcCapi_D_m",
          label: "Boru İç Çapı D (m)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "mutlakPuruzluluk_epsilon_m",
          label: "Mutlak Pürüzlülük ε (m)",
          type: "number",
          min: 0.000001,
          step: 0.000005,
        },
      ]}
      defaults={{
        reynoldsSayisi_Re: 100000,
        boruIcCapi_D_m: 0.1,
        mutlakPuruzluluk_epsilon_m: 0.000045,
      }}
      mainUnit=""
      mainValueKey="surtunmeKatsayisi_f"
      mainDecimals={4}
      intermediateLabels={{
        goreliPuruzluluk: "Göreli Pürüzlülük (ε/D)",
        toplamTerim: "Logaritma İçi Toplam Terim",
      }}
    />
  );
}
