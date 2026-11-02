"use client";

import { ikiAciklikliSurekliKiris } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IkiAciklikliSurekliKirisPage() {
  return (
    <CalcPage
      module={ikiAciklikliSurekliKiris}
      standardsLabel="Üç moment denklemi (klasik yapı statiği)"
      description="İki eşit açıklıklı, düzgün yayılı yüklü sürekli kirişin orta mesnet momentini, açıklık momentini ve mesnet reaksiyonlarını hesaplar."
      formula="M_B = −wL²/8;   M_açıklık = 9wL²/128 (x = 3L/8);   R_uç = 3wL/8;   R_orta = 5wL/4"
      engineeringNote="Her iki açıklık da tam yüklü ve eşit, mesnetler rijit kabul edilir. Hareketli yük için kısmi yükleme (tek açıklık yüklü) durumları ayrıca incelenmelidir; bu durum açıklık momentini artırır. Beton için moment yeniden dağılımı ve TS 500 yaklaşık moment katsayıları ayrı bir değerlendirmedir. Basit kiriş karşılaştırması için Basit Mesnetli Kiriş Kesit Tesirleri modülüne bakın."
      fields={[
        { key: "aciklik_m", label: "Her Açıklık L (m)", type: "number", min: 0.5, step: 0.5 },
        { key: "yayiliYuk_kNm", label: "Düzgün Yayılı Yük w (kN/m)", type: "number", min: 0.1, step: 1 },
      ]}
      defaults={{ aciklik_m: 6, yayiliYuk_kNm: 10 }}
      mainUnit="kNm (orta mesnet momenti, mutlak)"
      mainValueKey="ortaMesnetMomenti_kNm"
      mainDecimals={1}
      intermediateLabels={{
        aciklik_maks_momenti_kNm: "Açıklık Maksimum Momenti (kNm)",
        aciklik_maks_noktasi_m: "Maksimum Moment Noktası (m, uçtan)",
        uc_mesnet_reaksiyonu_kN: "Uç Mesnet Reaksiyonu (kN)",
        orta_mesnet_reaksiyonu_kN: "Orta Mesnet Reaksiyonu (kN)",
        toplam_yuk_kN: "Toplam Yük (kN)",
        basit_kiris_momenti_kNm: "Basit Kiriş Momenti wL²/8 (kNm)",
        moment_azalmasi_yuzde: "Açıklık Momenti Azalması (%)",
      }}
    />
  );
}
