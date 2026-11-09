"use client";

import { kanatFinVerimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanatFinVerimiPage() {
  return (
    <CalcPage
      module={kanatFinVerimi}
      standardsLabel="Kanat ısı transferi teorisi"
      description="Düz dikdörtgen kanadın verimini ve kanat başına ısı transferini hesaplar; serpantin ve radyatör yüzey verimi için kullanılır."
      formula="m = √(2h/(k·t));  η = tanh(mL)/(mL);  Q = η·h·2Lw·ΔT"
      engineeringNote="Ucu yalıtılmış kabulü; uç kaybı için L yerine L + t/2 kullanılabilir. h taşınım katsayısı (hava ≈ 10–100 W/m²K), k kanat iletkenliği (alüminyum ≈ 200, bakır ≈ 390, çelik ≈ 50 W/mK). Verim 0,6'nın altındaysa kanat boyu/malzemesi gözden geçirilmelidir."
      fields={[
        { key: "tasinimKatsayisi_h", label: "Taşınım Katsayısı h (W/m²K)", type: "number", step: 1, min: 0.1 },
        { key: "iletkenlik_k", label: "İletkenlik k (W/mK)", type: "number", step: 5, min: 1 },
        { key: "kalinlik_mm", label: "Kanat Kalınlığı t (mm)", type: "number", step: 0.1, min: 0.01 },
        { key: "boy_mm", label: "Kanat Boyu L (mm)", type: "number", step: 1, min: 0.1 },
        { key: "genislik_mm", label: "Kanat Genişliği w (mm)", type: "number", step: 10, min: 1 },
        { key: "sicaklikFarki_K", label: "Taban–Akışkan ΔT (K)", type: "number", step: 1 },
      ]}
      defaults={{ tasinimKatsayisi_h: 25, iletkenlik_k: 200, kalinlik_mm: 1, boy_mm: 20, genislik_mm: 1000, sicaklikFarki_K: 40 }}
      mainUnit=""
      mainValueKey="kanatVerimi"
      mainDecimals={3}
      intermediateLabels={{
        m_1_per_m: "m (1/m)",
        mL: "m·L",
        kanat_yuzey_alani_m2: "Kanat Yüzey Alanı (m²)",
        kanat_isi_transferi_W: "Kanat Isı Transferi (W)",
        ideal_isi_transferi_W: "İdeal Isı Transferi (W)",
      }}
    />
  );
}
