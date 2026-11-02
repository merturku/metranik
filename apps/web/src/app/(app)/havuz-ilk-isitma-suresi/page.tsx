"use client";

import { havuzIlkIsitmaSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavuzIlkIsitmaSuresiPage() {
  return (
    <CalcPage
      module={havuzIlkIsitmaSuresi}
      standardsLabel="Enerji dengesi (E = m·cp·ΔT)"
      description="Havuz suyunu başlangıç sıcaklığından hedef sıcaklığa getirmek için gereken enerjiyi ve verilen ısıtıcı gücüyle ısıtma süresini hesaplar."
      formula="E = V·ρ·cp·ΔT/3600 [kWh];   t = E/(P·η_net)"
      engineeringNote="Net verim, ısıtma sırasında yüzeyden buharlaşma, taşınım ve ışınım kayıplarını temsil eder; havuz örtüsü kapalıysa 0,75–0,85, açıkta ve rüzgarlıysa belirgin düşüktür. İşletme sırasındaki sürekli kayıp için Kapalı Havuz Buharlaşma ve Isı Kaybı modülünü kullanın. Isı pompası ile ısıtmada güç, ısıtma kapasitesidir (elektrik gücü değil)."
      fields={[
        { key: "havuzHacmi_m3", label: "Havuz Hacmi (m³)", type: "number", min: 1, step: 5 },
        { key: "baslangicSicakligi_C", label: "Başlangıç Su Sıcaklığı (°C)", type: "number", min: 0, step: 1 },
        { key: "hedefSicaklik_C", label: "Hedef Su Sıcaklığı (°C)", type: "number", min: 15, step: 0.5 },
        { key: "isiticiGucu_kW", label: "Isıtıcı Isıtma Gücü (kW)", type: "number", min: 1, step: 5 },
        { key: "netVerim", label: "Net Verim (0–1)", type: "number", min: 0.1, step: 0.05 },
      ]}
      defaults={{ havuzHacmi_m3: 50, baslangicSicakligi_C: 15, hedefSicaklik_C: 26, isiticiGucu_kW: 30, netVerim: 0.8 }}
      mainUnit="saat (ısıtma süresi)"
      mainValueKey="sure_saat"
      mainDecimals={1}
      intermediateLabels={{
        sicaklik_farki_K: "Sıcaklık Farkı (K)",
        gerekli_enerji_kWh: "Gerekli Enerji (kWh)",
        sure_gun: "Süre (gün)",
        gerekli_guc_24saat_kW: "24 Saatte Isıtmak İçin Güç (kW)",
      }}
    />
  );
}
