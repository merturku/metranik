"use client";

import { basitKirisKesitTesirleri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BasitKirisKesitTesirleriPage() {
  return (
    <CalcPage
      module={basitKirisKesitTesirleri}
      standardsLabel="Klasik kiriş statiği (basit mesnetli)"
      description="Düzgün yayılı yük ve orta noktada tekil yük taşıyan basit mesnetli kirişin mesnet reaksiyonunu, maksimum kesme kuvvetini ve orta nokta momentini hesaplar."
      formula="R = wL/2 + P/2;   Mmaks = wL²/8 + PL/4;   Vmaks = R"
      engineeringNote="Yükler tasarım (katsayılı) yük olarak girilirse sonuç tasarım tesiridir (Düşey Yük Kombinasyonu modülüyle bulunur). Tekil yük yalnız açıklık ortasındadır; başka konumlar veya sürekli kirişler için çerçeve analizi gerekir. Çıkan moment Kiriş Boyutlandırma ve Çelik Kiriş Eğilme/Kesme modüllerinin girdisidir."
      fields={[
        { key: "aciklik_m", label: "Açıklık L (m)", type: "number", min: 0.1, step: 0.5 },
        { key: "yayiliYuk_kNm", label: "Düzgün Yayılı Yük w (kN/m)", type: "number", min: 0, step: 1 },
        { key: "ortaTekilYuk_kN", label: "Orta Nokta Tekil Yük P (kN)", type: "number", min: 0, step: 5 },
      ]}
      defaults={{ aciklik_m: 6, yayiliYuk_kNm: 10, ortaTekilYuk_kN: 20 }}
      mainUnit="kNm (maksimum moment)"
      mainValueKey="Mmaks_kNm"
      mainDecimals={1}
      intermediateLabels={{
        mesnet_reaksiyonu_kN: "Mesnet Reaksiyonu (kN)",
        Vmaks_kN: "Maksimum Kesme Kuvveti (kN)",
        M_yayili_kNm: "Yayılı Yük Momenti (kNm)",
        M_tekil_kNm: "Tekil Yük Momenti (kNm)",
        toplam_yuk_kN: "Toplam Yük (kN)",
      }}
    />
  );
}
