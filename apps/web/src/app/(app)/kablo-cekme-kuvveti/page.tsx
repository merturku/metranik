"use client";

import { kabloCekmeKuvveti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloCekmeKuvvetiPage() {
  return (
    <CalcPage
      module={kabloCekmeKuvveti}
      standardsLabel="Kapstan Denklemi"
      description="Kablonun boru veya kanal içinden çekilmesi sırasında oluşan çekme kuvvetini düz bölüm–dirsek–düz bölüm güzergâhı için iki yönde hesaplar; daha uygun çekiş yönünü, dirsekteki yan duvar basıncını ve izin verilen çekme kuvvetiyle karşılaştırmayı verir."
      formula="Düz: T₂ = T₁ + μ·W·L,   Dirsek: T₂ = T₁·e^(μθ),   SWP = T/R,   Tizin = σizin × Ailetken"
      engineeringNote="Sürtünme katsayısı μ boru malzemesi ve kaydırıcıya bağlıdır (kaydırıcılı PVC/PE boruda ≈ 0,2–0,35, kuru boruda ≈ 0,4–0,5). Dirsekteki kuvvet artışı üsteldir; bu yüzden kablo, dirseğe yakın uçtan beslenip uzak uçtan çekilmelidir. İletkenden çekme başlığıyla çekişte izin verilen gerilme üreticiden alınır (bakırda tipik 50 N/mm², alüminyumda daha düşük); kılıftan çorapla çekişte sınır daha düşüktür. Yan duvar basıncı kablo üreticisinin sınırını aşmamalıdır. Eğimli güzergâhlarda kablo ağırlığının bileşeni ayrıca eklenmelidir."
      fields={[
        { key: "kabloBirimAgirligi_kgm", label: "Kablo Birim Ağırlığı (kg/m)", type: "number", min: 0.01, step: 0.1 },
        { key: "surtunmeKatsayisi_mu", label: "Sürtünme Katsayısı μ", type: "number", min: 0.05, step: 0.05 },
        { key: "duzBolum1_m", label: "1. Düz Bölüm Boyu (m)", type: "number", min: 0, step: 5 },
        { key: "dirsekAcisi_derece", label: "Dirsek Açısı θ (°)", type: "number", min: 0, step: 15 },
        { key: "dirsekYaricapi_m", label: "Dirsek Yarıçapı R (m)", type: "number", min: 0.05, step: 0.1 },
        { key: "duzBolum2_m", label: "2. Düz Bölüm Boyu (m)", type: "number", min: 0, step: 5 },
        { key: "toplamIletkenKesiti_mm2", label: "Toplam İletken Kesiti (mm²)", type: "number", min: 1, step: 10 },
        { key: "izinVerilenGerilme_Nmm2", label: "İzin Verilen Çekme Gerilmesi (N/mm²)", type: "number", min: 1, step: 5 },
      ]}
      defaults={{
        kabloBirimAgirligi_kgm: 3,
        surtunmeKatsayisi_mu: 0.4,
        duzBolum1_m: 50,
        dirsekAcisi_derece: 90,
        dirsekYaricapi_m: 1,
        duzBolum2_m: 20,
        toplamIletkenKesiti_mm2: 285,
        izinVerilenGerilme_Nmm2: 50,
      }}
      mainUnit="N (uygun yönde)"
      mainValueKey="enKucukCekmeKuvveti_N"
      mainDecimals={0}
      intermediateLabels={{
        ileri_yonde_cekme_kuvveti_N: "1 → 2 Yönünde Çekme Kuvveti (N)",
        geri_yonde_cekme_kuvveti_N: "2 → 1 Yönünde Çekme Kuvveti (N)",
        kapstan_katsayisi: "Dirsek Katsayısı e^(μθ)",
        dirsek_yan_duvar_basinci_Nm: "Dirsekte Yan Duvar Basıncı (N/m)",
        izin_verilen_cekme_kuvveti_N: "İzin Verilen Çekme Kuvveti (N)",
        onerilen_cekis_yonu: "Önerilen Çekiş Yönü",
      }}
    />
  );
}
