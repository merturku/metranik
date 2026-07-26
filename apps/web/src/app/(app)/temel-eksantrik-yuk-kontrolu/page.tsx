"use client";

import { temelEksantrikYukKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TemelEksantrikYukKontroluPage() {
  return (
    <CalcPage
      module={temelEksantrikYukKontrolu}
      standardsLabel="Elastik Zemin Gerilmesi Dağılımı"
      description="Eksenel yük ve moment etkisindeki dikdörtgen bir temelde taban zemin gerilmesini hesaplar; dışmerkezliğin çekirdek (kern) sınırı içinde kalıp kalmadığını ve maksimum gerilmenin izin verilen taşıma gücünü aşıp aşmadığını kontrol eder."
      formula="q = N/A ± M/W, e = M/N ≤ L/6"
      engineeringNote="e>L/6 olursa taban bir bölgede zeminden ayrılır (çekme oluşur), doğrusal q=N/A±M/W formülü artık geçerli değildir ve etkin taban alanı yöntemiyle yeniden hesap gerekir."
      fields={[
        { key: "eksenelYuk_N_kN", label: "Eksenel Yük N (kN)", type: "number", min: 1, step: 10 },
        { key: "moment_M_kNm", label: "Moment M (kNm)", type: "number", min: 0, step: 10 },
        {
          key: "temelUzunlugu_L_m",
          label: "Temel Uzunluğu L (m, moment doğrultusunda)",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
        {
          key: "temelGenisligi_B_m",
          label: "Temel Genişliği B (m)",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
        {
          key: "izinVerilenTasimaGucu_qadm_kPa",
          label: "İzin Verilen Taşıma Gücü qadm (kPa)",
          type: "number",
          min: 10,
          step: 10,
        },
      ]}
      defaults={{
        eksenelYuk_N_kN: 800,
        moment_M_kNm: 200,
        temelUzunlugu_L_m: 3,
        temelGenisligi_B_m: 2,
        izinVerilenTasimaGucu_qadm_kPa: 250,
      }}
      mainUnit="kPa"
      mainValueKey="maksimumGerilme_qmax_kPa"
      intermediateLabels={{
        minimumGerilme_qmin_kPa: "Minimum Gerilme qmin (kPa)",
        disMerkezlik_e_m: "Dışmerkezlik e (m)",
        kernSiniri_L6_m: "Çekirdek Sınırı L/6 (m)",
        izinVerilenTasimaGucu_qadm_kPa: "İzin Verilen Taşıma Gücü (kPa)",
      }}
    />
  );
}
