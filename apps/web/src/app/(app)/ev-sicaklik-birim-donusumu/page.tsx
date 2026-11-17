"use client";

import { evSicaklikBirimDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvSicaklikBirimDonusumuPage() {
  return (
    <CalcPage
      module={evSicaklikBirimDonusumu}
      standardsLabel={"SI / ABD birim dönüşümü"}
      description={"Verilen sıcaklığı Celsius, Kelvin, Fahrenheit ve Rankine birimlerine çevirir."}
      formula={"K = °C + 273,15;  °F = °C·9/5 + 32;  °R = K·9/5"}
      engineeringNote={"Mutlak sıfırın (−273,15 °C) altındaki değerler fiziksel değildir ve reddedilir. Sıcaklık farkı (ΔT) dönüşümünde ofset uygulanmaz: 1 K = 1 °C = 1,8 °F."}
      fields={[
        { key: "deger", label: "Sıcaklık Değeri", type: "number", step: 1 },
        { key: "birim", label: "Giriş Birimi", type: "select", options: [{ value: "C", label: "°C" }, { value: "K", label: "K" }, { value: "F", label: "°F" }, { value: "R", label: "°R" }] },
      ]}
      defaults={{ deger: 100, birim: "C" }}
      mainUnit={"°C"}
      mainValueKey={"celsius_C"}
      mainDecimals={2}
      intermediateLabels={{
        kelvin_K: "Kelvin (K)",
        fahrenheit_F: "Fahrenheit (°F)",
        rankine_R: "Rankine (°R)",
      }}
    />
  );
}
