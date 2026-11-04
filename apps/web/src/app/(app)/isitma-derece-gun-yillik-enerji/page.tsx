"use client";

import { isitmaDereceGunYillikEnerji } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsitmaDereceGunYillikEnerjiPage() {
  return (
    <CalcPage
      module={isitmaDereceGunYillikEnerji}
      standardsLabel="TS 825 — derece-gün yöntemi"
      description="Bina ısı kaybı katsayısı ve derece-gün değerinden yıllık ısıtma enerji ihtiyacını ve yakıt girişini hesaplar."
      formula="E = (UA + 0,335·n·V)·DG·24/1000  [kWh/yıl];   Yakıt = E/η"
      engineeringNote="İç ısı kazançları ve güneş kazancı ihmal edilir; DG, bina denge sıcaklığına (genelde 15 °C) göre seçilmelidir, aksi halde ihtiyaç fazla çıkar. Şehir DG değerleri TS 825 Ek tablolarından teyit edilmelidir. Aylık ayrıntılı hesap için Isıtma Yükü (TS 825) modülüne bakın."
      fields={[
        { key: "ua_WK", label: "İletim Isı Kaybı Katsayısı ΣU·A (W/K)", type: "number", step: 10, min: 1 },
        { key: "hacim_m3", label: "Isıtılan Hacim (m³)", type: "number", step: 10, min: 1 },
        { key: "havaDegisimi_1h", label: "Hava Değişim Sayısı n (1/h)", type: "number", step: 0.1, min: 0 },
        { key: "dereceGun_Kgun", label: "Isıtma Derece-Gün DG (K·gün)", type: "number", step: 100, min: 1 },
        { key: "sistemVerimi", label: "Sistem Verimi η (0–1)", type: "number", step: 0.05, min: 0.1 },
      ]}
      defaults={{ ua_WK: 200, hacim_m3: 300, havaDegisimi_1h: 0.5, dereceGun_Kgun: 2500, sistemVerimi: 0.9 }}
      mainUnit="kWh/yıl"
      mainValueKey="yillikIhtiyac_kWh"
      mainDecimals={0}
      intermediateLabels={{
        havalandirma_kayip_katsayisi_WK: "Havalandırma Kayıp Katsayısı (W/K)",
        toplam_kayip_katsayisi_WK: "Toplam Kayıp Katsayısı (W/K)",
        yillik_ihtiyac_MWh: "Yıllık İhtiyaç (MWh)",
        yakit_girisi_kWh: "Yakıt Girişi (kWh/yıl)",
        yakit_girisi_GJ: "Yakıt Girişi (GJ/yıl)",
      }}
    />
  );
}
