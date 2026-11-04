"use client";

import { akuPeukertBosalmaSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AkuPeukertBosalmaSuresiPage() {
  return (
    <CalcPage
      module={akuPeukertBosalmaSuresi}
      standardsLabel="Peukert denklemi (üretici eğrisiyle teyit edin)"
      description="Akünün anma kapasitesi, deşarj akımı ve Peukert üssünden gerçek boşalma süresini ve etkin kapasiteyi hesaplar."
      formula="t = H·(C/(I·H))^k  [saat]"
      engineeringNote="Peukert üssü k üretici verisidir (kurşun-asit tipik 1,1–1,3, lityumda ≈ 1,0–1,05). Sıcaklık, yaşlanma ve kesme gerilimi etkisi yoktur; kritik yedekleme için üretici deşarj tablosunu kullanın. Sabit akım kabul edilir."
      fields={[
        { key: "kapasite_Ah", label: "Anma Kapasitesi C (Ah)", type: "number", step: 10, min: 1 },
        { key: "referansSure_h", label: "Anma Deşarj Süresi H (saat)", type: "number", step: 1, min: 1 },
        { key: "akim_A", label: "Deşarj Akımı I (A)", type: "number", step: 1, min: 0.1 },
        { key: "peukertUssu", label: "Peukert Üssü k (1–1,6)", type: "number", step: 0.05, min: 1 },
      ]}
      defaults={{ kapasite_Ah: 100, referansSure_h: 20, akim_A: 20, peukertUssu: 1.2 }}
      mainUnit="saat"
      mainValueKey="bosalmaSuresi_h"
      mainDecimals={2}
      intermediateLabels={{
        bosalma_suresi_dk: "Boşalma Süresi (dk)",
        etkin_kapasite_Ah: "Etkin Kapasite (Ah)",
        kapasite_kullanimi_yuzde: "Anma Kapasitesinin Kullanımı (%)",
        referans_akim_A: "Anma Akımı C/H (A)",
      }}
    />
  );
}
