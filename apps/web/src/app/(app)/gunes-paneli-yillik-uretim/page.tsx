"use client";

import { gunesPaneliYillikUretim } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GunesPaneliYillikUretimPage() {
  return (
    <CalcPage
      module={gunesPaneliYillikUretim}
      standardsLabel="Fiziksel Formül"
      description="Kurulu güneş paneli (GES) gücünden, güneşlenme saati ve sistem performans oranını kullanarak yıllık enerji üretim tahmini yapar."
      formula="Yıllık Üretim = Kurulu Güç × Güneşlenme Saati × Performans Oranı × 365"
      engineeringNote="Güneş paneli (GES) kapasite hesabı modülünün tersidir: burada tüketimden güce değil, kurulu güçten üretime gidilir. Performans oranı invertör, kablo, sıcaklık ve kirlilik kayıplarını tek katsayıda toplar (tipik 0.75-0.85)."
      fields={[
        {
          key: "kuruluGuc_kWp",
          label: "Kurulu Güç (kWp)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "guneslenmeSaati_h",
          label: "Günlük Güneşlenme Saati (h)",
          type: "number",
          min: 1,
          step: 0.1,
        },
        {
          key: "performansOrani",
          label: "Performans Oranı (0-1)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
      ]}
      defaults={{
        kuruluGuc_kWp: 5,
        guneslenmeSaati_h: 4.5,
        performansOrani: 0.8,
      }}
      mainUnit="kWh/yıl"
      mainValueKey="yillikUretim_kWh"
      intermediateLabels={{ gunlukUretim_kWh: "Günlük Üretim (kWh)" }}
    />
  );
}
