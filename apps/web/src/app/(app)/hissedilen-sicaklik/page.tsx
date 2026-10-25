"use client";

import { hissedilenSicaklik } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HissedilenSicaklikPage() {
  return (
    <CalcPage
      module={hissedilenSicaklik}
      standardsLabel="NWS / Environment Canada"
      description="Hava sıcaklığı, bağıl nem ve rüzgar hızından hissedilen sıcaklığı hesaplar: soğuk ve rüzgarlı havada rüzgar soğuğunu, sıcak havada ısı indeksini kullanır ve sağlık riski kategorisini gösterir."
      formula="WCI = 13,12 + 0,6215T − 11,37V^0,16 + 0,3965T·V^0,16  (T ≤ 10 °C, V > 4,8 km/h);   T ≥ 26,7 °C: NWS ısı indeksi (Rothfusz regresyonu)"
      engineeringNote="Rüzgar hızı, meteoroloji istasyonlarının ölçtüğü 10 m yükseklikteki değerdir. Isı indeksi gölge ve hafif rüzgar için tanımlıdır; doğrudan güneş altında değer 8 °C'ye kadar yükselebilir. 10–26,7 °C aralığında düzeltme uygulanmaz. Şantiye ve dış mekân çalışmalarında ısı stresi için WBGT ölçümü daha uygun bir göstergedir; bu hesap genel bilgilendirme amaçlıdır."
      fields={[
        { key: "havaSicakligi_C", label: "Hava Sıcaklığı T (°C)", type: "number", min: -50, step: 1 },
        { key: "bagilNem_yuzde", label: "Bağıl Nem (%)", type: "number", min: 0, step: 5 },
        { key: "ruzgarHizi_kmh", label: "Rüzgar Hızı V (km/h)", type: "number", min: 0, step: 5 },
      ]}
      defaults={{
        havaSicakligi_C: 34,
        bagilNem_yuzde: 50,
        ruzgarHizi_kmh: 10,
      }}
      mainUnit="°C (hissedilen)"
      mainValueKey="hissedilenSicaklik_C"
      mainDecimals={1}
      intermediateLabels={{
        kullanilan_yontem: "Kullanılan Yöntem",
        isi_indeksi_F: "Isı İndeksi (°F)",
        hava_ile_fark_K: "Hava Sıcaklığıyla Fark (K)",
      }}
    />
  );
}
