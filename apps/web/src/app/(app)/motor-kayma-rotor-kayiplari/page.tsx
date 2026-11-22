"use client";

import { motorKaymaRotorKayiplari } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MotorKaymaRotorKayiplariPage() {
  return (
    <CalcPage
      module={motorKaymaRotorKayiplari}
      standardsLabel={'IEC 60034-1'}
      description={'Asenkron motorun frekans, kutup sayısı ve devrinden kaymayı, rotor frekansını, hava aralığı gücünü ve rotor bakır kaybını hesaplar.'}
      formula={'ns = 120f/p;  s = (ns − n)/ns;  f_rotor = s·f;  Pag = Pmil/(1 − s);  Pcu2 = s·Pag'}
      engineeringNote={"Hesap, sürtünme-vantilasyon kaybını mil gücüne dahil etmeden yapılan klasik yaklaşımdır; Pcu2 gerçek değerin hafif altında kalır. Rotor bakır kaybı kaymayla doğru orantılıdır: yüksek kayma verimi düşürür. Devir motor etiketinden veya tahometre ölçümünden alınmalıdır. Kutup sayısı çift olmalı, devir ns'den küçük olmalıdır."}
      fields={[
        { key: "frekans_Hz", label: "Şebeke Frekansı (Hz)", type: "number", step: 1, min: 1 },
        { key: "kutupSayisi", label: "Kutup Sayısı", type: "number", step: 2, min: 2 },
        { key: "devir_rpm", label: "Rotor Devri (dev/dk)", type: "number", step: 10, min: 1 },
        { key: "milGucu_kW", label: "Mil Gücü (kW)", type: "number", step: 0.5, min: 0.01 },
      ]}
      defaults={{ frekans_Hz: 50, kutupSayisi: 4, devir_rpm: 1470, milGucu_kW: 11 }}
      mainUnit={'%'}
      mainValueKey={'kayma_yuzde'}
      mainDecimals={2}
      intermediateLabels={{
        senkron_devir_rpm: "Senkron Devir (dev/dk)",
        kayma_s: "Kayma s",
        rotor_frekansi_Hz: "Rotor Frekansı (Hz)",
        hava_araligi_gucu_kW: "Hava Aralığı Gücü (kW)",
        rotor_bakir_kaybi_kW: "Rotor Bakır Kaybı (kW)",
      }}
    />
  );
}
