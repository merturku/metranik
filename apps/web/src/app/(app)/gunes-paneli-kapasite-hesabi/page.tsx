"use client";

import { gunesPaneliKapasiteHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GunesPaneliKapasiteHesabiPage() {
  return (
    <CalcPage
      module={gunesPaneliKapasiteHesabi}
      standardsLabel="Fiziksel Formül"
      description="Günlük enerji tüketimine ve güneşlenme saatine göre gerekli güneş paneli (GES) kurulu gücünü hesaplar."
      formula="Pkwp = Günlük Tüketim / (Güneşlenme Saati × Sistem Verimi)"
      engineeringNote="Güneşlenme saati bölgeye/mevsime göre değişir; sistem verimi invertör, kablo ve kirlilik kayıplarını içerir (tipik 0.75-0.85)."
      fields={[
        {
          key: "gunlukTuketim_kWh",
          label: "Günlük Tüketim (kWh)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "guneslenmeSaati_h",
          label: "Güneşlenme Saati (h/gün)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "sistemVerimi",
          label: "Sistem Verimi (örn. 0.8)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
      ]}
      defaults={{ gunlukTuketim_kWh: 10, guneslenmeSaati_h: 5, sistemVerimi: 0.8 }}
      mainUnit="kWp"
      mainValueKey="gerekliGuc_kWp"
      intermediateLabels={{
        guneslenmeSaati_h: "Güneşlenme Saati (h)",
        sistemVerimi: "Sistem Verimi",
      }}
    />
  );
}
