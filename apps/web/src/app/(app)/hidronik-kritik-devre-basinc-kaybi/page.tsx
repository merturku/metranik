"use client";

import { hidronikKritikDevreBasincKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HidronikKritikDevreBasincKaybiPage() {
  return (
    <CalcPage
      module={hidronikKritikDevreBasincKaybi}
      standardsLabel={"Darcy-Weisbach / yerel kayıp toplamı"}
      description={"En elverişsiz (kritik) devrede boru sürtünme kaybı, armatür yerel kayıpları ve ekipman kayıplarını toplayarak pompanın karşılaması gereken basıncı ve manometrik yüksekliği hesaplar."}
      formula={"ΔPtop = [R·L + Σζ·ρv²/2 + ΣΔPekipman]·(1 + pay);  H = ΔPtop/(ρ·g)"}
      engineeringNote={"R birim boy sürtünme kaybıdır (Pa/m, boru basınç kaybı modülünden veya tablodan). Σζ devredeki tüm armatür direnç katsayılarıdır ve ortalama hızla hesaplanır; hız farklı çaplarda değişiyorsa kısımlara ayırıp toplayın. Kapalı devrede statik yük pompa yüksekliğine girmez. ρ = 1000 kg/m³ alınmıştır (sıcak suda %2–4 daha düşük)."}
      fields={[
        { key: "r_Pam", label: "Birim Boy Sürtünme Kaybı R (Pa/m)", type: "number", step: 10, min: 1 },
        { key: "L_m", label: "Kritik Devre Boru Uzunluğu (gidiş + dönüş) (m)", type: "number", step: 10, min: 1 },
        { key: "zeta", label: "Toplam Yerel Direnç Katsayısı Σζ", type: "number", step: 1, min: 0 },
        { key: "v_ms", label: "Ortalama Su Hızı (m/s)", type: "number", step: 0.1, min: 0.05 },
        { key: "ekipman_kPa", label: "Ekipman Basınç Kayıpları Toplamı (kPa)", type: "number", step: 5, min: 0 },
        { key: "pay", label: "Emniyet Payı (0–1)", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ r_Pam: 150, L_m: 120, zeta: 12, v_ms: 1.2, ekipman_kPa: 25, pay: 0.1 }}
      mainUnit={"kPa"}
      mainValueKey={"toplamKayip_kPa"}
      mainDecimals={2}
      intermediateLabels={{
        surtunme_kaybi_kPa: "Sürtünme Kaybı (kPa)",
        yerel_kayip_kPa: "Yerel Kayıplar (kPa)",
        pompa_yuksekligi_m: "Pompa Manometrik Yüksekliği (mSS)",
      }}
    />
  );
}
