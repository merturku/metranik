"use client";

import { rlcSeriEmpedansRezonans } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function RlcSeriEmpedansRezonansPage() {
  return (
    <CalcPage
      module={rlcSeriEmpedansRezonans}
      standardsLabel="Seri RLC devre analizi"
      description="Seri RLC devresinin reaktansını, empedansını, akımını, faz açısını, rezonans frekansını ve kalite faktörünü hesaplar."
      formula="XL = 2πfL;  XC = 1/(2πfC);  Z = √(R² + (XL−XC)²);  f0 = 1/(2π√(LC));  Q = √(L/C)/R"
      engineeringNote="İdeal elemanlar ve sinüsoidal kalıcı durum varsayılır. Rezonansta Z = R ve akım en büyüktür; eleman gerilimleri kaynak geriliminden Q kat büyük olabilir. Kompanzasyon rezonans kontrolü şebeke için ayrı modüldür."
      fields={[
        { key: "direnc_ohm", label: "Direnç R (Ω)", type: "number", step: 0.1, min: 0.001 },
        { key: "enduktans_mH", label: "Endüktans L (mH)", type: "number", step: 1, min: 0.001 },
        { key: "kapasitans_uF", label: "Kapasitans C (µF)", type: "number", step: 1, min: 0.001 },
        { key: "frekans_Hz", label: "Frekans f (Hz)", type: "number", step: 1, min: 0.001 },
        { key: "gerilim_V", label: "Kaynak Gerilimi (V)", type: "number", step: 1, min: 0.001 },
      ]}
      defaults={{ direnc_ohm: 10, enduktans_mH: 100, kapasitans_uF: 100, frekans_Hz: 50, gerilim_V: 230 }}
      mainUnit="Ω"
      mainValueKey="empedans_ohm"
      mainDecimals={3}
      intermediateLabels={{
        enduktif_reaktans_ohm: "Endüktif Reaktans XL (Ω)",
        kapasitif_reaktans_ohm: "Kapasitif Reaktans XC (Ω)",
        net_reaktans_ohm: "Net Reaktans (Ω)",
        akim_A: "Akım (A)",
        faz_acisi_derece: "Faz Açısı (°)",
        guc_faktoru: "Güç Faktörü",
        rezonans_frekansi_Hz: "Rezonans Frekansı (Hz)",
        kalite_faktoru_Q: "Kalite Faktörü Q",
        karakter: "Devre Karakteri",
      }}
    />
  );
}
