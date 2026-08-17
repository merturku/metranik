"use client";

import { jeneratorOdasiHavalandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function JeneratorOdasiHavalandirmaPage() {
  return (
    <CalcPage
      module={jeneratorOdasiHavalandirma}
      standardsLabel="Yanma Havası + Enerji Dengesi"
      description="Jeneratör odası toplam havalandırma debisini, motorun yanma havası ihtiyacı ile odaya yayılan atık ısıyı taşımak için gereken soğutma havasının toplamı olarak hesaplar."
      formula="Q_toplam = (P × Yanma Hava Katsayısı) + Pkayıp / (cp·ρ·ΔT)"
      engineeringNote="Radyatör havası genelde ayrı bir kanalla doğrudan dışarı atılır; buradaki 'atık ısı' odaya yayılan motor/alternatör radyant kayıplarını temsil eder (toplam motor gücünün küçük bir kısmı). Yanma hava katsayısı üretici verisine göre değişir, dizel jeneratörlerde tipik olarak ~6-9 m³/h/kW aralığındadır."
      fields={[
        {
          key: "jeneratorGucu_P_kW",
          label: "Jeneratör Gücü P (kW)",
          type: "number",
          min: 10,
          step: 10,
        },
        {
          key: "yanmaHavaKatsayisi_m3h_kW",
          label: "Yanma Hava Katsayısı (m³/h/kW)",
          type: "number",
          min: 1,
          step: 0.5,
        },
        {
          key: "odayaYayilanAtikIsi_Pkayip_kW",
          label: "Odaya Yayılan Atık Isı (kW)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "izinVerilenSicaklikArtisi_dT_C",
          label: "İzin Verilen Sıcaklık Artışı ΔT (°C)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        jeneratorGucu_P_kW: 500,
        yanmaHavaKatsayisi_m3h_kW: 7,
        odayaYayilanAtikIsi_Pkayip_kW: 60,
        izinVerilenSicaklikArtisi_dT_C: 15,
      }}
      mainUnit="m³/h"
      mainValueKey="toplamHavaDebisi_m3h"
      intermediateLabels={{
        yanmaHavasi_m3h: "Yanma Havası (m³/h)",
        sogutmaHavasi_m3h: "Soğutma Havası (m³/h)",
      }}
    />
  );
}
