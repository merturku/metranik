"use client";

import { fosseptikHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FosseptikHacmiPage() {
  return (
    <CalcPage
      module={fosseptikHacmi}
      standardsLabel={'EPA Onsite Wastewater Manual'}
      description={'Kullanıcı sayısı, bekletme süresi ve çamur birikiminden septik tank hacmini ve plan boyutlarını hesaplar.'}
      formula={'V = N·(q·t + s·T)/1000;  q: L/kişi·gün, t: bekletme (gün), s: çamur L/kişi·yıl, T: temizleme aralığı (yıl)'}
      engineeringNote={'Girdi değerleri (q, t, s) yerel yönetmelik ve belediye şartnamesine göre doğrulanmalıdır; asgari hacim, çok bölmeli tank ve çıkış sistemi bu hesapta yoktur.'}
      fields={[
        { key: "kisiSayisi", label: "Kişi Sayısı", type: "number", step: 1, min: 1 },
        { key: "gunlukAtikSu_Lkisigun", label: "Atık Su (L/kişi·gün)", type: "number", step: 10, min: 1 },
        { key: "beklemeSuresi_gun", label: "Bekletme Süresi (gün)", type: "number", step: 0.5, min: 0.1 },
        { key: "camurBirikimi_Lkisiyil", label: "Çamur Birikimi (L/kişi·yıl)", type: "number", step: 5, min: 0 },
        { key: "temizlemeAraligi_yil", label: "Temizleme Aralığı (yıl)", type: "number", step: 1, min: 0.5 },
        { key: "tankDerinligi_m", label: "Tank Derinliği (m)", type: "number", step: 0.1, min: 0.5 },
        { key: "enBoyOrani", label: "Boy/En Oranı", type: "number", step: 0.5, min: 1 },
      ]}
      defaults={{ kisiSayisi: 5, gunlukAtikSu_Lkisigun: 150, beklemeSuresi_gun: 2, camurBirikimi_Lkisiyil: 40, temizlemeAraligi_yil: 3, tankDerinligi_m: 1.5, enBoyOrani: 2 }}
      mainUnit={'m³'}
      mainValueKey={'toplamHacim_m3'}
      mainDecimals={2}
      intermediateLabels={{
        sivi_hacmi_m3: "Sıvı Hacmi (m³)",
        camur_hacmi_m3: "Çamur Hacmi (m³)",
        plan_alani_m2: "Plan Alanı (m²)",
        tank_eni_m: "Tank Eni (m)",
        tank_boyu_m: "Tank Boyu (m)",
        gunluk_atik_su_m3: "Günlük Atık Su (m³)",
      }}
    />
  );
}
