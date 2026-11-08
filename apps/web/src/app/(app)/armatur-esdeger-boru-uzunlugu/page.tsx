"use client";

import { armaturEsdegerBoruUzunlugu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ArmaturEsdegerBoruUzunluguPage() {
  return (
    <CalcPage
      module={armaturEsdegerBoruUzunlugu}
      standardsLabel="Darcy–Weisbach (standart atfı yok)"
      description="Dirsek, vana ve te gibi armatürlerin K kayıp katsayısını eşdeğer düz boru uzunluğuna çevirir; toplam hesap uzunluğunu verir."
      formula="Le = K·D/f;  toplam = n·Le;  L_hesap = L_düz + ΣLe"
      engineeringNote="K değeri armatür kataloğundan veya Crane TP-410'dan girilir (tablo gömülmedi). f hıza ve pürüzlülüğe bağlıdır; Boru Sürtünme Katsayısı modülüyle bulunabilir. Sonuç Boru Basınç Kaybı modülüne uzunluk olarak verilebilir."
      fields={[
        { key: "kayipKatsayisi_K", label: "Kayıp Katsayısı K", type: "number", step: 0.05, min: 0.01 },
        { key: "icCap_mm", label: "İç Çap D (mm)", type: "number", step: 1, min: 1 },
        { key: "surtunmeKatsayisi_f", label: "Darcy Sürtünme Katsayısı f", type: "number", step: 0.001, min: 0.001 },
        { key: "adet", label: "Parça Adedi", type: "number", step: 1, min: 1 },
        { key: "duzBoruUzunlugu_m", label: "Düz Boru Uzunluğu (m)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ kayipKatsayisi_K: 0.75, icCap_mm: 50, surtunmeKatsayisi_f: 0.02, adet: 4, duzBoruUzunlugu_m: 30 }}
      mainUnit="m"
      mainValueKey="toplamEsdegerUzunluk_m"
      mainDecimals={2}
      intermediateLabels={{
        L_D_orani: "L/D Oranı",
        tek_parca_Le_m: "Tek Parça Le (m)",
        toplam_hesap_uzunlugu_m: "Toplam Hesap Uzunluğu (m)",
      }}
    />
  );
}
