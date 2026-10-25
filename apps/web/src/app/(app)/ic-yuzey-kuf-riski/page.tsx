"use client";

import { icYuzeyKufRiski } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IcYuzeyKufRiskiPage() {
  return (
    <CalcPage
      module={icYuzeyKufRiski}
      standardsLabel="TS EN ISO 13788"
      description="Duvar, çatı veya pencerenin ısıl geçirgenlik (U) değerinden iç yüzey sıcaklığını hesaplar; iç ortam nemine göre bu yüzeyde küf oluşma (yüzeyde %80 bağıl nem) veya terleme (yoğuşma) riskini değerlendirir."
      formula="fRsi = 1 − U·Rsi,   θsi = θe + fRsi·(θi − θe),   küf: psat(θsi,min) = pi/0,8,   yoğuşma: psat(θsi) = pi"
      engineeringNote="Rsi = 0,25 m²K/W opak elemanlarda köşe ve mobilya arkası gibi hava hareketinin zayıf olduğu yerleri temsil eder; camda 0,13 kullanılır ve küf değil yoğuşma ölçütü uygulanır. Isı köprülerinde (kolon, kiriş, balkon bağlantısı) yerel U değeri genel değerden çok yüksektir; küf en çok buralarda görülür. Dış sıcaklık olarak kış ayı ortalaması, iç nem için yaşam alışkanlığına göre %50–60 alınabilir (kalabalık, çamaşır kurutulan ortamlarda daha yüksek). Çözüm sırası: ısı yalıtımı → düzenli havalandırma → nem kaynaklarının azaltılması. Duvar U değeri Duvar/Çatı U-Değeri modülüyle bulunabilir."
      fields={[
        { key: "isilGecirgenlik_U_Wm2K", label: "Isıl Geçirgenlik U (W/m²K)", type: "number", min: 0.05, step: 0.05 },
        { key: "icSicaklik_C", label: "İç Sıcaklık θi (°C)", type: "number", min: 5, step: 1 },
        { key: "icBagilNem_yuzde", label: "İç Bağıl Nem (%)", type: "number", min: 5, step: 5 },
        { key: "disSicaklik_C", label: "Dış Sıcaklık θe (°C)", type: "number", min: -40, step: 1 },
        {
          key: "elemanTipi",
          label: "Eleman Tipi",
          type: "select",
          options: [
            { value: "opak", label: "Opak (duvar, çatı) — küf ölçütü" },
            { value: "cam", label: "Cam / pencere — yoğuşma ölçütü" },
          ],
        },
      ]}
      defaults={{
        isilGecirgenlik_U_Wm2K: 1.0,
        icSicaklik_C: 20,
        icBagilNem_yuzde: 60,
        disSicaklik_C: 0,
        elemanTipi: "opak",
      }}
      mainUnit="°C (iç yüzey)"
      mainValueKey="icYuzeySicakligi_C"
      mainDecimals={1}
      intermediateLabels={{
        ic_yuzey_direnci_Rsi_m2KW: "İç Yüzey Direnci Rsi (m²K/W)",
        sicaklik_faktoru_fRsi: "Sıcaklık Faktörü fRsi",
        ic_buhar_basinci_Pa: "İç Su Buharı Basıncı (Pa)",
        ciy_noktasi_C: "Çiy Noktası (°C)",
        kuf_siniri_yuzey_sicakligi_C: "Küf Sınırı Yüzey Sıcaklığı (°C)",
        gerekli_fRsi_kuf: "Gerekli fRsi (Küf)",
        gerekli_fRsi_yogusma: "Gerekli fRsi (Yoğuşma)",
      }}
    />
  );
}
