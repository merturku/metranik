"use client";

import { motorAnmaAkimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MotorAnmaAkimiPage() {
  return (
    <CalcPage
      module={motorAnmaAkimi}
      standardsLabel="IEC 60034-1"
      description="Üç fazlı asenkron motorun etiket (mil) gücü, gerilimi, verimi ve güç faktöründen şebekeden çektiği anma akımını hesaplar."
      formula="I = (Pmil / η) / (√3 × U × cosφ)"
      engineeringNote="IEC 60034-1'e göre motor etiketindeki güç mildeki mekanik güçtür, şebekeden çekilen güç değildir; verim ve güç faktörü etiketten alınmalıdır. Bulunan akım, Motor Yol Verme Akımı ve kablo kesiti hesaplarının girdisidir. Kısmi yükte verim ve cosφ düştüğü için akım orantılı azalmaz."
      fields={[
        { key: "milGucu_kW", label: "Mil Gücü Pmil (kW)", type: "number", min: 0.1, step: 0.5 },
        { key: "gerilim_V", label: "Fazlar Arası Gerilim U (V)", type: "number", min: 1, step: 10 },
        { key: "verim_yuzde", label: "Verim η (%)", type: "number", min: 1, step: 0.5 },
        { key: "gucFaktoru_cosfi", label: "Güç Faktörü cosφ", type: "number", min: 0.1, step: 0.01 },
      ]}
      defaults={{
        milGucu_kW: 11,
        gerilim_V: 400,
        verim_yuzde: 87,
        gucFaktoru_cosfi: 0.87,
      }}
      mainUnit="A"
      mainValueKey="anmaAkimi_A"
      mainDecimals={2}
      intermediateLabels={{
        giris_gucu_kW: "Şebekeden Çekilen Güç (kW)",
        gorunur_guc_kVA: "Görünür Güç (kVA)",
      }}
    />
  );
}
