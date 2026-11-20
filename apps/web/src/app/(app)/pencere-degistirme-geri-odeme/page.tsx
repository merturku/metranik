"use client";

import { pencereDegistirmeGeriOdeme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PencereDegistirmeGeriOdemePage() {
  return (
    <CalcPage
      module={pencereDegistirmeGeriOdeme}
      standardsLabel={"TS 825 (Q = U·A·ΔT, derece-gün)"}
      description={"Eski ve yeni pencerenin U değerlerinden yıllık ısıl tasarrufu (derece-gün yöntemi), yakıt tasarrufunu, parasal kazancı ve basit geri ödeme süresini hesaplar."}
      formula={"Q = (U_eski − U_yeni)·A·DG·24/1000;  yakıt = Q/η;  geri ödeme = yatırım / (yakıt·fiyat)"}
      engineeringNote={"Yalnız iletim kaybı farkını hesaplar; sızdırmazlık artışının sağladığı infiltrasyon tasarrufu ve güneş kazancı farkı (SHGC) dahil değildir. Basit geri ödeme yakıt fiyat artışı ve faiz hesaba katılmaz; ayrıntılı değerlendirme için Yatırım NPV modülünü kullanın. U değerleri cam + çerçeve birlikte (Uw) girilmelidir. Derece-gün şehre ve iç sıcaklık sınırına bağlıdır."}
      fields={[
        { key: "pencereAlani_m2", label: "Değişecek Pencere Alanı (m²)", type: "number", step: 1, min: 0.1 },
        { key: "eskiU_Wm2K", label: "Eski U (W/m²K)", type: "number", step: 0.1, min: 0.1 },
        { key: "yeniU_Wm2K", label: "Yeni U (W/m²K)", type: "number", step: 0.1, min: 0.1 },
        { key: "derece_gun", label: "Isıtma Derece-Gün (K·gün/yıl)", type: "number", step: 100, min: 1 },
        { key: "sistemVerimi", label: "Isıtma Sistemi Verimi (0–1)", type: "number", step: 0.05, min: 0.1 },
        { key: "yakitFiyati_TLkWh", label: "Yakıt Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
        { key: "birimYatirim_TLm2", label: "Birim Yatırım (₺/m²)", type: "number", step: 500, min: 0 },
      ]}
      defaults={{ pencereAlani_m2: 20, eskiU_Wm2K: 2.8, yeniU_Wm2K: 1.6, derece_gun: 2000, sistemVerimi: 0.9, yakitFiyati_TLkWh: 1.5, birimYatirim_TLm2: 6000 }}
      mainUnit={"yıl"}
      mainValueKey={"geriOdemeSuresi_yil"}
      mainDecimals={1}
      intermediateLabels={{
        delta_U_Wm2K: "ΔU (W/m²K)",
        yillik_isil_tasarruf_kWh: "Yıllık Isıl Tasarruf (kWh)",
        yillik_yakit_tasarrufu_kWh: "Yıllık Yakıt Tasarrufu (kWh)",
        yillik_parasal_tasarruf_TL: "Yıllık Parasal Tasarruf (₺)",
        yatirim_TL: "Yatırım (₺)",
        uyari: "Uyarı",
      }}
    />
  );
}
