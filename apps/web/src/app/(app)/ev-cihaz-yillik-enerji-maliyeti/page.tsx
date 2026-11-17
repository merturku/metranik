"use client";

import { evCihazYillikEnerjiMaliyeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvCihazYillikEnerjiMaliyetiPage() {
  return (
    <CalcPage
      module={evCihazYillikEnerjiMaliyeti}
      standardsLabel={"E = P·t"}
      description={"Cihaz gücü, günlük kullanım süresi ve çalışma oranından yıllık enerji tüketimini ve maliyetini hesaplar."}
      formula={"E = P·h·gün·kf/1000 (kWh/yıl);  Maliyet = E·fiyat"}
      engineeringNote={"Kullanım faktörü (kf), cihazın kullanım süresi içinde ortalama olarak anma gücünün ne kadarını çektiğini gösterir (örn. buzdolabı kompresörü ≈ 0,3–0,5). Fiyat vergiler dahil birim fiyatıdır; kademeli tarifede ortalama değer kullanın."}
      fields={[
        { key: "guc_W", label: "Cihaz Gücü (W)", type: "number", step: 50, min: 0.1 },
        { key: "gunlukSaat_h", label: "Günlük Kullanım (saat)", type: "number", step: 0.5, min: 0 },
        { key: "yilGun", label: "Yıllık Kullanım Günü", type: "number", step: 10, min: 1 },
        { key: "kf", label: "Kullanım Faktörü (0–1)", type: "number", step: 0.05, min: 0 },
        { key: "fiyat", label: "Birim Fiyat (₺/kWh)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ guc_W: 150, gunlukSaat_h: 8, yilGun: 365, kf: 0.5, fiyat: 3.5 }}
      mainUnit={"kWh/yıl"}
      mainValueKey={"yillikEnerji_kWh"}
      mainDecimals={1}
      intermediateLabels={{
        yillik_maliyet: "Yıllık Maliyet (₺)",
        aylik_maliyet: "Aylık Ortalama Maliyet (₺)",
        gunluk_kWh: "Günlük Tüketim (kWh)",
      }}
    />
  );
}
