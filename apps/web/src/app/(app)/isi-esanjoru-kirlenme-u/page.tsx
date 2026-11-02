"use client";

import { isiEsanjoruKirlenmeU } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiEsanjoruKirlenmeUPage() {
  return (
    <CalcPage
      module={isiEsanjoruKirlenmeU}
      standardsLabel="TEMA — kirlenme direnci yöntemi"
      description="Taşınım katsayıları, cidar iletimi ve kirlenme dirençlerinden eşanjörün toplam ısı geçirgenliğini (temiz ve kirli) ve gerekli fazla alanı hesaplar."
      formula="1/U = 1/h1 + Rf1 + t/k + Rf2 + 1/h2"
      engineeringNote="Düz cidar yaklaşımıdır; borulu eşanjörde halka alanı farkı (iç/dış yüzey oranı) ihmal edilir. Kirlenme dirençleri TEMA tablolarından veya üretici verisinden girilir (su için tipik 0,0001–0,0004 m²K/W). Bulunan U, Eşanjör Boyutlandırma (LMTD) modülünde alan hesabına girdi olur; taşınım katsayıları için Boru İçi Taşınım Katsayısı modülü kullanılabilir."
      fields={[
        { key: "h1_Wm2K", label: "Sıcak Taraf Taşınım Katsayısı h1 (W/m²K)", type: "number", min: 1, step: 100 },
        { key: "h2_Wm2K", label: "Soğuk Taraf Taşınım Katsayısı h2 (W/m²K)", type: "number", min: 1, step: 100 },
        { key: "cidarKalinligi_mm", label: "Cidar Kalınlığı (mm)", type: "number", min: 0, step: 0.1 },
        { key: "cidarIletkenligi_WmK", label: "Cidar Isı İletkenliği k (W/mK)", type: "number", min: 0.1, step: 1 },
        { key: "kirlenme1_m2KW", label: "Sıcak Taraf Kirlenme Direnci Rf1 (m²K/W)", type: "number", min: 0, step: 0.0001 },
        { key: "kirlenme2_m2KW", label: "Soğuk Taraf Kirlenme Direnci Rf2 (m²K/W)", type: "number", min: 0, step: 0.0001 },
      ]}
      defaults={{ h1_Wm2K: 5000, h2_Wm2K: 3000, cidarKalinligi_mm: 1, cidarIletkenligi_WmK: 16, kirlenme1_m2KW: 0.0002, kirlenme2_m2KW: 0.0002 }}
      mainUnit="W/m²K (kirli U)"
      mainValueKey="U_kirli_Wm2K"
      mainDecimals={0}
      intermediateLabels={{
        U_temiz_Wm2K: "Temiz U (W/m²K)",
        cidar_direnci_m2KW: "Cidar Direnci (m²K/W)",
        toplam_kirlenme_m2KW: "Toplam Kirlenme Direnci (m²K/W)",
        kirlenme_ile_azalma_yuzde: "Kirlenme ile U Azalması (%)",
        fazla_alan_yuzde: "Gerekli Fazla Alan (%)",
      }}
    />
  );
}
