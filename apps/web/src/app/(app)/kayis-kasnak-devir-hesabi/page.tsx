"use client";

import { kayisKasnakDevirHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KayisKasnakDevirHesabiPage() {
  return (
    <CalcPage
      module={kayisKasnakDevirHesabi}
      standardsLabel="ISO 4184 (V kayış boyu) / sürücü geometrisi"
      description="Motor ve fan kasnak çaplarından fan devrini, kayış hızını, kayış boyunu ve sarım açısını hesaplar."
      formula="N₂ = N₁·D₁/D₂·(1 − kayma);   v = π·D₁·N₁/60000;   L = 2C + π(D₁+D₂)/2 + (D₁−D₂)²/(4C)"
      engineeringNote="Kayma V kayışta tipik %1–2'dir. Kayış hızı klasik V kayışta ≈ 30 m/s ile sınırlandırılır. Hesaplanan kayış boyu en yakın standart kayış boyuna yuvarlanır (eksen mesafesi buna göre ayarlanır). Güç aktarım kapasitesi ve kayış adedi bu modülün kapsamı dışındadır. Devir değişince debi/basınç/güç için Fan Afinite Yasaları modülünü kullanın."
      fields={[
        { key: "motorDevri_dk", label: "Motor Devri (dev/dk)", type: "number", min: 100, step: 50 },
        { key: "motorKasnakCapi_mm", label: "Motor Kasnağı Çapı D₁ (mm)", type: "number", min: 20, step: 5 },
        { key: "fanKasnakCapi_mm", label: "Fan Kasnağı Çapı D₂ (mm)", type: "number", min: 20, step: 5 },
        { key: "eksenMesafesi_mm", label: "Eksen Mesafesi C (mm)", type: "number", min: 50, step: 10 },
        { key: "kaymaYuzde", label: "Kayma (%)", type: "number", min: 0, step: 0.5 },
      ]}
      defaults={{ motorDevri_dk: 1450, motorKasnakCapi_mm: 100, fanKasnakCapi_mm: 200, eksenMesafesi_mm: 400, kaymaYuzde: 1 }}
      mainUnit="dev/dk (fan devri)"
      mainValueKey="fanDevri_dk"
      mainDecimals={0}
      intermediateLabels={{
        devir_orani: "Devir Oranı D₁/D₂",
        kayis_hizi_ms: "Kayış Hızı (m/s)",
        kayis_boyu_mm: "Kayış Boyu (mm)",
        kucuk_kasnak_sarim_acisi_derece: "Küçük Kasnak Sarım Açısı (°)",
      }}
    />
  );
}
