"use client";

import { sogukOdaKapiInfiltrasyonYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SogukOdaKapiInfiltrasyonYukuPage() {
  return (
    <CalcPage
      module={sogukOdaKapiInfiltrasyonYuku}
      standardsLabel="ASHRAE Refrigeration Handbook (Gosney-Olama)"
      description="Soğuk oda veya derin dondurucu kapısı açıldığında, sıcak ve nemli dış havanın soğuk hava ile yer değiştirmesinden doğan soğutma yükünü; kapı ölçüsü, iki taraftaki hava koşulları, kapının açık kalma süresi ve kapı koruyucusuna göre hesaplar."
      formula="q = 0,221·A·(hi − hr)·ρr·√(1 − ρi/ρr)·√(g·H)·Fm,   Fm = [2/(1 + (ρr/ρi)^(1/3))]^1,5,   qt = q·Dt·Df·(1 − E)"
      engineeringNote="Kapı açıkken soğuk ve yoğun oda havası kapının altından dışarı akar, sıcak hava üstten girer; debi kapı yüksekliğinin karekökü ve yoğunluk farkıyla artar, bu yüzden yüksek kapılar orantısız yük getirir. Entalpi farkı nemi de içerir: dış havadaki nem evaporatörde kırağıya dönüşür ve defrost yükü oluşturur. Dt saatlik açık kalma oranıdır (geçiş başına 15–25 s açma-kapama süresi dahil edilmeli). Df, sürekli akışa göre gerçek hava değişim oranıdır (kapı akış faktörü); ASHRAE, Hendrix vd. (1989) ölçümlerine dayanarak sıcaklık farkı 11 K'den büyük kapılar için 0,8 önerir — güncel el kitabından teyit edin. E kapı koruyucusunun (şerit perde, hava perdesi, hızlı kapı) etkinliğidir; yeni şerit perdelerde yüksek, aşınmış perdelerde belirgin düşük olur — üretici verisi kullanın. Hesap kapının iki tarafında durgun hava varsayar; kapı önündeki rüzgar ve forklift trafiği yükü artırır."
      fields={[
        { key: "kapiGenisligi_m", label: "Kapı Genişliği (m)", type: "number", min: 0.5, step: 0.1 },
        { key: "kapiYuksekligi_m", label: "Kapı Yüksekliği H (m)", type: "number", min: 1, step: 0.1 },
        { key: "odaSicakligi_C", label: "Soğuk Oda Sıcaklığı (°C)", type: "number", min: -50, step: 1 },
        { key: "odaBagilNem_yuzde", label: "Soğuk Oda Bağıl Nemi (%)", type: "number", min: 0, step: 5 },
        { key: "disSicaklik_C", label: "Kapı Önü Hava Sıcaklığı (°C)", type: "number", min: -30, step: 1 },
        { key: "disBagilNem_yuzde", label: "Kapı Önü Bağıl Nem (%)", type: "number", min: 0, step: 5 },
        { key: "kapiAcikSure_dkSaat", label: "Kapı Açık Kalma Süresi (dk/saat)", type: "number", min: 0, step: 1 },
        { key: "akisFaktoru_Df", label: "Kapı Akış Faktörü Df", type: "number", min: 0.1, step: 0.1 },
        { key: "koruyucuEtkinlik_E", label: "Kapı Koruyucu Etkinliği E (0–1)", type: "number", min: 0, step: 0.05 },
      ]}
      defaults={{
        kapiGenisligi_m: 1.2,
        kapiYuksekligi_m: 2.2,
        odaSicakligi_C: -20,
        odaBagilNem_yuzde: 90,
        disSicaklik_C: 25,
        disBagilNem_yuzde: 50,
        kapiAcikSure_dkSaat: 6,
        akisFaktoru_Df: 0.8,
        koruyucuEtkinlik_E: 0,
      }}
      mainUnit="kW (ortalama infiltrasyon yükü)"
      mainValueKey="ortalamaYuk_kW"
      mainDecimals={2}
      intermediateLabels={{
        kapi_alani_m2: "Kapı Alanı A (m²)",
        oda_havasi_entalpisi_hr_kJkg: "Oda Havası Entalpisi hr (kJ/kg)",
        oda_havasi_yogunlugu_rhor_kgm3: "Oda Havası Yoğunluğu ρr (kg/m³)",
        dis_hava_entalpisi_hi_kJkg: "Dış Hava Entalpisi hi (kJ/kg)",
        dis_hava_yogunlugu_rhoi_kgm3: "Dış Hava Yoğunluğu ρi (kg/m³)",
        yogunluk_katsayisi_Fm: "Yoğunluk Katsayısı Fm",
        acik_kapi_hava_debisi_m3s: "Açık Kapı Hava Debisi (m³/s)",
        surekli_acik_kapi_yuku_kW: "Sürekli Açık Kapı Yükü q (kW)",
        acik_kalma_orani_Dt: "Açık Kalma Oranı Dt",
        gunluk_enerji_kWh: "Günlük Soğutma Enerjisi (kWh)",
      }}
    />
  );
}
