"use client";

import { kombiSicakSuDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KombiSicakSuDebisiPage() {
  return (
    <CalcPage
      module={kombiSicakSuDebisi}
      standardsLabel="Enerji Dengesi (EN 13203-1)"
      description="Kombinin veya ani su ısıtıcının sıcak su gücünden, istenen kullanım sıcaklığında sürekli verebileceği debiyi ve kaç duşu aynı anda besleyebileceğini hesaplar; yetmiyorsa o debide suyun ulaşabildiği sıcaklığı gösterir."
      formula="ṁ = P / (cp · ΔT),   ΔT = Tkullanım − Tşebeke,   Tulaşılan = Tşebeke + P / (ṁgerekli · cp)"
      engineeringNote="P, kombinin kullanım suyu tarafındaki ısıl gücüdür (çıkış); katalogda yalnız ısıl yük (giriş) verilmişse verimle çarpın. Kataloglardaki 'ΔT = 30 K sıcak su debisi' EN 13203-1'in spesifik debi tanımıyla aynı sıcaklık farkıdır ve buradaki ara değerle karşılaştırılabilir. Kışın şebeke suyu soğuduğu için debi düşer; hesabı kış şebeke sıcaklığıyla yapın. Duş başlığı debisi ölçülerek (kova + kronometre) bulunabilir."
      fields={[
        { key: "sicakSuGucu_kW", label: "Sıcak Su Isıl Gücü P (kW)", type: "number", min: 1, step: 1 },
        { key: "sebekeSuyuSicakligi_C", label: "Şebeke Suyu Sıcaklığı (°C)", type: "number", min: 1, step: 1 },
        { key: "kullanimSicakligi_C", label: "Kullanım (Duş) Sıcaklığı (°C)", type: "number", min: 20, step: 1 },
        { key: "dusDebisi_Ldk", label: "Duş Başlığı Debisi (L/dk)", type: "number", min: 1, step: 0.5 },
        { key: "esZamanliDusSayisi", label: "Eşzamanlı Duş Sayısı", type: "number", min: 1, step: 1 },
      ]}
      defaults={{
        sicakSuGucu_kW: 24,
        sebekeSuyuSicakligi_C: 10,
        kullanimSicakligi_C: 40,
        dusDebisi_Ldk: 8,
        esZamanliDusSayisi: 1,
      }}
      mainUnit="L/dk"
      mainValueKey="sicakSuDebisi_Ldk"
      mainDecimals={1}
      intermediateLabels={{
        sicaklik_artisi_K: "Sıcaklık Artışı ΔT (K)",
        spesifik_debi_dT30_Ldk: "ΔT = 30 K'de Debi (L/dk)",
        karsilanan_dus_sayisi: "Karşılanan Duş Sayısı",
        gereken_debi_Ldk: "Gereken Toplam Debi (L/dk)",
        gereken_debide_ulasilan_sicaklik_C: "Gereken Debide Ulaşılan Sıcaklık (°C)",
      }}
    />
  );
}
