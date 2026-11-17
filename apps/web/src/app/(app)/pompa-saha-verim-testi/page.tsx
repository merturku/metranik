"use client";

import { pompaSahaVerimTesti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaSahaVerimTestiPage() {
  return (
    <CalcPage
      module={pompaSahaVerimTesti}
      standardsLabel={"ISO 9906"}
      description={"Sahada ölçülen debi, manometrik yükseklik ve elektrik gücünden pompa hidrolik gücünü ve pompa verimini hesaplar, garanti verimiyle toleranslı karşılaştırır."}
      formula={"Phid = ρ·g·Q·H;  Pmil = Pel·ηmotor;  ηpompa = Phid/Pmil"}
      engineeringNote={"Ölçüm doğruluğu (debi ±%2, yükseklik ±%1, güç ±%1) doğrudan verim belirsizliğine yansır. Verim toleransı ISO 9906 derecesine göre belirlenir (Sınıf 2'de yaklaşık %5 göreli; sürümden teyit edin). Motor verimi etiket/üretici eğrisinden, ölçüm yükündeki değeriyle girilmelidir. Hesaplanan verim %100'ü aşıyorsa ölçüm hatası vardır."}
      fields={[
        { key: "q_m3h", label: "Ölçülen Debi Q (m³/h)", type: "number", step: 5, min: 0.01 },
        { key: "h_m", label: "Ölçülen Manometrik Yükseklik H (m)", type: "number", step: 1, min: 0.01 },
        { key: "elektrikGucu_kW", label: "Motor Elektrik Gücü Pel (kW)", type: "number", step: 0.5, min: 0.01 },
        { key: "motorVerimi", label: "Motor Verimi (0–1)", type: "number", step: 0.01, min: 0.3 },
        { key: "garantiVerimi", label: "Garanti Pompa Verimi (0–1)", type: "number", step: 0.01, min: 0.05 },
        { key: "tolerans", label: "Verim Toleransı (göreli, 0–1)", type: "number", step: 0.01, min: 0 },
        { key: "yogunluk_kgm3", label: "Akışkan Yoğunluğu (kg/m³)", type: "number", step: 10, min: 1 },
      ]}
      defaults={{ q_m3h: 100, h_m: 30, elektrikGucu_kW: 11, motorVerimi: 0.9, garantiVerimi: 0.82, tolerans: 0.05, yogunluk_kgm3: 1000 }}
      mainUnit={""}
      mainValueKey={"pompaVerimi"}
      mainDecimals={3}
      intermediateLabels={{
        hidrolik_guc_kW: "Hidrolik Güç (kW)",
        mil_gucu_kW: "Mil Gücü (kW)",
        toplam_verim: "Toplam (Pompa+Motor) Verim",
        kabul_alt_siniri: "Kabul Alt Sınırı",
      }}
    />
  );
}
