"use client";

import { silindirikKabukEtKalinligiAsme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SilindirikKabukEtKalinligiAsmePage() {
  return (
    <CalcPage
      module={silindirikKabukEtKalinligiAsme}
      standardsLabel={'ASME VIII-1 UG-27'}
      description={'İç basınçlı silindirik veya küresel kabuğun gerekli et kalınlığını (çevresel ve boyuna gerilmeden büyüğü + korozyon payı) hesaplar.'}
      formula={'Silindir: t = PR/(SE − 0,6P) ve t = PR/(2SE + 0,4P);  küre: t = PR/(2SE − 0,2P);  t_nihai = t + korozyon payı'}
      engineeringNote={'Formüller iç yarıçap ve iç basınç içindir; P ≤ 0,385·S·E (küre 0,665·S·E) ince cidar sınırıdır. İzin verilen gerilim S malzemenin ASME II-D tablosundan, E kaynak birleşim verimidir (radyografi düzeyine bağlı); değerleri şartnameden teyit edin. Dış basınç/vakum, kapak (dish) kalınlığı, nozul takviyesi ve rüzgar/deprem yükleri bu modülde yok. Tasarım basıncı işletme basıncından emniyet ventili ayarına göre büyük alınır.'}
      fields={[
        { key: "tasarimBasinci_MPa", label: "Tasarım Basıncı P (MPa)", type: "number", step: 0.1, min: 0.01 },
        { key: "icYaricap_mm", label: "İç Yarıçap R (mm)", type: "number", step: 10, min: 1 },
        { key: "izinVerilenGerilme_MPa", label: "İzin Verilen Gerilme S (MPa)", type: "number", step: 1, min: 1 },
        { key: "birlesimVerimi_E", label: "Birleşim Verimi E (0–1)", type: "number", step: 0.05, min: 0.1 },
        { key: "korozyonPayi_mm", label: "Korozyon Payı (mm)", type: "number", step: 0.5, min: 0 },
        { key: "kabukTipi", label: "Kabuk Tipi", type: "select", options: [
          { value: "silindir", label: "Silindirik" },
          { value: "kure", label: "Küresel" },
        ] },
      ]}
      defaults={{ tasarimBasinci_MPa: 1.5, icYaricap_mm: 500, izinVerilenGerilme_MPa: 138, birlesimVerimi_E: 0.85, korozyonPayi_mm: 1.5, kabukTipi: "silindir" }}
      mainUnit={'mm'}
      mainValueKey={'gerekliEtKalinligi_mm'}
      mainDecimals={2}
      intermediateLabels={{
        cevresel_t_mm: "Çevresel (Boyuna Dikiş) t (mm)",
        boyuna_t_mm: "Boyuna Gerilme t (mm)",
        kure_t_mm: "Küre t (mm)",
        korozyonsuz_t_mm: "Korozyonsuz t (mm)",
        korozyon_payi_mm: "Korozyon Payı (mm)",
        SE_MPa: "S·E (MPa)",
      }}
    />
  );
}
