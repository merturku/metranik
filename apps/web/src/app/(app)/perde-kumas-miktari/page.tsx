"use client";

import { perdeKumasMiktari } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PerdeKumasMiktariPage() {
  return (
    <CalcPage
      module={perdeKumasMiktari}
      standardsLabel="Perde dikim pratiği (şerit/panel yöntemi)"
      description="Pencere genişliği, pile katsayısı ve kumaş eninden gereken panel sayısını ve toplam kumaş uzunluğunu hesaplar."
      formula="W_t = W·pile + 2·yan;   n = ⌈W_t/kumaş eni⌉;   toplam = n·(H + etek/üst payı)"
      engineeringNote="Pile katsayısı: düz perde 1,5–2,0, ekstra pile 2,5–3,0. Desenli kumaşta desen tekrarına göre boy payı artırılmalıdır. Etek ve üst payı kıvrım ve rüşvet için (genelde 20–40 cm toplam). Panel sayısı yukarı yuvarlandığından kumaş enine göre fazla genişlik oluşabilir."
      fields={[
        { key: "pencereGenisligi_m", label: "Pencere / Korniş Genişliği (m)", type: "number", min: 0.1, step: 0.1 },
        { key: "perdeYuksekligi_m", label: "Perde Bitmiş Yüksekliği (m)", type: "number", min: 0.1, step: 0.1 },
        { key: "pileKatsayisi", label: "Pile Katsayısı (1–4)", type: "number", min: 1, step: 0.5 },
        { key: "kumasEni_m", label: "Kumaş Eni (m)", type: "number", min: 0.5, step: 0.1 },
        { key: "yanPayi_m", label: "Yan Dikiş Payı (m, her yan)", type: "number", min: 0, step: 0.05 },
        { key: "etekVeUstPayi_m", label: "Etek + Üst Payı (m)", type: "number", min: 0, step: 0.05 },
      ]}
      defaults={{ pencereGenisligi_m: 2, perdeYuksekligi_m: 2.5, pileKatsayisi: 2, kumasEni_m: 1.4, yanPayi_m: 0.1, etekVeUstPayi_m: 0.3 }}
      mainUnit="m (toplam kumaş uzunluğu)"
      mainValueKey="toplamKumas_m"
      mainDecimals={2}
      intermediateLabels={{
        gereken_genislik_m: "Gereken Toplam Genişlik (m)",
        panel_sayisi: "Panel (En) Sayısı",
        panel_boyu_m: "Panel Boyu (m)",
        toplam_kumas_alani_m2: "Kumaş Alanı (m²)",
      }}
    />
  );
}
