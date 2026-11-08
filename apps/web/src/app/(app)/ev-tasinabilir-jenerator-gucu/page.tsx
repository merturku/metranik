"use client";

import { evTasinabilirJeneratorGucu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvTasinabilirJeneratorGucuPage() {
  return (
    <CalcPage
      module={evTasinabilirJeneratorGucu}
      standardsLabel="Standart atfı yok"
      description="Evde aynı anda çalışacak cihazların gücü ve en büyük motorlu cihazın kalkış akımından gereken jeneratör gücünü hesaplar."
      formula="P = [ΣPçalışma + (k − 1)·Pmotor]·(1 + yedek);  VA = P/cosφ"
      engineeringNote="Kalkış katsayısı k: motorlarda tipik 2–3, kompresörlü cihazlarda (buzdolabı, klima) 3–7; cihaz etiketinden teyit edin. Yalnız aynı anda çalışan cihazları toplayın. Bilgisayar/TV gibi hassas yüklerde inverter tipi jeneratör tercih edin."
      fields={[
        { key: "calismaGucuToplami_W", label: "Çalışma Gücü Toplamı (W)", type: "number", step: 100, min: 1 },
        { key: "enBuyukMotorGucu_W", label: "En Büyük Motorlu Cihaz Gücü (W)", type: "number", step: 50, min: 0 },
        { key: "kalkisKatsayisi", label: "Kalkış Katsayısı k", type: "number", step: 0.5, min: 1 },
        { key: "yedekPayi_yuzde", label: "Yedek Payı (%)", type: "number", step: 5, min: 0 },
        { key: "cosPhi", label: "Güç Faktörü cosφ", type: "number", step: 0.05, min: 0.5 },
      ]}
      defaults={{ calismaGucuToplami_W: 3000, enBuyukMotorGucu_W: 800, kalkisKatsayisi: 3, yedekPayi_yuzde: 20, cosPhi: 0.8 }}
      mainUnit="W"
      mainValueKey="gerekliGuc_W"
      mainDecimals={0}
      intermediateLabels={{
        kalkis_anindaki_tepe_yuk_W: "Kalkış Anındaki Tepe Yük (W)",
        gerekli_VA: "Gerekli (VA)",
        gerekli_kVA: "Gerekli (kVA)",
      }}
    />
  );
}
