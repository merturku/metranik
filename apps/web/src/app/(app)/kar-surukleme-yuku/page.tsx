"use client";

import { karSuruklemeYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KarSuruklemeYukuPage() {
  return (
    <CalcPage
      module={karSuruklemeYuku}
      standardsLabel="EN 1991-1-3 Ek B"
      description="Parapet/duvar gibi bir engelin yanında biriken kar sürüklenmesi için sürükleme katsayısını ve yerel ek kar yükünü hesaplar. Kar Yükü Hesabı modülünün verdiği düzgün yayılı yükün üstüne, engel yakınında eklenir."
      formula="μw = γ×h/sk (0.8-4 arası sınırlı), s = μw×Ce×Ct×sk"
      engineeringNote="EN 1991-1-3 Ek B'nin basitleştirilmiş hâlidir; sürüklenmenin yayılma uzunluğu (b1, b2 geometrisi) burada modellenmemiştir, yalnız tepe (peak) yük hesaplanır. Tam geometri için standardın tam Ek B tablosuna bakılmalıdır."
      fields={[
        {
          key: "engelYuksekligi_h_m",
          label: "Engel Yüksekliği h (m)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "karOzgulAgirligi_gamma_kNm3",
          label: "Kar Özgül Ağırlığı γ (kN/m³)",
          type: "number",
          min: 1,
          step: 0.5,
        },
        {
          key: "karakteristikKarYuku_sk_kNm2",
          label: "Karakteristik Kar Yükü sk (kN/m²)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        {
          key: "maruziyetKatsayisi_Ce",
          label: "Maruziyet Katsayısı Ce",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
        {
          key: "isilKatsayi_Ct",
          label: "Isıl Katsayı Ct",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
        {
          key: "minSuruklemeKatsayisi_muMin",
          label: "Min Sürükleme Katsayısı μmin",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "maxSuruklemeKatsayisi_muMax",
          label: "Max Sürükleme Katsayısı μmax",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        engelYuksekligi_h_m: 1.5,
        karOzgulAgirligi_gamma_kNm3: 2,
        karakteristikKarYuku_sk_kNm2: 0.75,
        maruziyetKatsayisi_Ce: 1,
        isilKatsayi_Ct: 1,
        minSuruklemeKatsayisi_muMin: 0.8,
        maxSuruklemeKatsayisi_muMax: 4,
      }}
      mainUnit="kN/m²"
      mainValueKey="suruklemeYuku_s_kNm2"
      mainDecimals={2}
      intermediateLabels={{
        hesaplananSuruklemeKatsayisi_muw: "Hesaplanan μw (sınırsız)",
        sinirlanmisSuruklemeKatsayisi_muw: "Sınırlanmış μw",
      }}
    />
  );
}
