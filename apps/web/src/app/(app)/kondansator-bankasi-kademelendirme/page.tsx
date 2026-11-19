"use client";

import { kondansatorBankasiKademelendirme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KondansatorBankasiKademelendirmePage() {
  return (
    <CalcPage
      module={kondansatorBankasiKademelendirme}
      standardsLabel={"IEC 60831-1 / IEC 61921 (kondansatör)"}
      description={"Aktif güç ve cosφ'den gerekli kompanzasyon gücünü hesaplar, eşit kademe sayısına bölüp standart kademe değerine yuvarlar ve kurulu güçle gerçekleşen cosφ'yi (aşırı kompanzasyon dahil) kontrol eder."}
      formula={"Qc = P·(tanφ1 − tanφ2);  q = Qc/n → standart kademe;  tanφ' = tanφ1 − n·q_std/P"}
      engineeringNote={"Eşit kademeli banka varsayılır; küçük yük değişimlerinde ince ayar için 1:2:4 gibi farklı güçlü kademeler tercih edilebilir. Standart kademe serisi yaygın üretici değerleridir, seçilen üreticinin kataloğundan teyit edin. Harmonikli ortamda detuned reaktör ve rezonans kontrolü gerekir."}
      fields={[
        { key: "aktifGuc_kW", label: "Aktif Güç P (kW)", type: "number", step: 10, min: 1 },
        { key: "mevcutCosPhi", label: "Mevcut cosφ", type: "number", step: 0.01, min: 0.05 },
        { key: "hedefCosPhi", label: "Hedef cosφ", type: "number", step: 0.01, min: 0.05 },
        { key: "kademeSayisi", label: "Kademe Sayısı", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ aktifGuc_kW: 200, mevcutCosPhi: 0.75, hedefCosPhi: 0.95, kademeSayisi: 8 }}
      mainUnit={"kvar"}
      mainValueKey={"gerekliQc_kvar"}
      mainDecimals={1}
      intermediateLabels={{
        hesaplanan_kademe_kvar: "Hesaplanan Kademe Gücü (kvar)",
        secilen_standart_kademe_kvar: "Seçilen Standart Kademe (kvar)",
        kurulu_guc_kvar: "Kurulu Güç (kvar)",
        gerceklesen_cosPhi: "Gerçekleşen cosφ",
        asiri_kompanzasyon: "Aşırı Kompanzasyon",
        uyari: "Uyarı",
      }}
    />
  );
}
