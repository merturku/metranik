"use client";

import { duvarKagidiRuloSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DuvarKagidiRuloSayisiPage() {
  return (
    <CalcPage
      module={duvarKagidiRuloSayisi}
      standardsLabel="Şerit Yöntemi"
      description="Oda duvar uzunluğu, tavan yüksekliği, rulo ölçüleri ve desen tekrarından kaç rulo duvar kağıdı gerektiğini şerit yöntemiyle hesaplar; fire oranını gösterir."
      formula="şerit = ⌈(h + pay)/rapor⌉ × rapor,   şerit/rulo = ⌊L rulo / şerit⌋,   şerit sayısı = ⌈net genişlik / rulo eni⌉,   rulo = ⌈şerit sayısı / (şerit/rulo)⌉"
      engineeringNote="Toplam duvar uzunluğu odanın çevresidir. Yalnız tam boy açıklıklar (kapı, boydan pencere) düşülmelidir; küçük pencerelerin üstü ve altı kaplandığı için şerit sayısını azaltmaz. Desen tekrarı rulo etiketinde 'rapor' olarak yazar; desensiz kağıtta 0 girin. Kaydırmalı (offset) desende fire biraz daha fazladır. Renk/parti farkı olmaması için tüm ruloları aynı parti numarasından alın ve 1 rulo yedek bulundurun. Standart Avrupa rulosu 53 cm × 10,05 m'dir."
      fields={[
        { key: "toplamDuvarUzunlugu_m", label: "Toplam Duvar Uzunluğu (m)", type: "number", min: 0.5, step: 0.5 },
        { key: "dusulecekAciklikGenisligi_m", label: "Düşülecek Tam Boy Açıklık Genişliği (m)", type: "number", min: 0, step: 0.1 },
        { key: "duvarYuksekligi_m", label: "Duvar Yüksekliği (m)", type: "number", min: 0.5, step: 0.05 },
        { key: "ruloEni_cm", label: "Rulo Eni (cm)", type: "number", min: 10, step: 1 },
        { key: "ruloBoyu_m", label: "Rulo Boyu (m)", type: "number", min: 1, step: 0.05 },
        { key: "desenTekrari_cm", label: "Desen Tekrarı / Rapor (cm)", type: "number", min: 0, step: 1 },
        { key: "kesimPayi_cm", label: "Şerit Başına Kesim Payı (cm)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{
        toplamDuvarUzunlugu_m: 18,
        dusulecekAciklikGenisligi_m: 0.9,
        duvarYuksekligi_m: 2.4,
        ruloEni_cm: 53,
        ruloBoyu_m: 10.05,
        desenTekrari_cm: 0,
        kesimPayi_cm: 10,
      }}
      mainUnit="rulo"
      mainValueKey="ruloSayisi"
      mainDecimals={0}
      intermediateLabels={{
        serit_boyu_m: "Şerit Boyu (m)",
        rulo_basina_serit: "Rulodan Çıkan Şerit",
        net_duvar_genisligi_m: "Net Duvar Genişliği (m)",
        gereken_serit_sayisi: "Gereken Şerit Sayısı",
        kaplanan_alan_m2: "Kaplanan Alan (m²)",
        satin_alinan_alan_m2: "Satın Alınan Kağıt Alanı (m²)",
        fire_orani_yuzde: "Fire Oranı (%)",
      }}
    />
  );
}
