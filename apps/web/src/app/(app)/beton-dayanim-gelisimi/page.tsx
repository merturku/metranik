"use client";

import { betonDayanimGelisimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonDayanimGelisimiPage() {
  return (
    <CalcPage
      module={betonDayanimGelisimi}
      standardsLabel="EN 1992-1-1 §3.1.2"
      description="Betonun yaşa göre basınç dayanımını (fcm(t), fck(t)) hesaplar ve hedef dayanıma ulaşılan günü bulur."
      formula="fcm(t) = βcc(t)·fcm;  βcc(t) = exp{ s·[1 − √(28/t)] };  fcm = fck + 8;  t = 28/(1 − ln[(hedef+8)/fcm]/s)²"
      engineeringNote="s katsayısı çimento sınıfına bağlıdır (hızlı 0,20 / normal 0,25 / yavaş 0,38). 20 °C standart kür kabulüdür; soğuk havada Beton Olgunluk modülüyle eşdeğer yaşı hesaplayın. Kalıp alma kararı şantiye numune sonuçlarına dayanmalıdır. 28. günden sonra fck(t) = fck alınır."
      fields={[
        { key: "fck_MPa", label: "Karakteristik Dayanım fck (MPa)", type: "number", step: 1, min: 5 },
        { key: "yas_gun", label: "Beton Yaşı t (gün, 3–1000)", type: "number", step: 1, min: 3 },
        { key: "cimento", label: "Çimento Sertleşme Hızı", type: "select", options: [{ value: "hizli", label: "Hızlı (CEM 42.5R, 52.5)" }, { value: "normal", label: "Normal (CEM 32.5R, 42.5N)" }, { value: "yavas", label: "Yavaş (CEM 32.5N)" }] },
        { key: "hedefDayanim_MPa", label: "Hedef Dayanım (MPa, < fck)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ fck_MPa: 25, yas_gun: 7, cimento: "normal", hedefDayanim_MPa: 15 }}
      mainUnit="MPa"
      mainValueKey="fckT_MPa"
      mainDecimals={2}
      intermediateLabels={{
        s_katsayisi: "s Katsayısı",
        beta_cc: "βcc(t)",
        fcm_MPa: "fcm (MPa)",
        fcm_t_MPa: "fcm(t) (MPa)",
        hedefe_ulasma_gunu: "Hedefe Ulaşma Günü",
      }}
    />
  );
}
