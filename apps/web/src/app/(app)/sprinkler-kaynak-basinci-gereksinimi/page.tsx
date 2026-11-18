"use client";

import { sprinklerKaynakBasinciGereksinimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SprinklerKaynakBasinciGereksinimiPage() {
  return (
    <CalcPage
      module={sprinklerKaynakBasinciGereksinimi}
      standardsLabel={"NFPA 13"}
      description={"Sprinkler sisteminde en elverişsiz başlıktaki gerekli basınca boru sürtünme kaybı, statik yükseklik, alarm vanası kaybı ve emniyet payı eklenerek kaynakta (riser girişinde) gereken basıncı bulur ve mevcut besleme basıncıyla karşılaştırır."}
      formula={"P = Pbaşlık + ΔPsürtünme + 0,0981·h + ΔPalarm + Pemniyet;  Pmevcut ≥ P"}
      engineeringNote={"Başlık basıncı K katsayısı ve tasarım debisinden (P = (Q/K)²) bulunur; sürtünme kaybı Hazen-Williams modülüyle tüm boru hattı boyunca toplanır. Yangın pompası eğrisi üzerinde işletme noktası doğrulaması ayrıca yapılmalıdır. Emniyet payı genellikle %10–15 veya sabit 0,5–1 bar olarak şartnameden alınır (teyit edin). Hidrolik hesap kuralları NFPA 13 / TS EN 12845'in güncel sürümüne göre onaylı bir hesapla doğrulanmalıdır."}
      fields={[
        { key: "baslikBasinci_bar", label: "En Elverişsiz Başlıkta Gerekli Basınç (bar)", type: "number", step: 0.1, min: 0 },
        { key: "surtunmeKaybi_bar", label: "Boru + Fitings Sürtünme Kaybı (bar)", type: "number", step: 0.1, min: 0 },
        { key: "yukseklik_m", label: "En Elverişsiz Başlığın Kaynağa Göre Yüksekliği (m)", type: "number", step: 1 },
        { key: "alarmVanaKaybi_bar", label: "Alarm Vanası / Sayaç Kaybı (bar)", type: "number", step: 0.05, min: 0 },
        { key: "emniyetPayi_bar", label: "Emniyet Payı (bar)", type: "number", step: 0.1, min: 0 },
        { key: "mevcutBasinc_bar", label: "Mevcut Kaynak Basıncı (bar)", type: "number", step: 0.5, min: 0 },
      ]}
      defaults={{ baslikBasinci_bar: 0.7, surtunmeKaybi_bar: 1.2, yukseklik_m: 15, alarmVanaKaybi_bar: 0.35, emniyetPayi_bar: 0.5, mevcutBasinc_bar: 5 }}
      mainUnit={"bar"}
      mainValueKey={"gerekliBasinc_bar"}
      mainDecimals={2}
      intermediateLabels={{
        statik_basinc_bar: "Statik Yükseklik Basıncı (bar)",
        mevcut_fazla_bar: "Mevcut − Gerekli (bar)",
        mevcut_oran: "Mevcut / Gerekli",
      }}
    />
  );
}
