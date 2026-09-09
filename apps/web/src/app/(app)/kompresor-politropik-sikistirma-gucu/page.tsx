"use client";

import { kompresorPolitropikSikistirmaGucu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KompresorPolitropikSikistirmaGucuPage() {
  return (
    <CalcPage
      module={kompresorPolitropikSikistirmaGucu}
      standardsLabel="Politropik Sıkıştırma"
      description="Politropik indeks, gaz sabiti, giriş sıcaklığı, basınç oranı ve kütlesel debiden, kompresörün sıkıştırma için gereken gücünü hesaplar."
      formula="w = n/(n-1)×R×T1×[(P2/P1)^((n-1)/n) - 1], Güç = w×ṁ"
      engineeringNote="Kompresör Sıkıştırma Sıcaklığı modülü çıkış sıcaklığını hesaplar; bu modül aynı sıkıştırma sürecinin gerektirdiği gücü hesaplar. n=1 izotermal, n=k (özgül ısı oranı) izentropik sıkıştırmaya karşılık gelir; gerçek kompresörler ikisi arasında bir politropik indekse sahiptir."
      fields={[
        {
          key: "politropikIndeks_n",
          label: "Politropik İndeks n",
          type: "number",
          min: 1,
          step: 0.05,
        },
        {
          key: "ozgulGazSabiti_R_JkgK",
          label: "Özgül Gaz Sabiti R (J/kgK)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "girisSicakligi_T1_K",
          label: "Giriş Sıcaklığı T1 (K)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "basincOrani_P2P1",
          label: "Basınç Oranı P2/P1",
          type: "number",
          min: 1,
          step: 0.5,
        },
        {
          key: "kutleselDebi_mdot_kgs",
          label: "Kütlesel Debi ṁ (kg/s)",
          type: "number",
          min: 0.01,
          step: 0.1,
        },
      ]}
      defaults={{
        politropikIndeks_n: 1.3,
        ozgulGazSabiti_R_JkgK: 287,
        girisSicakligi_T1_K: 293,
        basincOrani_P2P1: 6,
        kutleselDebi_mdot_kgs: 0.5,
      }}
      mainUnit="kW"
      mainValueKey="guc_kW"
      mainDecimals={1}
      intermediateLabels={{
        birimKutleIsi_Jkg: "Birim Kütle İşi (J/kg)",
      }}
    />
  );
}
