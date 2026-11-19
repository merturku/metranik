"use client";

import { kabloTavasiYukKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloTavasiYukKapasitesiPage() {
  return (
    <CalcPage
      module={kabloTavasiYukKapasitesi}
      standardsLabel={"TS EN 61537 (güvenli çalışma yükü SWL)"}
      description={"Tavadaki kablo gruplarının birim kütlesini toplayıp ek yük payıyla tava üzerindeki doğrusal yükü, mesnet reaksiyonunu ve momentini hesaplar; üretici güvenli çalışma yüküyle (SWL) karşılaştırır."}
      formula={"w = Σ(nᵢ·mᵢ)·(1+ek);  R = w·L/2;  M = w·L²/8;  oran = w / SWL"}
      engineeringNote={"SWL (TS EN 61537'ye göre ölçülen güvenli çalışma yükü) tava tipi, genişliği ve mesnet açıklığına bağlıdır; üretici tablosundan açıklığa uygun değer girilmelidir. Bu modül kablo kütlesinin kablo tavası doluluk oranı modülünden (alan) bağımsız ikinci kontrolüdür; ikisi de sağlanmalıdır. Ek yük payı bakım personeli, buz/kar ve yangın koruma kaplaması içindir."}
      fields={[
        { key: "adet1", label: "Grup 1 Kablo Adedi", type: "number", step: 1, min: 0 },
        { key: "kutle1_kgm", label: "Grup 1 Birim Kütle (kg/m)", type: "number", step: 0.1, min: 0 },
        { key: "adet2", label: "Grup 2 Kablo Adedi", type: "number", step: 1, min: 0 },
        { key: "kutle2_kgm", label: "Grup 2 Birim Kütle (kg/m)", type: "number", step: 0.1, min: 0 },
        { key: "adet3", label: "Grup 3 Kablo Adedi", type: "number", step: 1, min: 0 },
        { key: "kutle3_kgm", label: "Grup 3 Birim Kütle (kg/m)", type: "number", step: 0.1, min: 0 },
        { key: "ekYukPayi", label: "Ek Yük Payı (0,2 = %20)", type: "number", step: 0.05, min: 0 },
        { key: "acikligi_m", label: "Mesnet Açıklığı L (m)", type: "number", step: 0.5, min: 0.5 },
        { key: "tavaGuvenliYuk_kgm", label: "Tava Güvenli Çalışma Yükü SWL (kg/m)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ adet1: 20, kutle1_kgm: 1.2, adet2: 10, kutle2_kgm: 0.8, adet3: 4, kutle3_kgm: 2.5, ekYukPayi: 0, acikligi_m: 2, tavaGuvenliYuk_kgm: 60 }}
      mainUnit={"kg/m"}
      mainValueKey={"toplamYuk_kgm"}
      mainDecimals={1}
      intermediateLabels={{
        kablo_kutlesi_kgm: "Kablo Kütlesi (kg/m)",
        toplam_yuk_kNm: "Toplam Yük (kN/m)",
        mesnet_reaksiyonu_kg: "Mesnet Reaksiyonu (kg)",
        mesnet_momenti_kNm: "Açıklık Momenti (kNm)",
        kullanim_orani: "Kullanım Oranı",
      }}
    />
  );
}
