"use client";

import { basincliHavaDelikKacakDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BasincliHavaDelikKacakDebisiPage() {
  return (
    <CalcPage
      module={basincliHavaDelikKacakDebisi}
      standardsLabel={"ISO 6358 / sıkıştırılabilir orifis akışı"}
      description={"Basınçlı hava hattındaki delikten (kaçak) geçen havanın kütlesel ve serbest hava debisini, yıllık enerji kaybını ve maliyetini hesaplar."}
      formula={"Tıkanmış akış: ṁ = Cd·A·p0·√(γ/(R·T0))·(2/(γ+1))^((γ+1)/(2(γ−1)));  FAD = ṁ/ρ0"}
      engineeringNote={"Mutlak basınç oranı p0/pa ≥ 1,893 ise akış tıkanmıştır (sesüstü); altında alt-kritik orifis formülü kullanılır. Cd keskin kenarlı delikte ≈ 0,6–0,8. Serbest hava debisi 20 °C, 101 325 Pa referanslıdır. Özgül enerji (kWh/m³) kompresör verisinden alınmalıdır (yaygın 0,10–0,12)."}
      fields={[
        { key: "delikCapi_mm", label: "Delik Çapı (mm)", type: "number", step: 0.5, min: 0.1 },
        { key: "hatBasinci_barg", label: "Hat Basıncı (bar-g)", type: "number", step: 0.5, min: 0.01 },
        { key: "cd", label: "Boşalma Katsayısı Cd", type: "number", step: 0.05, min: 0.1 },
        { key: "ozgulEnerji_kWhm3", label: "Özgül Enerji (kWh/m³ FAD)", type: "number", step: 0.01, min: 0.01 },
        { key: "yillikSaat_h", label: "Yıllık Çalışma (saat)", type: "number", step: 100, min: 1 },
        { key: "elektrikFiyati", label: "Elektrik Birim Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ delikCapi_mm: 3, hatBasinci_barg: 7, cd: 0.8, ozgulEnerji_kWhm3: 0.11, yillikSaat_h: 8000, elektrikFiyati: 4 }}
      mainUnit={"m³/dk"}
      mainValueKey={"kacakDebisi_m3dk"}
      mainDecimals={3}
      intermediateLabels={{
        kutlesel_debi_kgs: "Kütlesel Debi (kg/s)",
        akis_rejimi: "Akış Rejimi",
        yillik_enerji_kWh: "Yıllık Enerji Kaybı (kWh)",
        yillik_maliyet: "Yıllık Maliyet (₺)",
      }}
    />
  );
}
