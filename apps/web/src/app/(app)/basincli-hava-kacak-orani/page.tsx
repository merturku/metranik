"use client";

import { basincliHavaKacakOrani } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BasincliHavaKacakOraniPage() {
  return (
    <CalcPage
      module={basincliHavaKacakOrani}
      standardsLabel="ISO 11011 — basınçlı hava enerji değerlendirmesi"
      description="Üretim yokken ölçülen kompresör yük/boşta sürelerinden kaçak oranını, kaçak debisini ve yıllık enerji ile maliyet kaybını hesaplar."
      formula="Kaçak % = T_yük/(T_yük + T_boşta)·100;   kayıp güç = oran·FAD·özgül güç"
      engineeringNote="Ölçüm tüm hava tüketicileri kapalıyken yapılmalıdır. Özgül güç sistem toplamıdır (yaklaşık 6–7 kW/(m³/min), 7 bar vidalı kompresör); üretici verisinden girin. İyi durumdaki sistemlerde kaçak %10 civarında olmalıdır. Kaçak noktaları ultrasonik dedektörle bulunur; eşdeğer delik debisi için Menfez/Orifis modülüne bakın. Basınç düşümü yöntemi için Hava Deposu Boyutlandırma modülündeki Boyle bağıntısı kullanılabilir."
      fields={[
        { key: "yukSuresi_s", label: "Yük Süresi (s)", type: "number", min: 1, step: 1 },
        { key: "bostaSuresi_s", label: "Boşta Süresi (s)", type: "number", min: 1, step: 1 },
        { key: "kompresorFAD_m3min", label: "Kompresör FAD (m³/min)", type: "number", min: 0.1, step: 1 },
        { key: "ozgulGuc_kWm3min", label: "Özgül Güç (kW per m³/min)", type: "number", min: 1, step: 0.1 },
        { key: "yillikSaat", label: "Yıllık İşletme Saati", type: "number", min: 1, step: 100 },
        { key: "elektrikFiyati_TLkWh", label: "Elektrik Fiyatı (₺/kWh)", type: "number", min: 0, step: 0.1 },
      ]}
      defaults={{ yukSuresi_s: 12, bostaSuresi_s: 48, kompresorFAD_m3min: 10, ozgulGuc_kWm3min: 6.5, yillikSaat: 6000, elektrikFiyati_TLkWh: 3 }}
      mainUnit="% (kaçak oranı)"
      mainValueKey="kacakOrani_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        kacak_debisi_m3min: "Kaçak Debisi (m³/min)",
        kayip_guc_kW: "Kayıp Güç (kW)",
        yillik_kayip_enerji_kWh: "Yıllık Kayıp Enerji (kWh)",
        yillik_kayip_maliyet_TL: "Yıllık Kayıp Maliyet (₺)",
      }}
    />
  );
}
