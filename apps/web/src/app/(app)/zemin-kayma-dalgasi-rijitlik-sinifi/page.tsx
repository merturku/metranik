"use client";

import { zeminKaymaDalgasiRijitlikSinifi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminKaymaDalgasiRijitlikSinifiPage() {
  return (
    <CalcPage
      module={zeminKaymaDalgasiRijitlikSinifi}
      standardsLabel="G = ρVs² · TBDY 2018 Tablo 16.1"
      description="Kayma dalgası hızı ve yoğunluktan zeminin küçük şekil değiştirme kayma modülünü, elastisite modülünü, P dalgası hızını ve Vs30'a göre zemin sınıfını hesaplar."
      formula="G = ρ·Vs²;  E = 2G(1 + ν);  Vp = Vs·√[2(1−ν)/(1−2ν)];  ZA > 1500, ZB 760–1500, ZC 360–760, ZD 180–360, ZE < 180 m/s (Vs30)"
      engineeringNote="Zemin sınıfı yalnız üst 30 m ortalama kayma dalgası hızı (Vs30) için geçerlidir; eşikleri yönetmelikten teyit edin. ZF özel çalışma gerektirir. G küçük şekil değiştirme (Gmaks) değeridir; deprem ve temel yüklerinde büyük şekil değiştirmede çok daha düşüktür (G/Gmaks azalım eğrisi gerekir). TBDY Spektrum modülüne zemin sınıfı girdisi sağlar."
      fields={[
        { key: "kaymaDalgasiHizi_Vs_ms", label: "Kayma Dalgası Hızı Vs (m/s)", type: "number", step: 5, min: 1 },
        { key: "yogunluk_kgm3", label: "Yoğunluk ρ (kg/m³)", type: "number", step: 10, min: 1 },
        { key: "poisson_nu", label: "Poisson Oranı ν", type: "number", step: 0.01, min: 0 },
        { key: "vs30_ms", label: "Vs30 (m/s)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ kaymaDalgasiHizi_Vs_ms: 250, yogunluk_kgm3: 1900, poisson_nu: 0.3, vs30_ms: 250 }}
      mainUnit="MPa"
      mainValueKey="kaymaModulu_MPa"
      mainDecimals={1}
      intermediateLabels={{
        elastisite_modulu_MPa: "Elastisite Modülü E (MPa)",
        sikisma_dalgasi_hizi_Vp_ms: "Sıkışma Dalgası Hızı Vp (m/s)",
        zemin_sinifi: "Zemin Sınıfı (Vs30)",
        vs30_ms: "Vs30 (m/s)",
      }}
    />
  );
}
