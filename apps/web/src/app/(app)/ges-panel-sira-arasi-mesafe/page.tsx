"use client";

import { gesPanelSiraArasiMesafe } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GesPanelSiraArasiMesafePage() {
  return (
    <CalcPage
      module={gesPanelSiraArasiMesafe}
      standardsLabel="Güneş Geometrisi"
      description="Düz çatı veya arazide güneye bakan panel sıraları arasında, öndeki sıranın arkadakine gölge düşürmemesi için gereken asgari aralığı yılın en kötü günü olan kış gündönümüne göre hesaplar."
      formula="sin α = sin φ·sin δ + cos φ·cos δ·cos ω,  aralık = L·cos β + L·sin β·cos γ / tan α   (δ = −23,45°)"
      engineeringNote="Öğle kriteri yalnız 12:00'de gölgesizlik sağlar; sabah ve akşam saatlerinde gölge uzar, bu yüzden 10:00–14:00 veya 09:00–15:00 aralığı daha az kayıp verir ama daha fazla alan ister. Hesap panellerin tam güneye baktığını ve sıraların aynı kotta olduğunu varsayar; eğimli çatıda veya doğu-batı sapmasında ayrıca değerlendirilmelidir. Türkiye için enlem yaklaşık 36°–42° arasıdır."
      fields={[
        { key: "panelEgikUzunlugu_L_m", label: "Panel (Sıra) Eğik Uzunluğu L (m)", type: "number", min: 0.1, step: 0.1 },
        { key: "egimAcisi_beta_derece", label: "Panel Eğim Açısı β (°)", type: "number", min: 0, step: 5 },
        { key: "enlem_derece", label: "Enlem φ (°)", type: "number", min: 0, step: 0.5 },
        {
          key: "golgesizSaatAraligi",
          label: "Gölgesiz Olması İstenen Saatler (21 Aralık)",
          type: "select",
          options: [
            { value: "12", label: "12:00 (öğle)" },
            { value: "10-14", label: "10:00 – 14:00" },
            { value: "09-15", label: "09:00 – 15:00" },
          ],
        },
      ]}
      defaults={{
        panelEgikUzunlugu_L_m: 2,
        egimAcisi_beta_derece: 30,
        enlem_derece: 39.9,
        golgesizSaatAraligi: "10-14",
      }}
      mainUnit="m"
      mainValueKey="siraAraligi_m"
      mainDecimals={2}
      intermediateLabels={{
        gunes_yukseklik_acisi_derece: "Güneş Yükseklik Açısı α (°)",
        gunes_azimutu_guneyden_derece: "Güneş Azimutu, Güneyden (°)",
        panel_ust_kenar_yuksekligi_m: "Panel Üst Kenar Yüksekliği (m)",
        panel_yatay_izdusumu_m: "Panel Yatay İzdüşümü (m)",
        siralar_arasi_bosluk_m: "Sıralar Arası Boşluk (m)",
        zemin_kaplama_orani: "Zemin Kaplama Oranı (L/aralık)",
      }}
    />
  );
}
