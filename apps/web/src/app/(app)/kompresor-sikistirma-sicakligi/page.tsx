"use client";

import { kompresorSikistirmaSicakligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KompresorSikistirmaSicakligiPage() {
  return (
    <CalcPage
      module={kompresorSikistirmaSicakligi}
      standardsLabel="İzentropik Sıkıştırma Bağıntısı"
      description="Giriş sıcaklığına ve basınç oranına göre kompresörden çıkan havanın izentropik sıkıştırma sıcaklığını hesaplar."
      formula="T2 = T1 × (P2/P1)^((k-1)/k)"
      engineeringNote="Bu, ideal (izentropik) sıkıştırma sıcaklığıdır; gerçek kompresörlerde verimsizlik nedeniyle çıkış sıcaklığı daha yüksek olur. Soğutma/ara soğutma sistemi tasarımında üst sınır olarak kullanılabilir."
      fields={[
        {
          key: "girisSicakligi_T1_C",
          label: "Giriş Sıcaklığı T1 (°C)",
          type: "number",
          min: -20,
          step: 1,
        },
        {
          key: "girisBasinci_P1_bar",
          label: "Giriş Basıncı P1 (bar)",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
        {
          key: "cikisBasinci_P2_bar",
          label: "Çıkış Basıncı P2 (bar)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
      ]}
      defaults={{ girisSicakligi_T1_C: 20, girisBasinci_P1_bar: 1, cikisBasinci_P2_bar: 8 }}
      mainUnit="°C"
      mainValueKey="cikisSicakligi_C"
      intermediateLabels={{
        basincOrani: "Basınç Oranı (P2/P1)",
        girisSicakligi_K: "Giriş Sıcaklığı (K)",
      }}
    />
  );
}
