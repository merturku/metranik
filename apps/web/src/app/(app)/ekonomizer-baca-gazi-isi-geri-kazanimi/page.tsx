"use client";

import { ekonomizerBacaGaziIsiGeriKazanimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EkonomizerBacaGaziIsiGeriKazanimiPage() {
  return (
    <CalcPage
      module={ekonomizerBacaGaziIsiGeriKazanimi}
      standardsLabel={"Enerji dengesi (Q = ṁ·cp·ΔT)"}
      description={"Kazan baca gazından ekonomizerle geri kazanılan ısıyı, besi suyunun ısınmasını ve yıllık yakıt tasarrufunu enerji dengesiyle hesaplar; çıkış sıcaklığını asit çiy noktasına karşı kontrol eder."}
      formula={"Q = ṁgaz·cp·(Tgiriş − Tçıkış);  ΔTsu = Q/(ṁsu·4,186);  E = Q·t/η"}
      engineeringNote={"Baca gazı cp değeri doğalgazda yaklaşık 1,05–1,15 kJ/kg·K'dir; yakıta ve sıcaklığa göre ölçümle teyit edin. Asit çiy noktası doğalgazda yaklaşık 55–60 °C (su buharı çiy noktası), kükürtlü yakıtlarda 110–150 °C'dir; çıkış sıcaklığı bunun altına inerse korozyon olur (yoğuşmalı ekonomizer ayrı tasarım gerektirir). Isı geçiş yüzeyi (UA) bu modülde hesaplanmaz; yalnız enerji dengesi ve termodinamik uygunluk kontrol edilir."}
      fields={[
        { key: "gazKutleDebisi_kgs", label: "Baca Gazı Kütle Debisi (kg/s)", type: "number", step: 0.1, min: 0.001 },
        { key: "gazCp_kJkgK", label: "Baca Gazı cp (kJ/kg·K)", type: "number", step: 0.05, min: 0.5 },
        { key: "gazGiris_C", label: "Gaz Giriş Sıcaklığı (°C)", type: "number", step: 5 },
        { key: "gazCikis_C", label: "Gaz Çıkış Sıcaklığı (°C)", type: "number", step: 5 },
        { key: "suDebisi_kgs", label: "Besi Suyu Debisi (kg/s)", type: "number", step: 0.1, min: 0.001 },
        { key: "suGiris_C", label: "Su Giriş Sıcaklığı (°C)", type: "number", step: 5 },
        { key: "asitCiyNoktasi_C", label: "Asit Çiy Noktası (°C)", type: "number", step: 5 },
        { key: "kazanVerimi", label: "Kazan Verimi (0–1)", type: "number", step: 0.01, min: 0.1 },
        { key: "yillikSaat_h", label: "Yıllık Çalışma (saat)", type: "number", step: 100, min: 1 },
        { key: "yakitFiyati_TLkWh", label: "Yakıt Birim Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ gazKutleDebisi_kgs: 0.5, gazCp_kJkgK: 1.1, gazGiris_C: 220, gazCikis_C: 140, suDebisi_kgs: 1, suGiris_C: 60, asitCiyNoktasi_C: 55, kazanVerimi: 0.9, yillikSaat_h: 4000, yakitFiyati_TLkWh: 1.5 }}
      mainUnit={"kW"}
      mainValueKey={"geriKazanilanIsi_kW"}
      mainDecimals={1}
      intermediateLabels={{
        su_cikis_C: "Su Çıkış Sıcaklığı (°C)",
        su_sicaklik_artisi_K: "Su Sıcaklık Artışı (K)",
        yillik_yakit_tasarrufu_kWh: "Yıllık Yakıt Tasarrufu (kWh)",
        yillik_tasarruf_TL: "Yıllık Tasarruf (₺)",
      }}
    />
  );
}
