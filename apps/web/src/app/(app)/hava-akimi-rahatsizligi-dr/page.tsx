"use client";

import { havaAkimiRahatsizligiDr } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavaAkimiRahatsizligiDrPage() {
  return (
    <CalcPage
      module={havaAkimiRahatsizligiDr}
      standardsLabel="TS EN ISO 7730 §6.2"
      description="Yerel hava sıcaklığı, ortalama hava hızı ve türbülans yoğunluğundan, hava akımından rahatsız olması beklenen kişi yüzdesini (DR) hesaplar; seçilen konfor kategorisinin sınırıyla karşılaştırır ve o kategori için izin verilen azami hava hızını verir."
      formula="DR = (34 − ta,l)·(va,l − 0,05)^0,62·(0,37·va,l·Tu + 3,14)   [%],   va,l < 0,05 m/s → 0,05"
      engineeringNote="DR, boyun ve ayak bileği gibi açık vücut bölgelerinde soğuk hava akımı hissinin (cereyan) ölçüsüdür; PMV/PPD'nin tüm vücut konforundan ayrı, yerel bir rahatsızlık ölçütüdür. Hız ve türbülans, kişinin bulunduğu noktada (otururken boyun hizası ≈ 1,1 m, ayak bileği ≈ 0,1 m) ölçülmelidir. Türbülans yoğunluğu bilinmiyorsa %40 alınabilir; karışım havalandırmasında tipik %30–60, deplasman havalandırmasında %10–20'dir. Kategori sınırları: A < %10, B < %20, C < %30. Formül ta 20–26 °C, va < 0,5 m/s, Tu %10–60 aralığında geçerlidir; hafif, oturarak yapılan işler için türetilmiştir — daha aktif işlerde rahatsızlık daha az hissedilir."
      fields={[
        { key: "havaSicakligi_C", label: "Yerel Hava Sıcaklığı ta,l (°C)", type: "number", min: 10, step: 0.5 },
        { key: "havaHizi_ms", label: "Ortalama Hava Hızı va,l (m/s)", type: "number", min: 0, step: 0.01 },
        { key: "turbulansYogunlugu_yuzde", label: "Türbülans Yoğunluğu Tu (%)", type: "number", min: 0, step: 5 },
        {
          key: "hedefKategori",
          label: "Hedef Konfor Kategorisi",
          type: "select",
          options: [
            { value: "A", label: "A — yüksek beklenti (DR < %10)" },
            { value: "B", label: "B — normal (DR < %20)" },
            { value: "C", label: "C — kabul edilebilir (DR < %30)" },
          ],
        },
      ]}
      defaults={{ havaSicakligi_C: 22, havaHizi_ms: 0.2, turbulansYogunlugu_yuzde: 40, hedefKategori: "B" }}
      mainUnit="% (DR)"
      mainValueKey="dr_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        hesapta_kullanilan_hiz_ms: "Hesapta Kullanılan Hız (m/s)",
        sicaklik_terimi_34_eksi_ta: "Sıcaklık Terimi (34 − ta,l)",
        ulasilan_kategori: "Ulaşılan Kategori",
        hedef_kategori_siniri_yuzde: "Hedef Kategori Sınırı (%)",
        hedef_icin_azami_hiz_ms: "Hedef İçin Azami Hız (m/s)",
      }}
    />
  );
}
