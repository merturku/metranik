"use client";

import { globTermometreOperatifSicaklik } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GlobTermometreOperatifSicaklikPage() {
  return (
    <CalcPage
      module={globTermometreOperatifSicaklik}
      standardsLabel="TS EN ISO 7726"
      description="Glob termometre, hava sıcaklığı ve hava hızı ölçümlerinden ortalama ışınım sıcaklığını ve ısıl konfor değerlendirmesinde kullanılan operatif sıcaklığı hesaplar."
      formula="t̄r = [(tg + 273)⁴ + C·(tg − ta)]^(1/4) − 273,   C = 1,1·10⁸·va^0,6/(ε·D^0,4) (zorlanmış),   to = A·ta + (1 − A)·t̄r"
      engineeringNote="Standart glob 150 mm çaplı, mat siyah boyalı (ε ≈ 0,95) bakır küredir; ölçümden önce 20–30 dakika dengeye gelmesi beklenmelidir. Taşınım türü (doğal/zorlanmış) katsayısı büyük olana göre otomatik seçilir. Operatif sıcaklık, ışınımlı ısıtma/soğutma, büyük cam yüzeyler veya güneş alan mekanlarda hava sıcaklığından belirgin farklıdır ve PMV/PPD hesabında (Ev Sıcaklık Konfor Kontrolü) ortalama ışınım sıcaklığı girdisi olarak kullanılır."
      fields={[
        { key: "globSicakligi_C", label: "Glob Sıcaklığı tg (°C)", type: "number", step: 0.5 },
        { key: "havaSicakligi_C", label: "Hava Sıcaklığı ta (°C)", type: "number", step: 0.5 },
        { key: "havaHizi_ms", label: "Hava Hızı va (m/s)", type: "number", min: 0, step: 0.05 },
        { key: "globCapi_m", label: "Glob Çapı D (m)", type: "number", min: 0.02, step: 0.01 },
        { key: "globYayiciligi", label: "Glob Yayıcılığı ε", type: "number", min: 0.5, step: 0.01 },
      ]}
      defaults={{
        globSicakligi_C: 25,
        havaSicakligi_C: 22,
        havaHizi_ms: 0.1,
        globCapi_m: 0.15,
        globYayiciligi: 0.95,
      }}
      mainUnit="°C (operatif)"
      mainValueKey="operatifSicaklik_C"
      mainDecimals={1}
      intermediateLabels={{
        ortalama_isinim_sicakligi_C: "Ortalama Işınım Sıcaklığı t̄r (°C)",
        tasinim_turu: "Taşınım Türü",
        tasinim_katsayisi_hcg_Wm2K: "Glob Taşınım Katsayısı hcg (W/m²K)",
        agirlik_katsayisi_A: "Ağırlık Katsayısı A",
        isinim_hava_farki_K: "Işınım − Hava Sıcaklık Farkı (K)",
      }}
    />
  );
}
