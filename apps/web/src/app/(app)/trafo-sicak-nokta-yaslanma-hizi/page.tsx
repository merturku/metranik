"use client";

import { trafoSicakNoktaYaslanmaHizi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TrafoSicakNoktaYaslanmaHiziPage() {
  return (
    <CalcPage
      module={trafoSicakNoktaYaslanmaHizi}
      standardsLabel={"IEC 60076-7"}
      description={"Ortam sıcaklığı, üst yağ artışı ve sıcak nokta gradyanından trafo sargı sıcak nokta sıcaklığını ve selüloz yalıtımın bağıl yaşlanma hızını (V) hesaplar."}
      formula={"θh = θa + Δθo + Δθh;  V = 2^((θh − 98)/6)  veya  V = exp(15000/383 − 15000/(θh + 273))"}
      engineeringNote={"V = 1 yaşlanmanın 98 °C'de (termal iyileştirilmiş kâğıtta 110 °C'de) sürekli çalışmaya eşit olduğunu gösterir; V > 1 hızlanmış yaşlanmadır. 180 000 saatlik normal yalıtım ömrü IEC 60076-7 Ek A'da kullanılan referans değerdir, gerçek ömür nem, oksijen ve yağ kalitesine bağlıdır. Üst yağ artışı ve sıcak nokta gradyanı yük faktörüne göre değişir (Δθo ∝ K^x, Δθh ∝ K^y); burada o anki yük için doğrudan girilir. Sıcak nokta limitlerini (98/120 °C) güncel sürümden teyit edin."}
      fields={[
        { key: "ortamSicakligi_C", label: "Ortam Sıcaklığı θa (°C)", type: "number", step: 1 },
        { key: "ustYagArtisi_K", label: "Üst Yağ Sıcaklık Artışı Δθo (K)", type: "number", step: 1, min: 0 },
        { key: "sicakNoktaGradyani_K", label: "Sıcak Nokta – Üst Yağ Farkı Δθh (K)", type: "number", step: 1, min: 0 },
        { key: "kagitTuru", label: "Yalıtım Kâğıdı", type: "select", options: [{ value: "normal", label: "Normal kâğıt (98 °C, 6 K kuralı)" }, { value: "termal", label: "Termal iyileştirilmiş kâğıt (110 °C)" }] },
      ]}
      defaults={{ ortamSicakligi_C: 30, ustYagArtisi_K: 55, sicakNoktaGradyani_K: 13, kagitTuru: "normal" }}
      mainUnit={"×"}
      mainValueKey={"yaslanmaHizi"}
      mainDecimals={3}
      intermediateLabels={{
        sicak_nokta_C: "Sıcak Nokta Sıcaklığı (°C)",
        gunluk_esdeger_yaslanma_h: "Günlük Eşdeğer Yaşlanma (h)",
        referans_omur_yil: "Referans Ömür 180 000 h'e Göre (yıl)",
      }}
    />
  );
}
