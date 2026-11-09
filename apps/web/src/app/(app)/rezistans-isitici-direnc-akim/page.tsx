"use client";

import { rezistansIsiticiDirencAkim } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function RezistansIsiticiDirencAkimPage() {
  return (
    <CalcPage
      module={rezistansIsiticiDirencAkim}
      standardsLabel="Ohm yasası"
      description="3 fazlı rezistanslı ısıtıcıda yıldız veya üçgen bağlantıya göre eleman gerilimini, direncini, eleman ve hat akımını hesaplar."
      formula="Pe = P/3;  Uf = U/√3 (Y) veya U (Δ);  R = Uf²/Pe;  I_hat = P/(√3·U)"
      engineeringNote="Aynı elemanlar yıldızdan üçgene geçince güç 3 katına çıkar. Rezistans malzemesinin sıcak direnç değişimi ve yüzey yükü ayrıca kontrol edilmelidir. Kontaktör ve kablo seçimi için hat akımını kullanın."
      fields={[
        { key: "toplamGuc_kW", label: "Toplam Güç (kW)", type: "number", step: 0.5, min: 0.1 },
        { key: "hatGerilimi_V", label: "Hat Gerilimi (V)", type: "number", step: 1, min: 1 },
        { key: "baglanti", label: "Bağlantı", type: "select", options: [{ value: "yildiz", label: "Yıldız (Y)" }, { value: "ucgen", label: "Üçgen (Δ)" }] },
      ]}
      defaults={{ toplamGuc_kW: 9, hatGerilimi_V: 400, baglanti: "yildiz" }}
      mainUnit="Ω"
      mainValueKey="elemanDirenci_ohm"
      mainDecimals={2}
      intermediateLabels={{
        eleman_gerilimi_V: "Eleman Gerilimi (V)",
        eleman_gucu_W: "Eleman Gücü (W)",
        eleman_akimi_A: "Eleman Akımı (A)",
        hat_akimi_A: "Hat Akımı (A)",
        diger_baglantida_guc_kW: "Diğer Bağlantıda Güç (kW)",
      }}
    />
  );
}
