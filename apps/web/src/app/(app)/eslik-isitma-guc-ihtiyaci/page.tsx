"use client";

import { eslikIsitmaGucIhtiyaci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EslikIsitmaGucIhtiyaciPage() {
  return (
    <CalcPage
      module={eslikIsitmaGucIhtiyaci}
      standardsLabel={"IEC 62395-1 / IEEE 515"}
      description={"Yalıtımlı boruda donma koruması veya sıcaklık tutma için gereken birim boy ısı kaybını ve eşlik ısıtma kablosunun toplam gücünü hesaplar."}
      formula={"q = 2π·λ·(Tt − Ta)/ln(D2/D1)  (W/m);  P = q·L·(1 + pay)"}
      engineeringNote={"Silindirik iletim modeli; dış yüzey taşınım/rüzgar direnci ihmal edilir (tutucu). Vana, flanş ve askı kayıpları için ilave pay (genellikle %10–30) kullanılır; D2 = D1 + 2t. Kablo birim gücü ve maksimum devre uzunluğu üretici katalogundan seçilmelidir."}
      fields={[
        { key: "boruDisCapi_mm", label: "Boru Dış Çapı D1 (mm)", type: "number", step: 1, min: 1 },
        { key: "yalitimKalinligi_mm", label: "Yalıtım Kalınlığı t (mm)", type: "number", step: 5, min: 1 },
        { key: "lambda_WmK", label: "Yalıtım λ (W/mK)", type: "number", step: 0.005, min: 0.01 },
        { key: "tutulanSicaklik_C", label: "Tutulacak Sıcaklık Tt (°C)", type: "number", step: 1 },
        { key: "ortamSicakligi_C", label: "Asgari Ortam Sıcaklığı Ta (°C)", type: "number", step: 1 },
        { key: "uzunluk_m", label: "Boru Uzunluğu L (m)", type: "number", step: 5, min: 0.1 },
        { key: "pay", label: "Ek Kayıp Payı (0–1)", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ boruDisCapi_mm: 60.3, yalitimKalinligi_mm: 40, lambda_WmK: 0.04, tutulanSicaklik_C: 5, ortamSicakligi_C: -20, uzunluk_m: 100, pay: 0.2 }}
      mainUnit={"W/m"}
      mainValueKey={"birimKayip_Wm"}
      mainDecimals={2}
      intermediateLabels={{
        toplam_guc_W: "Toplam Gerekli Güç (W)",
        toplam_guc_kW: "Toplam Gerekli Güç (kW)",
        D2_mm: "Yalıtım Dış Çapı D2 (mm)",
      }}
    />
  );
}
