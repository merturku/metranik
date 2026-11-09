"use client";

import { esanjorNtuKarsitAkis } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EsanjorNtuKarsitAkisPage() {
  return (
    <CalcPage
      module={esanjorNtuKarsitAkis}
      standardsLabel="ε–NTU yöntemi (Kays & London)"
      description="UA değeri ve akışkan ısıl kapasitelerinden karşıt akışlı eşanjörün etkinliğini, ısı transferini ve çıkış sıcaklıklarını hesaplar."
      formula="NTU = UA/Cmin;  Cr = Cmin/Cmax;  ε = [1 − e^(−NTU(1−Cr))]/[1 − Cr·e^(−NTU(1−Cr))];  Q = ε·Cmin·ΔT_giriş"
      engineeringNote="C = ṁ·cp (W/K). Mevcut bir eşanjörün UA değeri bilindiğinde çıkış sıcaklıklarını tahmin eder; alan bulmak için Eşanjör Boyutlandırma (LMTD), ε'u sıcaklıklardan hesaplamak için Isı Değiştirici Etkinliği modülünü kullanın. Cr = 1 için ε = NTU/(1 + NTU)."
      fields={[
        { key: "UA_WK", label: "UA (W/K)", type: "number", step: 50, min: 1 },
        { key: "sicakDebiKapasitesi_Ch_WK", label: "Sıcak Akışkan Kapasitesi Ch (W/K)", type: "number", step: 50, min: 1 },
        { key: "sogukDebiKapasitesi_Cc_WK", label: "Soğuk Akışkan Kapasitesi Cc (W/K)", type: "number", step: 50, min: 1 },
        { key: "sicakGiris_C", label: "Sıcak Giriş (°C)", type: "number", step: 1 },
        { key: "sogukGiris_C", label: "Soğuk Giriş (°C)", type: "number", step: 1 },
      ]}
      defaults={{ UA_WK: 1500, sicakDebiKapasitesi_Ch_WK: 2000, sogukDebiKapasitesi_Cc_WK: 1000, sicakGiris_C: 90, sogukGiris_C: 20 }}
      mainUnit="W"
      mainValueKey="isiTransferi_W"
      mainDecimals={0}
      intermediateLabels={{
        NTU: "NTU",
        kapasite_orani_Cr: "Kapasite Oranı Cr",
        etkinlik_epsilon: "Etkinlik ε",
        sicak_cikis_C: "Sıcak Çıkış (°C)",
        soguk_cikis_C: "Soğuk Çıkış (°C)",
        maks_isi_transferi_W: "Azami Isı Transferi (W)",
        not: "Not",
      }}
    />
  );
}
