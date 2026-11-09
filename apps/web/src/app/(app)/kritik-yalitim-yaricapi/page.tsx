"use client";

import { kritikYalitimYaricapi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KritikYalitimYaricapiPage() {
  return (
    <CalcPage
      module={kritikYalitimYaricapi}
      standardsLabel="Kritik yarıçap teorisi"
      description="Boru veya kablo yalıtımında kritik yarıçapı, yalıtımlı ve çıplak ısı kaybını ve yalıtımın ısı kaybını artırıp artırmadığını hesaplar."
      formula="r_kr = λ/h;  q' = ΔT/[ln(r₂/r₁)/(2πλ) + 1/(2π·r₂·h)];  q'₀ = 2π·r₁·h·ΔT"
      engineeringNote="r₁ < r_kr ise yalıtım kalınlığı r_kr'ye kadar ısı kaybını artırır; r_eq yarıçapına ulaşınca çıplak boruyla eşitlenir. Küçük çaplı borularda (≲ 10 mm) ve düşük iletkenlikli yalıtımda dikkat edin; sıcak su/buhar hatlarında r₁ genellikle r_kr'den büyüktür. h radyasyon dahil dış katsayıdır. Ayrıntılı kalınlık için Boru Isı Kaybı (İzolasyon) modülünü kullanın."
      fields={[
        { key: "boruDisYaricapi_r1_mm", label: "Boru Dış Yarıçapı r₁ (mm)", type: "number", step: 0.5, min: 0.1 },
        { key: "yalitimIletkenligi_lambda_WmK", label: "Yalıtım İletkenliği λ (W/mK)", type: "number", step: 0.005, min: 0.005 },
        { key: "disTasinimKatsayisi_h_Wm2K", label: "Dış Taşınım Katsayısı h (W/m²K)", type: "number", step: 1, min: 0.5 },
        { key: "yalitimDisYaricapi_r2_mm", label: "Yalıtım Dış Yarıçapı r₂ (mm)", type: "number", step: 0.5, min: 0.1 },
        { key: "sicaklikFarki_K", label: "Yüzey–Ortam ΔT (K)", type: "number", step: 1, min: 0.1 },
      ]}
      defaults={{ boruDisYaricapi_r1_mm: 2, yalitimIletkenligi_lambda_WmK: 0.04, disTasinimKatsayisi_h_Wm2K: 10, yalitimDisYaricapi_r2_mm: 4, sicaklikFarki_K: 50 }}
      mainUnit="mm"
      mainValueKey="kritikYaricap_mm"
      mainDecimals={2}
      intermediateLabels={{
        ciplak_isi_kaybi_Wm: "Çıplak Isı Kaybı (W/m)",
        yalitimli_isi_kaybi_Wm: "Yalıtımlı Isı Kaybı (W/m)",
        kayip_azalmasi_yuzde: "Kayıp Azalması (%)",
        esitlik_yaricapi_mm: "Eşitlik Yarıçapı r_eq (mm)",
        yalitim_kalinligi_mm: "Yalıtım Kalınlığı (mm)",
        not: "Not",
      }}
    />
  );
}
