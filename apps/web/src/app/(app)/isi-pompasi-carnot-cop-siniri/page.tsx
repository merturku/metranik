"use client";

import { isiPompasiCarnotCopSiniri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiPompasiCarnotCopSiniriPage() {
  return (
    <CalcPage
      module={isiPompasiCarnotCopSiniri}
      standardsLabel="Termodinamik 2. Yasa"
      description="Sıcak ve soğuk kaynak sıcaklıklarından, herhangi bir ısı pompasının aşamayacağı Carnot COP üst sınırını hesaplar ve gerçek COP'un fiziksel olarak geçerli olup olmadığını kontrol eder."
      formula="COP_carnot = Tsıcak/(Tsıcak-Tsoğuk) (Kelvin)"
      engineeringNote="Isı Pompası Kompresör Gücü ve SPF modülleri gerçek COP'u girdi olarak alır; bu modül o COP'un termodinamiğin ikinci yasasını ihlal edip etmediğini doğrular — gerçek COP, Carnot sınırını asla aşamaz."
      fields={[
        {
          key: "sicakKaynakSicakligi_Tsicak_C",
          label: "Sıcak Kaynak Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "sogukKaynakSicakligi_Tsoguk_C",
          label: "Soğuk Kaynak Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "gercekCOP",
          label: "Gerçek COP",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        sicakKaynakSicakligi_Tsicak_C: 45,
        sogukKaynakSicakligi_Tsoguk_C: 5,
        gercekCOP: 4.0,
      }}
      mainUnit=""
      mainValueKey="carnotCOP"
      mainDecimals={2}
      intermediateLabels={{
        verimlilikOrani_gercekCarnot: "Verimlilik Oranı (Gerçek/Carnot)",
      }}
    />
  );
}
