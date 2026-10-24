"use client";
import { CalcPage } from "@/components/calc-page";
import { evSicaklikKonforKontrolu } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={evSicaklikKonforKontrolu}
      fields={[
        { name: "ic_sicaklik_C", label: "İç Sıcaklık (°C)" },
        { name: "dis_sicaklik_C", label: "Dış Sıcaklık (°C)" },
      ]}
      defaults={{
        ic_sicaklik_C: 20,
        dis_sicaklik_C: 0,
      }}
      description="ISO 7730: Iç ortam sıcaklık konfor kontrolü (PMV/PPD indeksleri)"
      formula="PMV = (0.303×e^(-0.036P) + 0.0275) × L"
      engineeringNote="İnsan konforuna ait psikofizik model. PPD < %20 hedefi tercih edilir."
    />
  );
}
