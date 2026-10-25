"use client";

import { boruGenlesmeKoluBoyu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruGenlesmeKoluBoyuPage() {
  return (
    <CalcPage
      module={boruGenlesmeKoluBoyu}
      standardsLabel="Kılavuzlu Konsol Yöntemi"
      description="Sıcak boru hattının ısıl genleşmesini L dirsek, Z veya U dönüşüyle karşılamak için gereken dik kol boyunu kılavuzlu konsol yöntemiyle hesaplar; mevcut kolun karşılayabileceği genleşmeyi ve oluşan gerilmeyi kontrol eder."
      formula="L = √(3·E·D·δ / SA),   σ = 3·E·D·δ / L²"
      engineeringNote="δ, kola dik gelen toplam genleşmedir (Boru Termal Genleşme Payı modülüyle bulunur; sabit nokta ile dirsek arasındaki boru boyundan). SA, ASME B31.1/B31.3'e göre izin verilen yer değiştirme gerilme aralığıdır ve malzeme, sıcaklık ve çevrim sayısına bağlıdır. E için çalışma sıcaklığındaki değeri kullanın (çelikte ≈ 200 GPa, 200 °C'de ≈ 190 GPa). U dönüşünde iki kol genleşmeyi paylaşır. Yöntem dirsek esnekliğini ihmal eder ve güvenli taraftadır; kolun ilk desteği dirsekten bu boy kadar uzakta, kayar/kılavuz destek olmalıdır."
      fields={[
        { key: "boruDisCapi_D_mm", label: "Boru Dış Çapı D (mm)", type: "number", min: 1, step: 1 },
        { key: "genlesmeMiktari_delta_mm", label: "Karşılanacak Genleşme δ (mm)", type: "number", min: 0.1, step: 5 },
        { key: "elastisiteModulu_E_GPa", label: "Elastisite Modülü E (GPa)", type: "number", min: 1, step: 5 },
        { key: "izinVerilenGerilme_SA_MPa", label: "İzin Verilen Gerilme Aralığı SA (MPa)", type: "number", min: 1, step: 10 },
        { key: "mevcutKolBoyu_m", label: "Mevcut Kol Boyu (m)", type: "number", min: 0, step: 0.5 },
      ]}
      defaults={{
        boruDisCapi_D_mm: 114.3,
        genlesmeMiktari_delta_mm: 50,
        elastisiteModulu_E_GPa: 200,
        izinVerilenGerilme_SA_MPa: 100,
        mevcutKolBoyu_m: 6,
      }}
      mainUnit="m (gerekli kol)"
      mainValueKey="gerekliKolBoyu_m"
      mainDecimals={2}
      intermediateLabels={{
        gerekli_kol_boyu_mm: "Gerekli Kol Boyu (mm)",
        mevcut_kolun_karsiladigi_genlesme_mm: "Mevcut Kolun Karşıladığı Genleşme (mm)",
        mevcut_kolda_gerilme_MPa: "Mevcut Kolda Gerilme (MPa)",
      }}
    />
  );
}
