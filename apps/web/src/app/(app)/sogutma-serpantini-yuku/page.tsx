"use client";

import { sogutmaSerpantiniYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SogutmaSerpantiniYukuPage() {
  return (
    <CalcPage
      module={sogutmaSerpantiniYuku}
      standardsLabel="ASHRAE Fundamentals — Psychrometrics"
      description="Soğutma ve nem alma serpantininin giriş/çıkış hava durumlarından toplam serpantin yükünü, duyulur ve gizli bileşenleri, duyulur ısı oranını (SHR) ve yoğuşan su (drenaj) miktarını psikrometrik bağıntılarla hesaplar."
      formula="q = ṁda·[(h1 − h2) − (W1 − W2)·hw2],   hw2 = 4,186·t2,   qduyulur = ṁda(h1 − hx),   qgizli = ṁda(hx − h2),   hx = h(t2, W1)"
      engineeringNote="Hava debisi serpantin girişindeki durumda (karışım havası) verilmelidir; kuru hava kütlesine girişin özgül hacmiyle çevrilir. Çıkış durumu genellikle %90–95 bağıl nemde alınır; tam doyma (%100) ideal serpantin içindir. Çıkış nem oranı girişten büyük çıkarsa serpantin nem alamaz — kuru soğutma kabul edilir ve gerçek çıkış bağıl nemi notta verilir. Yoğuşan su miktarı drenaj hattı ve yoğuşma pompası seçiminde kullanılır. Yoğuşan suyun çıkış sıcaklığındaki entalpisi toplam yükten düşülür (küçük bir terimdir). Bu modül serpantinin yapabileceği durumu doğrulamaz; çıkış sıcaklığı soğutma suyu/akışkan sıcaklığı ve serpantin sıra sayısıyla sınırlıdır — üretici seçim yazılımından teyit edin."
      fields={[
        { key: "havaDebisi_m3h", label: "Hava Debisi, Giriş Durumunda (m³/h)", type: "number", min: 1, step: 100 },
        { key: "girisSicakligi_C", label: "Giriş Kuru Termometre Sıcaklığı (°C)", type: "number", step: 0.5 },
        { key: "girisBagilNem_yuzde", label: "Giriş Bağıl Nemi (%)", type: "number", min: 1, step: 1 },
        { key: "cikisSicakligi_C", label: "Çıkış Kuru Termometre Sıcaklığı (°C)", type: "number", step: 0.5 },
        { key: "cikisBagilNem_yuzde", label: "Çıkış Bağıl Nemi (%)", type: "number", min: 1, step: 1 },
        { key: "atmosferBasinci_kPa", label: "Atmosfer Basıncı (kPa)", type: "number", min: 50, step: 0.1 },
      ]}
      defaults={{
        havaDebisi_m3h: 600,
        girisSicakligi_C: 30,
        girisBagilNem_yuzde: 80,
        cikisSicakligi_C: 14,
        cikisBagilNem_yuzde: 100,
        atmosferBasinci_kPa: 101.325,
      }}
      mainUnit="kW (toplam serpantin yükü)"
      mainValueKey="serpantinYuku_kW"
      mainDecimals={2}
      intermediateLabels={{
        giris_nem_orani_W1_gkg: "Giriş Nem Oranı W1 (g/kg)",
        cikis_nem_orani_W2_gkg: "Çıkış Nem Oranı W2 (g/kg)",
        giris_entalpisi_h1_kJkg: "Giriş Entalpisi h1 (kJ/kg)",
        cikis_entalpisi_h2_kJkg: "Çıkış Entalpisi h2 (kJ/kg)",
        kuru_hava_debisi_kgs: "Kuru Hava Debisi (kg/s)",
        duyulur_yuk_kW: "Duyulur Yük (kW)",
        gizli_yuk_kW: "Gizli Yük (kW)",
        duyulur_isi_orani_SHR: "Duyulur Isı Oranı SHR",
        yogusan_su_kgh: "Yoğuşan Su (kg/h)",
        yogusan_su_entalpi_payi_kW: "Yoğuşan Su Entalpi Payı (kW)",
      }}
    />
  );
}
