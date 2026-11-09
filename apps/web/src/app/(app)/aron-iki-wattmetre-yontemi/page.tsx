"use client";

import { aronIkiWattmetreYontemi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AronIkiWattmetreYontemiPage() {
  return (
    <CalcPage
      module={aronIkiWattmetreYontemi}
      standardsLabel="Aron teoremi"
      description="İki wattmetre okumasından 3 telli üç fazlı yükün aktif, reaktif ve görünen gücünü ile güç faktörünü hesaplar."
      formula="P = W1 + W2;  Q = √3·(W1 − W2);  S = √(P² + Q²);  cosφ = P/S"
      engineeringNote="Dengeli yük ve sinüsoidal dalga için geçerlidir. W2 < 0 ise cosφ < 0,5 demektir; wattmetre ters bağlandığında işaret hatası yapmayın. W1 − W2 farkı endüktif yükte pozitif varsayılır; kapasitif yükte işaret ters olur."
      fields={[
        { key: "w1_W", label: "Wattmetre 1 Okuması W1 (W)", type: "number", step: 10 },
        { key: "w2_W", label: "Wattmetre 2 Okuması W2 (W)", type: "number", step: 10 },
      ]}
      defaults={{ w1_W: 1500, w2_W: 500 }}
      mainUnit="W"
      mainValueKey="aktifGuc_W"
      mainDecimals={0}
      intermediateLabels={{
        reaktif_guc_VAr: "Reaktif Güç Q (VAr)",
        gorunen_guc_VA: "Görünen Güç S (VA)",
        guc_faktoru: "Güç Faktörü cosφ",
        faz_acisi_derece: "Faz Açısı φ (°)",
        not: "Not",
      }}
    />
  );
}
