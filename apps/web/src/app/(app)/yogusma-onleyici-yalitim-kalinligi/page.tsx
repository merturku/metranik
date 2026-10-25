"use client";

import { yogusmaOnleyiciYalitimKalinligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YogusmaOnleyiciYalitimKalinligiPage() {
  return (
    <CalcPage
      module={yogusmaOnleyiciYalitimKalinligi}
      standardsLabel="EN ISO 12241"
      description="Soğutma suyu veya soğuk su taşıyan borunun yalıtım dış yüzeyinin, ortam havasının çiy noktasının altına düşmemesi için gereken asgari yalıtım kalınlığını hesaplar."
      formula="Tyüzey = Tortam − (Tortam − Takışkan)·Rdış/(Ryalıtım + Rdış),  Ryalıtım = ln(D2/D1)/(2πλ),  Rdış = 1/(he·π·D2),  Tyüzey = Tçiy + pay"
      engineeringNote="Tasarım ortam koşulu, borunun geçtiği mahaldeki en olumsuz sıcaklık/nem birlikteliği olmalıdır (örn. yaz aylarında tesisat şaftı veya otopark). Düşük he güvenli taraftadır: durgun iç ortam havası ve parlak (düşük yayıcılıklı) kaplamalarda he daha düşüktür. Hesap yalnız yüzey yoğuşmasını önler; buhar kesici katmanın sürekliliği ayrıca sağlanmalıdır, aksi halde nem yalıtımın içinde yoğuşur. Bulunan kalınlık bir üst ticari kalınlığa yuvarlanmalıdır."
      fields={[
        { key: "boruDisCapi_D1_mm", label: "Boru Dış Çapı D1 (mm)", type: "number", min: 5, step: 1 },
        { key: "akiskanSicakligi_C", label: "Akışkan Sıcaklığı (°C)", type: "number", min: -40, step: 1 },
        { key: "ortamSicakligi_C", label: "Ortam Sıcaklığı (°C)", type: "number", min: -10, step: 1 },
        { key: "bagilNem_yuzde", label: "Ortam Bağıl Nemi (%)", type: "number", min: 1, step: 5 },
        { key: "yalitimIletkenligi_lambda_WmK", label: "Yalıtım Isıl İletkenliği λ (W/mK)", type: "number", min: 0.01, step: 0.001 },
        { key: "disYuzeyIsiTasinim_he_Wm2K", label: "Dış Yüzey Isı Taşınım Katsayısı he (W/m²K)", type: "number", min: 1, step: 0.5 },
        { key: "guvenlikPayi_C", label: "Güvenlik Payı (°C)", type: "number", min: 0, step: 0.5 },
      ]}
      defaults={{
        boruDisCapi_D1_mm: 60.3,
        akiskanSicakligi_C: 6,
        ortamSicakligi_C: 30,
        bagilNem_yuzde: 70,
        yalitimIletkenligi_lambda_WmK: 0.035,
        disYuzeyIsiTasinim_he_Wm2K: 6,
        guvenlikPayi_C: 0,
      }}
      mainUnit="mm"
      mainValueKey="yalitimKalinligi_mm"
      mainDecimals={1}
      intermediateLabels={{
        ciy_noktasi_C: "Ortam Çiy Noktası (°C)",
        hedef_yuzey_sicakligi_C: "Hedef Yüzey Sıcaklığı (°C)",
        yalitim_dis_capi_D2_mm: "Yalıtım Dış Çapı D2 (mm)",
        yuzey_sicakligi_C: "Çözümdeki Yüzey Sıcaklığı (°C)",
        isi_kazanci_Wm: "Birim Boy Isı Kazancı (W/m)",
      }}
    />
  );
}
