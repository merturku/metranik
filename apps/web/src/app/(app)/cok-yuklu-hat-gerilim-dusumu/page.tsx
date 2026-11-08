"use client";

import { cokYukluHatGerilimDusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CokYukluHatGerilimDusumuPage() {
  return (
    <CalcPage
      module={cokYukluHatGerilimDusumu}
      standardsLabel="IEC 60364-5-52 · IEC 60228"
      description="Hat boyunca birden fazla yük çeken (en çok 3) besleme hattında toplam gerilim düşümünü hesaplar ve izin verilen yüzdeyle karşılaştırır."
      formula="ΔU = b·Σ(Iₖ·Lₖ)·(R'·cosφ + X'·sinφ);  b = √3 (3 faz) / 2 (1 faz);  R' = ρ₂₀·(1 + α(θ−20))/A"
      engineeringNote="Lₖ yükün kaynağa olan toplam mesafesidir. Tüm yüklerde aynı cosφ ve akımların aritmetik toplamı kabul edilir (güvenli taraf). Kullanılmayan yükün akımını 0 girin. X' küçük kesitte yaklaşık 0,08 mΩ/m'dir. İzin verilen yüzde yönetmelik/şartnameye göre girdidir (aydınlatmada tipik %3, diğerlerinde %5); sınıflandırmadaki %90 sınırı pratik marjdır."
      fields={[
        { key: "faz", label: "Sistem", type: "select", options: [{ value: "3", label: "3 faz" }, { value: "1", label: "Tek faz" }] },
        { key: "nominalGerilim_V", label: "Nominal Gerilim (V; 3 fazda hat-hat)", type: "number", step: 1, min: 1 },
        { key: "iletken", label: "İletken", type: "select", options: [{ value: "bakir", label: "Bakır" }, { value: "aluminyum", label: "Alüminyum" }] },
        { key: "kesit_mm2", label: "Kesit (mm²)", type: "number", step: 0.5, min: 0.5 },
        { key: "sicaklik_C", label: "İletken Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "reaktans_mOhm_m", label: "Reaktans X' (mΩ/m)", type: "number", step: 0.01, min: 0 },
        { key: "cosPhi", label: "Güç Faktörü cosφ", type: "number", step: 0.01, min: 0.1 },
        { key: "izinVerilen_yuzde", label: "İzin Verilen Gerilim Düşümü (%)", type: "number", step: 0.5, min: 0.1 },
        { key: "yuk1_A", label: "Yük 1 Akımı (A)", type: "number", step: 0.5, min: 0 },
        { key: "yuk1_mesafe_m", label: "Yük 1 Mesafesi (m)", type: "number", step: 1, min: 0 },
        { key: "yuk2_A", label: "Yük 2 Akımı (A)", type: "number", step: 0.5, min: 0 },
        { key: "yuk2_mesafe_m", label: "Yük 2 Mesafesi (m)", type: "number", step: 1, min: 0 },
        { key: "yuk3_A", label: "Yük 3 Akımı (A)", type: "number", step: 0.5, min: 0 },
        { key: "yuk3_mesafe_m", label: "Yük 3 Mesafesi (m)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{
        faz: "3", nominalGerilim_V: 400, iletken: "bakir", kesit_mm2: 16, sicaklik_C: 70, reaktans_mOhm_m: 0.08,
        cosPhi: 0.8, izinVerilen_yuzde: 4, yuk1_A: 20, yuk1_mesafe_m: 50, yuk2_A: 10, yuk2_mesafe_m: 80,
        yuk3_A: 0, yuk3_mesafe_m: 0,
      }}
      mainUnit="V"
      mainValueKey="gerilimDusumu_V"
      mainDecimals={2}
      intermediateLabels={{
        iletken_ozdirenci_ohm_mm2_m: "Özdirenç ρθ (Ω·mm²/m)",
        birim_direnc_ohm_m: "Birim Direnç R' (Ω/m)",
        toplam_akim_mesafe_Am: "ΣI·L (A·m)",
        gerilim_dusumu_yuzde: "Gerilim Düşümü (%)",
        izin_verilen_yuzde: "İzin Verilen (%)",
      }}
    />
  );
}
