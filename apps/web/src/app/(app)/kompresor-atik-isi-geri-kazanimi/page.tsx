"use client";

import { kompresorAtikIsiGeriKazanimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KompresorAtikIsiGeriKazanimiPage() {
  return (
    <CalcPage
      module={kompresorAtikIsiGeriKazanimi}
      standardsLabel="Enerji dengesi (standart atfı yok)"
      description="Hava kompresöründen geri kazanılabilir ısıyı, yıllık enerji ve yakıt tasarrufunu ve mali kazancı hesaplar."
      formula="Q_geri = P·yük·η_geri;  E = Q·h·(değerlendirilen oran);  yakıt = E/η_kazan"
      engineeringNote="Yağ enjeksiyonlu vidalı kompresörde mil gücünün yaklaşık %70–94'ü ısı olarak geri kazanılabilir; oranı üreticiden alın. Isı yalnızca eşzamanlı talep varsa (proses suyu, mahal ısıtma) değerlendirilebilir; kompresör çalışırken talep yoksa değerlendirilen oranı düşürün."
      fields={[
        { key: "milGucu_kW", label: "Kompresör Mil Gücü (kW)", type: "number", step: 1, min: 0.1 },
        { key: "yukOrani", label: "Ortalama Yük Oranı (0–1)", type: "number", step: 0.05, min: 0.05 },
        { key: "geriKazanimOrani_yuzde", label: "Geri Kazanım Oranı (%)", type: "number", step: 1, min: 0 },
        { key: "yillikCalismaSaati_h", label: "Yıllık Çalışma Saati (h)", type: "number", step: 100, min: 1 },
        { key: "degerlendirilenOran_yuzde", label: "Değerlendirilen Isı Oranı (%)", type: "number", step: 5, min: 0 },
        { key: "kazanVerimi_yuzde", label: "Yerine Geçen Kazan Verimi (%)", type: "number", step: 1, min: 30 },
        { key: "isiBirimFiyati_TLkWh", label: "Yakıt Birim Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ milGucu_kW: 55, yukOrani: 0.8, geriKazanimOrani_yuzde: 80, yillikCalismaSaati_h: 4000, degerlendirilenOran_yuzde: 100, kazanVerimi_yuzde: 90, isiBirimFiyati_TLkWh: 1.2 }}
      mainUnit="kW"
      mainValueKey="geriKazanilanIsi_kW"
      mainDecimals={1}
      intermediateLabels={{
        yillik_degerlendirilen_isi_kWh: "Yıllık Değerlendirilen Isı (kWh)",
        yillik_yakit_tasarrufu_kWh: "Yıllık Yakıt Tasarrufu (kWh)",
        yillik_mali_tasarruf_TL: "Yıllık Mali Tasarruf (₺)",
      }}
    />
  );
}
