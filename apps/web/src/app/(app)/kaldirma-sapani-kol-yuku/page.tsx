"use client";

import { kaldirmaSapaniKolYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KaldirmaSapaniKolYukuPage() {
  return (
    <CalcPage
      module={kaldirmaSapaniKolYuku}
      standardsLabel="TS EN 13414-1"
      description="Ekipman montajı veya şantiyede yük kaldırırken çok kollu sapanın her koluna gelen kuvveti kol açısından hesaplar ve sapan takımının çalışma yükü sınırını (WLL) EN 13414-1 katsayılarıyla kontrol eder."
      formula="T = W / (n · cos β),   WLLtakım = M × WLLtek kol   (2 kol: 1,4 / 1,0;  3–4 kol: 2,1 / 1,5;  β ≤ 45° / ≤ 60°)"
      engineeringNote="β, kolun düşeyle yaptığı açıdır; açı büyüdükçe kol kuvveti 1/cos β ile hızla artar ve 60°'nin üstünde kullanım yasaktır. 4 kollu sapanda yük rijitse kollar eşit yüklenmez; standart bu yüzden yükün 3 kola dağıldığını varsayar (asimetrik yükte 2 kol varsayın). Yük ağırlığına kaldırma aparatları (traversa, kilit, kanca) dahil edilmelidir. Boğma (choke) ve sepet bağlamada ek azaltma katsayıları uygulanır; bu hesap doğrudan bağlama içindir. Sapan etiketi ve periyodik muayene kaydı her zaman esastır."
      fields={[
        { key: "yukAgirligi_t", label: "Yük Ağırlığı W (t)", type: "number", min: 0.01, step: 0.5 },
        {
          key: "kolSayisi",
          label: "Kol Sayısı",
          type: "select",
          options: [
            { value: "1", label: "Tek kol (düşey)" },
            { value: "2", label: "2 kollu" },
            { value: "3", label: "3 kollu" },
            { value: "4", label: "4 kollu" },
          ],
        },
        { key: "kolAcisi_derece", label: "Kol Açısı β (düşeyle, °)", type: "number", min: 0, step: 5 },
        { key: "tekKolCalismaYuku_WLL_t", label: "Tek Kol Çalışma Yükü WLL (t)", type: "number", min: 0.01, step: 0.5 },
      ]}
      defaults={{
        yukAgirligi_t: 5,
        kolSayisi: "2",
        kolAcisi_derece: 30,
        tekKolCalismaYuku_WLL_t: 4,
      }}
      mainUnit="t (kol kuvveti)"
      mainValueKey="kolKuvveti_t"
      mainDecimals={2}
      intermediateLabels={{
        kol_kuvveti_kN: "Kol Kuvveti (kN)",
        yuku_tasiyan_kol_sayisi: "Yükü Taşıyan Kol Sayısı",
        aci_katsayisi_1_cosB: "Açı Katsayısı 1/cos β",
        takim_katsayisi_M: "Takım Katsayısı M",
        sapan_takimi_WLL_t: "Sapan Takımı WLL (t)",
      }}
    />
  );
}
