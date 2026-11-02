"use client";

import { kondensGeriKazanimTasarrufu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KondensGeriKazanimTasarrufuPage() {
  return (
    <CalcPage
      module={kondensGeriKazanimTasarrufu}
      standardsLabel="Enerji dengesi (m·cp·ΔT)"
      description="Buhar sisteminde geri dönen kondensin sağladığı ısı, yakıt, su ve para tasarrufunu hesaplar."
      formula="q = ṁ·r·cp·(T_kondens − T_makyaj)/3600;   yakıt = q/(η·Hu)"
      engineeringNote="Doğalgaz alt ısıl değeri 9,59 kWh/m³ alınmıştır. Flaş buhar kazancı, su işleme/kimyasal ve blöf tasarrufu dahil değildir (muhafazakâr hesap). Kondens debisi için Kondens Debisi modülüne, tank için Kondens Tankı Hacmi modülüne bakın. Kondens sıcaklığı dönüş hattı kayıplarına göre ölçülmüş değerle girilmelidir."
      fields={[
        { key: "kondensDebisi_kgh", label: "Kondens Debisi (kg/h)", type: "number", min: 1, step: 50 },
        { key: "geriDonusOrani", label: "Geri Dönüş Oranı (0–1)", type: "number", min: 0, step: 0.05 },
        { key: "kondensSicakligi_C", label: "Kondens Sıcaklığı (°C)", type: "number", min: 40, step: 5 },
        { key: "makyajSuSicakligi_C", label: "Makyaj Suyu Sıcaklığı (°C)", type: "number", min: 0, step: 1 },
        { key: "kazanVerimi", label: "Kazan Verimi (0–1)", type: "number", min: 0.1, step: 0.01 },
        { key: "yakitFiyati_TLm3", label: "Doğalgaz Fiyatı (₺/m³)", type: "number", min: 0, step: 0.5 },
        { key: "yillikSaat", label: "Yıllık İşletme Saati", type: "number", min: 1, step: 100 },
      ]}
      defaults={{ kondensDebisi_kgh: 1000, geriDonusOrani: 0.8, kondensSicakligi_C: 90, makyajSuSicakligi_C: 15, kazanVerimi: 0.85, yakitFiyati_TLm3: 8, yillikSaat: 6000 }}
      mainUnit="m³/yıl (doğalgaz tasarrufu)"
      mainValueKey="yillikYakitTasarrufu_m3"
      mainDecimals={0}
      intermediateLabels={{
        geri_donen_kondens_kgh: "Geri Dönen Kondens (kg/h)",
        geri_kazanilan_isi_kW: "Geri Kazanılan Isı (kW)",
        yakit_girisi_kWh_saat: "Yakıt Girişi (kWh/h)",
        saatlik_yakit_m3: "Saatlik Yakıt (m³/h)",
        yillik_para_tasarrufu_TL: "Yıllık Para Tasarrufu (₺)",
        yillik_su_tasarrufu_m3: "Yıllık Su Tasarrufu (m³)",
      }}
    />
  );
}
