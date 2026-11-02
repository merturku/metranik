"use client";

import { betonarmeKalipAlani } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonarmeKalipAlaniPage() {
  return (
    <CalcPage
      module={betonarmeKalipAlani}
      standardsLabel="Metraj hesabı (kalıp yüzey alanı)"
      description="Kolon, kiriş veya döşeme için kalıp yüzey alanını, fire payını ve kalıp/beton oranını hesaplar."
      formula="Kolon: 2(b+h)·H;   Kiriş: (b + 2h)·L;   Döşeme: b·h (alt yüzey)"
      engineeringNote="Kiriş kalıbında döşeme birleşim derinliği ve kolon–kiriş kesişimleri düşülmediğinden alan hafif tutucudur (fazladır). Döşemede Boyut 1 × Boyut 2 plan boyutlarıdır, boy kullanılmaz (0 girin). Kalıp birim fiyat analizi için tekrar kullanım sayısı ayrıca değerlendirilmelidir. Beton hacmi için Beton Sipariş Hacmi ve Mikser Sayısı modülüne bakın."
      fields={[
        {
          key: "tip",
          label: "Eleman Tipi",
          type: "select",
          options: [
            { value: "kolon", label: "Kolon (b × h, yükseklik H)" },
            { value: "kiris", label: "Kiriş (genişlik × yükseklik, boy L)" },
            { value: "doseme", label: "Döşeme (plan boyutları)" },
          ],
        },
        { key: "adet", label: "Adet", type: "number", min: 1, step: 1 },
        { key: "boyut1_m", label: "Boyut 1 — b / genişlik / plan x (m)", type: "number", min: 0.05, step: 0.05 },
        { key: "boyut2_m", label: "Boyut 2 — h / yükseklik / plan y (m)", type: "number", min: 0.05, step: 0.05 },
        { key: "boy_m", label: "Boy / Kat Yüksekliği (m)", type: "number", min: 0, step: 0.5 },
        { key: "fireYuzde", label: "Fire Payı (%)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ tip: "kolon", adet: 20, boyut1_m: 0.4, boyut2_m: 0.6, boy_m: 3, fireYuzde: 0 }}
      mainUnit="m² (kalıp alanı)"
      mainValueKey="kalipAlani_m2"
      mainDecimals={1}
      intermediateLabels={{
        birim_eleman_kalip_m2: "Eleman Başına Kalıp (m²)",
        net_kalip_m2: "Net Kalıp Alanı (m²)",
        fire_m2: "Fire (m²)",
        beton_hacmi_m3: "Beton Hacmi (m³)",
        kalip_beton_orani_m2m3: "Kalıp/Beton Oranı (m²/m³)",
      }}
    />
  );
}
