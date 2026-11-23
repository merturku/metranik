"use client";

import { kazanDairesiHavalandirmaDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KazanDairesiHavalandirmaDebisiPage() {
  return (
    <CalcPage
      module={kazanDairesiHavalandirmaDebisi}
      standardsLabel={'Stokiyometri + enerji dengesi'}
      description={'Kazan dairesi için yanma havası ile yayılan ısıyı atan soğutma havasının toplam debisini hesaplar.'}
      formula={'V̇yanma = (P/Hu)·(2/0,21)·λ;  V̇soğutma = Qyayılan/(ρ·cp·ΔT);  toplam = yanma + soğutma'}
      engineeringNote={'Doğalgaz (CH4) kabulüyle teorik hava 9,524 Nm³/Nm³\'tür. Yayılan ısı oranı kazan yüzey kaybı ve boru ısı yayılımı için mühendis tahminidir (genelde %0,5–2). Toplamın alınması muhafazakârdır; açıklık alanları ve cebri havalandırma şartları için kazan dairesi yönetmeliğini ve kazan üreticisi verisini teyit edin.'}
      fields={[
        { key: "yakitGirisGucu_kW", label: "Yakıt Giriş Gücü (kW)", type: "number", step: 50, min: 1 },
        { key: "altIsilDeger_kWh_m3", label: "Alt Isıl Değer Hu (kWh/m³)", type: "number", step: 0.1, min: 0.1 },
        { key: "fazlaHavaKatsayisi", label: "Fazla Hava Katsayısı λ", type: "number", step: 0.05, min: 1 },
        { key: "yayilanIsiOrani_yuzde", label: "Yayılan Isı Oranı (%)", type: "number", step: 0.1, min: 0 },
        { key: "izinVerilenSicaklikArtisi_K", label: "İzin Verilen Sıcaklık Artışı ΔT (K)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ yakitGirisGucu_kW: 1000, altIsilDeger_kWh_m3: 9.59, fazlaHavaKatsayisi: 1.2, yayilanIsiOrani_yuzde: 1, izinVerilenSicaklikArtisi_K: 10 }}
      mainUnit={'m³/h'}
      mainValueKey={'toplamHavaDebisi_m3h'}
      mainDecimals={0}
      intermediateLabels={{
        gaz_debisi_m3h: "Gaz debisi (m³/h)",
        yanma_havasi_m3h: "Yanma havası (m³/h)",
        yayilan_isi_kW: "Yayılan ısı (kW)",
        sogutma_havasi_m3h: "Soğutma havası (m³/h)",
        yanma_havasi_orani: "Yanma havası payı",
      }}
    />
  );
}
