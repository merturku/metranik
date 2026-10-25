"use client";

import { noktaYontemiAydinlikDuzeyi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function NoktaYontemiAydinlikDuzeyiPage() {
  return (
    <CalcPage
      module={noktaYontemiAydinlikDuzeyi}
      standardsLabel="Ters Kare–Kosinüs Yasası"
      description="Tek bir armatürün, çalışma düzlemindeki belirli bir noktada oluşturduğu yatay ve düşey aydınlık düzeyini, armatürün o doğrultudaki ışık şiddetinden nokta yöntemiyle hesaplar."
      formula="θ = atan(d/h),   Eh = Iθ·cos³θ / h²,   Ev = Iθ·cos²θ·sin θ / h²,   Ebakımlı = E × MF"
      engineeringNote="Iθ, armatürün fotometrik verisinden (polar eğri veya IES/LDT dosyası) θ açısında okunan ışık şiddetidir; cd/klm verilmişse lamba ışık akısıyla (klm) çarpın. Yasa, uzaklık armatürün en büyük boyutunun yaklaşık 5 katından büyükse geçerlidir. Birden fazla armatürün katkısı aynı noktada toplanır. Yalnız doğrudan ışığı verir; duvar/tavan yansımalarını içermez, bu yüzden iç mekânda lüks yöntemi veya yazılım hesabının yerini tutmaz. Hedef değerler için EN 12464-1 tablolarına bakın."
      fields={[
        { key: "isikSiddeti_cd", label: "θ Doğrultusunda Işık Şiddeti Iθ (cd)", type: "number", min: 1, step: 50 },
        { key: "montajYuksekligi_h_m", label: "Çalışma Düzlemi Üstü Yükseklik h (m)", type: "number", min: 0.1, step: 0.1 },
        { key: "yatayMesafe_d_m", label: "Noktaya Yatay Mesafe d (m)", type: "number", min: 0, step: 0.5 },
        { key: "bakimFaktoru", label: "Bakım Faktörü MF (0–1)", type: "number", min: 0.1, step: 0.05 },
      ]}
      defaults={{
        isikSiddeti_cd: 1000,
        montajYuksekligi_h_m: 3,
        yatayMesafe_d_m: 4,
        bakimFaktoru: 0.8,
      }}
      mainUnit="lx (yatay)"
      mainValueKey="yatayAydinlikDuzeyi_lx"
      mainDecimals={1}
      intermediateLabels={{
        gelis_acisi_derece: "Geliş Açısı θ (°)",
        armature_uzaklik_r_m: "Armatüre Uzaklık r (m)",
        yatay_baslangic_aydinlik_lx: "Başlangıç Yatay Aydınlık (lx)",
        dusey_aydinlik_lx: "Düşey Aydınlık, Bakımlı (lx)",
      }}
    />
  );
}
