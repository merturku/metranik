"use client";

import { evCatiPanelSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvCatiPanelSayisiPage() {
  return (
    <CalcPage
      module={evCatiPanelSayisi}
      standardsLabel="Standart atfı yok"
      description="Çatı alanı, kullanılabilir alan oranı ve panel ölçülerinden sığacak panel sayısını ve kurulu gücü hesaplar."
      formula="n = ⌊A·kullanım/(boy·en)⌋;  P = n·P_panel"
      engineeringNote="Kullanım oranı baca, çatı penceresi, kenar boşluğu ve bakım aralığı payını çıkarır (eğimli çatıda genellikle 0,70–0,85; düz çatıda sıra gölgelenmesi için ek pay gerekir). Gerçek yerleşimi mimari plan ve statik kontrolle doğrulayın. Yıllık üretim için Güneş Paneli Yıllık Enerji Üretimi modülünü kullanın."
      fields={[
        { key: "catiAlani_m2", label: "Çatı Alanı (m²)", type: "number", step: 1, min: 1 },
        { key: "kullanimOrani", label: "Kullanım Oranı (0–1)", type: "number", step: 0.05, min: 0.1 },
        { key: "panelBoyu_m", label: "Panel Boyu (m)", type: "number", step: 0.01, min: 0.1 },
        { key: "panelEni_m", label: "Panel Eni (m)", type: "number", step: 0.01, min: 0.1 },
        { key: "panelGucu_W", label: "Panel Gücü (W)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ catiAlani_m2: 40, kullanimOrani: 0.7, panelBoyu_m: 1.722, panelEni_m: 1.134, panelGucu_W: 450 }}
      mainUnit="adet"
      mainValueKey="panelSayisi"
      mainDecimals={0}
      intermediateLabels={{
        panel_alani_m2: "Panel Alanı (m²)",
        kullanilabilir_alan_m2: "Kullanılabilir Alan (m²)",
        kurulu_guc_kWp: "Kurulu Güç (kWp)",
        panel_yuzey_verimi_Wm2: "Panel Güç Yoğunluğu (W/m²)",
        alan_kullanimi_yuzde: "Çatı Alan Kullanımı (%)",
      }}
    />
  );
}
