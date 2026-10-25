"use client";

import { topraklamaCubuguDirenci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TopraklamaCubuguDirenciPage() {
  return (
    <CalcPage
      module={topraklamaCubuguDirenci}
      standardsLabel="IEEE Std 142 (Dwight)"
      description="Tek bir düşey topraklama çubuğunun (kazık elektrot) zemin özdirenci, boyu ve çapından yayılma direncini hesaplar; hedef dirence ulaşmak için gereken çubuk boyunu bulur."
      formula="R = ρ / (2π·L) × [ln(8L/d) − 1]"
      engineeringNote="Zemin homojen kabul edilir; ρ, Wenner yöntemiyle elektrot derinliğine uygun elektrot aralığında ölçülmelidir ve mevsimle (kuru/donmuş zemin) önemli ölçüde değişir. Direnç boyla hızlı, çapla çok yavaş azalır; çapı büyütmek pratikte etkisizdir. Birden fazla çubuk paralel bağlandığında birbirlerini etkiler, toplam direnç R/n'den büyüktür (aralık en az çubuk boyu kadar olmalı). Hesaplanan değer kurulumdan sonra ölçümle doğrulanmalıdır (bkz. Topraklama Direnci Testi)."
      fields={[
        { key: "zeminOzdirenci_ohm_m", label: "Zemin Özdirenci ρ (Ωm)", type: "number", min: 1, step: 10 },
        { key: "cubukBoyu_L_m", label: "Gömülü Çubuk Boyu L (m)", type: "number", min: 0.5, step: 0.5 },
        { key: "cubukCapi_d_mm", label: "Çubuk Çapı d (mm)", type: "number", min: 5, step: 1 },
        { key: "hedefDirenc_ohm", label: "Hedef Yayılma Direnci (Ω)", type: "number", min: 0.1, step: 1 },
      ]}
      defaults={{
        zeminOzdirenci_ohm_m: 100,
        cubukBoyu_L_m: 3,
        cubukCapi_d_mm: 16,
        hedefDirenc_ohm: 25,
      }}
      mainUnit="Ω"
      mainValueKey="yayilmaDirenci_ohm"
      mainDecimals={2}
      intermediateLabels={{
        boy_cap_orani_L_d: "Boy/Çap Oranı L/d",
        logaritmik_terim: "ln(8L/d) − 1",
        hedef_icin_gerekli_boy_m: "Hedef İçin Gereken Boy (m)",
      }}
    />
  );
}
