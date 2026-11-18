"use client";

import { havaFiltresiBasincKaybiEnerjiMaliyeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavaFiltresiBasincKaybiEnerjiMaliyetiPage() {
  return (
    <CalcPage
      module={havaFiltresiBasincKaybiEnerjiMaliyeti}
      standardsLabel={"Fan gücü P = V̇·Δp/η"}
      description={"Filtrenin temiz ve kirli hâl basınç kaybının ortalamasından fanın ek gücünü, yıllık elektrik tüketimini ve filtre değişim bedeliyle birlikte toplam işletme maliyetini hesaplar."}
      formula={"Δp_ort = (Δp_temiz + Δp_kirli)/2;  P = V̇·Δp_ort/η;  E = P·t"}
      engineeringNote={"Filtre basınç kaybının temiz değerden kirli değere doğrusal arttığı varsayılır; gerçek artış genelde doğrusal değildir. Değişim sıklığı arttıkça enerji maliyeti düşer, filtre bedeli artar; toplam maliyeti en küçük yapan değişim Δp değeri bu modülle denenerek bulunabilir. Δp değerleri üretici verisinden alınmalıdır (EN ISO 16890 / EN 779 sınıfına göre değişir). Filtrenin hava debisine bağlılığı (Δp ∝ V̇^1–1,5) için debi değişirse Δp'yi güncelleyin."}
      fields={[
        { key: "debi_m3h", label: "Hava Debisi (m³/h)", type: "number", step: 500, min: 1 },
        { key: "temizDp_Pa", label: "Temiz Filtre Δp (Pa)", type: "number", step: 10, min: 0 },
        { key: "kirliDp_Pa", label: "Değişim Öncesi Kirli Filtre Δp (Pa)", type: "number", step: 10, min: 0 },
        { key: "fanVerimi", label: "Fan + Motor Toplam Verimi (0–1)", type: "number", step: 0.05, min: 0.1 },
        { key: "yillikSaat_h", label: "Yıllık Çalışma (saat)", type: "number", step: 100, min: 1 },
        { key: "elektrikFiyati_TLkWh", label: "Elektrik Birim Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
        { key: "filtreAdedi", label: "Filtre Adedi", type: "number", step: 1, min: 0 },
        { key: "filtreBirimFiyati_TL", label: "Filtre Birim Fiyatı (₺)", type: "number", step: 100, min: 0 },
        { key: "yilda_degisim", label: "Yılda Değişim Sayısı", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ debi_m3h: 10000, temizDp_Pa: 100, kirliDp_Pa: 250, fanVerimi: 0.6, yillikSaat_h: 6000, elektrikFiyati_TLkWh: 4, filtreAdedi: 6, filtreBirimFiyati_TL: 1500, yilda_degisim: 2 }}
      mainUnit={"kWh/yıl"}
      mainValueKey={"yillikEnerji_kWh"}
      mainDecimals={0}
      intermediateLabels={{
        ortalama_dp_Pa: "Ortalama Filtre Δp (Pa)",
        ek_fan_gucu_W: "Filtre İçin Ek Fan Gücü (W)",
        yillik_enerji_maliyeti_TL: "Yıllık Enerji Maliyeti (₺)",
        yillik_filtre_maliyeti_TL: "Yıllık Filtre Maliyeti (₺)",
        toplam_yillik_maliyet_TL: "Toplam Yıllık Maliyet (₺)",
      }}
    />
  );
}
