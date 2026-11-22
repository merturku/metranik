"use client";

import { kirisKesmeGerilmesiJourawski } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KirisKesmeGerilmesiJourawskiPage() {
  return (
    <CalcPage
      module={kirisKesmeGerilmesiJourawski}
      standardsLabel={'Klasik mukavemet (Jourawski)'}
      description={'Dikdörtgen veya I kesitli kirişte kesme kuvvetinden oluşan en büyük kesme gerilmesini ve gövde–başlık birleşimi gerilmesini hesaplar.'}
      formula={'τ = V·Q/(I·b);  dikdörtgen: τmaks = 1,5·V/A;  I kesit: Qn = bf·tf·(h−tf)/2 + tw·(h−2tf)²/8'}
      engineeringNote={'Simetrik I kesit kabulü, başlıktaki kesme gerilmesi ihmal edilir. İzin verilen gerilme malzeme ve yönetmeliğe göre girilir (çelik için yaklaşık fy/(√3·γM)). Gövde burkulması ve bileşik gerilme ayrıca kontrol edilmelidir.'}
      fields={[
        { key: "kesitTipi", label: "Kesit Tipi", type: "select", options: [{ value: "dikdortgen", label: "Dikdörtgen" }, { value: "i_kesit", label: "I Kesit" }] },
        { key: "kesmeKuvveti_V_kN", label: "Kesme Kuvveti V (kN)", type: "number", step: 5, min: 0 },
        { key: "yukseklik_h_mm", label: "Yükseklik h (mm)", type: "number", step: 10, min: 1 },
        { key: "genislik_b_mm", label: "Genişlik / Başlık bf (mm)", type: "number", step: 10, min: 1 },
        { key: "govdeKalinligi_tw_mm", label: "Gövde Kalınlığı tw (mm)", type: "number", step: 1, min: 1 },
        { key: "baslikKalinligi_tf_mm", label: "Başlık Kalınlığı tf (mm)", type: "number", step: 1, min: 1 },
        { key: "izinVerilenGerilme_MPa", label: "İzin Verilen Kesme Gerilmesi (MPa)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ kesitTipi: "i_kesit", kesmeKuvveti_V_kN: 50, yukseklik_h_mm: 200, genislik_b_mm: 100, govdeKalinligi_tw_mm: 8, baslikKalinligi_tf_mm: 12, izinVerilenGerilme_MPa: 100 }}
      mainUnit={'MPa'}
      mainValueKey={'maksKesmeGerilmesi_MPa'}
      mainDecimals={2}
      intermediateLabels={{
        I_mm4: "I (mm⁴)",
        Q_notr_eksen_mm3: "Q nötr eksen (mm³)",
        tau_govde_baslik_birlesimi_MPa: "τ gövde–başlık (MPa)",
        ortalama_govde_tau_MPa: "Ortalama Gövde τ (MPa)",
        A_mm2: "A (mm²)",
        ortalama_tau_MPa: "Ortalama τ (MPa)",
        gerilme_orani: "τmaks / τizin",
      }}
    />
  );
}
