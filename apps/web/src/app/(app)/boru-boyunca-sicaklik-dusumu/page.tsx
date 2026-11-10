"use client";

import { boruBoyuncaSicaklikDusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruBoyuncaSicaklikDusumuPage() {
  return (
    <CalcPage
      module={boruBoyuncaSicaklikDusumu}
      standardsLabel="Üstel soğuma (enerji dengesi)"
      description="Yalıtımlı borunun sonundaki akışkan sıcaklığını, sıcaklık düşümünü ve toplam ısı kaybını hesaplar."
      formula="T(L) = Ta + (Ti − Ta)·exp(−U'·L/(ṁ·cp));  Q = ṁ·cp·(Ti − T(L))"
      engineeringNote="U' boy başına toplam ısı geçirgenliğidir (W/mK; Boru Isı Kaybı modülüyle bulunabilir). Su için ρ = 1000 kg/m³, cp = 4186 J/kgK alınır. Sabit ortam sıcaklığı ve sabit U' varsayılır; toprak altı veya değişken ortamda ortalama değer girin."
      fields={[
        { key: "girisSicakligi_C", label: "Giriş Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "ortamSicakligi_C", label: "Ortam Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "boyBasinaGecirgenlik_WmK", label: "Boy Başına Isı Geçirgenliği U' (W/mK)", type: "number", step: 0.05, min: 0.001 },
        { key: "uzunluk_m", label: "Uzunluk (m)", type: "number", step: 10, min: 0.1 },
        { key: "debi_m3h", label: "Debi (m³/h)", type: "number", step: 0.1, min: 0.001 },
      ]}
      defaults={{ girisSicakligi_C: 80, ortamSicakligi_C: 10, boyBasinaGecirgenlik_WmK: 0.3, uzunluk_m: 200, debi_m3h: 2 }}
      mainUnit="°C"
      mainValueKey="cikisSicakligi_C"
      mainDecimals={2}
      intermediateLabels={{
        sicaklik_dusumu_K: "Sıcaklık Düşümü (K)",
        isi_kaybi_W: "Isı Kaybı (W)",
        ntu_benzeri_us: "U'L/(ṁcp)",
        ortalama_kayip_Wm: "Ortalama Kayıp (W/m)",
      }}
    />
  );
}
