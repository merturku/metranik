"use client";

import { zeminDarcySizmaDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminDarcySizmaDebisiPage() {
  return (
    <CalcPage
      module={zeminDarcySizmaDebisi}
      standardsLabel="Darcy yasası"
      description="Hidrolik iletkenlik ve gradyandan zeminde sızma debisini, gerçek sızma hızını ve kritik gradyana göre kaynama güvenliğini hesaplar."
      formula="i = Δh/L;  Q = k·i·A;  v_s = k·i/n;  i_kr = (G_s − 1)/(1 + e);  FS = i_kr/i"
      engineeringNote="k deney verisinden alınır (kum ≈ 10⁻⁵–10⁻³, silt ≈ 10⁻⁸–10⁻⁶, kil ≈ 10⁻¹⁰ m/s). FS ≥ 3–5 tipik olarak istenir; proje şartnamesinden teyit edin. Gradyan çıkış noktasındaki gradyandır; filtre ve uzatılmış sızma yolu riski azaltır. Zemin Faz İlişkileri modülü n ve e girdilerini üretir."
      fields={[
        { key: "hidrolikIletkenlik_k_ms", label: "Hidrolik İletkenlik k (m/s)", type: "number", step: 1e-06, min: 1e-12 },
        { key: "yuksekFarki_dh_m", label: "Hidrolik Yük Farkı Δh (m)", type: "number", step: 0.5, min: 0.01 },
        { key: "sizmaYolu_L_m", label: "Sızma Yolu Uzunluğu L (m)", type: "number", step: 0.5, min: 0.01 },
        { key: "kesitAlani_A_m2", label: "Sızma Kesit Alanı A (m²)", type: "number", step: 1, min: 0.01 },
        { key: "gozeneklilik_n", label: "Gözeneklilik n (0–1)", type: "number", step: 0.01, min: 0.05 },
        { key: "ozgulAgirlik_Gs", label: "Tane Özgül Ağırlığı Gs", type: "number", step: 0.01, min: 2 },
      ]}
      defaults={{ hidrolikIletkenlik_k_ms: 1e-05, yuksekFarki_dh_m: 3, sizmaYolu_L_m: 10, kesitAlani_A_m2: 20, gozeneklilik_n: 0.4, ozgulAgirlik_Gs: 2.65 }}
      mainUnit="m³/s"
      mainValueKey="sizmaDebisi_m3s"
      mainDecimals={6}
      intermediateLabels={{
        hidrolik_gradyan_i: "Hidrolik Gradyan i",
        darcy_hizi_ms: "Darcy Hızı (m/s)",
        sizma_hizi_ms: "Gerçek Sızma Hızı (m/s)",
        debi_m3h: "Debi (m³/h)",
        debi_Lgun: "Debi (L/gün)",
        kritik_gradyan_ikr: "Kritik Gradyan i_kr",
        kaynama_guvenligi_FS: "Kaynama Güvenliği FS",
      }}
    />
  );
}
