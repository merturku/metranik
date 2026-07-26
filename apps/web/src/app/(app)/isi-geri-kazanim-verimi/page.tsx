"use client";

import { isiGeriKazanimVerimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiGeriKazanimVerimiPage() {
  return (
    <CalcPage
      module={isiGeriKazanimVerimi}
      standardsLabel="Fiziksel Formül"
      description="Taze hava giriş/çıkış ve egzoz sıcaklıklarına göre ısı geri kazanım cihazının duyulur ısı verimini hesaplar."
      formula="ε = (Tçıkış − Tgiriş) / (Tegzoz − Tgiriş)"
      engineeringNote="Bu formül duyulur ısıyı kapsar; entalpi bazlı (gizli ısı dahil) verim için nem oranları da hesaba katılmalıdır."
      fields={[
        {
          key: "tazeHavaGirisSicakligi_C",
          label: "Taze Hava Giriş Sıcaklığı (°C)",
          type: "number",
          min: -30,
          step: 1,
        },
        {
          key: "tazeHavaCikisSicakligi_C",
          label: "Taze Hava Çıkış Sıcaklığı (°C)",
          type: "number",
          min: -30,
          step: 1,
        },
        {
          key: "egzozHavaSicakligi_C",
          label: "Egzoz Hava Sıcaklığı (°C)",
          type: "number",
          min: -30,
          step: 1,
        },
      ]}
      defaults={{
        tazeHavaGirisSicakligi_C: 0,
        tazeHavaCikisSicakligi_C: 15,
        egzozHavaSicakligi_C: 22,
      }}
      mainUnit="%"
      mainValueKey="verim_yuzde"
      intermediateLabels={{ sicaklikYukselmesi_C: "Sıcaklık Yükselmesi (°C)" }}
    />
  );
}
