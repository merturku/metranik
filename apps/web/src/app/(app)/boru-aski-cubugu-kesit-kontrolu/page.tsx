"use client";

import { boruAskiCubuguKesitKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruAskiCubuguKesitKontroluPage() {
  return (
    <CalcPage
      module={boruAskiCubuguKesitKontrolu}
      standardsLabel="Çekme Gerilmesi"
      description="Askı yükünden ve izin verilen çekme gerilmesinden askı çubuğunun gerekli çapını hesaplar, mevcut çapla karşılaştırır."
      formula="A = Yük/σizin, d = √(4A/π)"
      engineeringNote="Konsol Boru Destek Aralığı Kontrolü modülü askı noktaları arasındaki mesafeyi (eğilme) kontrol eder; bu modül o noktadaki askı çubuğunun kendisinin (çekme) yeterliliğini kontrol eder."
      fields={[
        {
          key: "askiYuku_N",
          label: "Askı Yükü (N)",
          type: "number",
          min: 1,
          step: 50,
        },
        {
          key: "izinVerilenGerilme_sigma_MPa",
          label: "İzin Verilen Gerilme σ (MPa)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "mevcutCubukCapi_d_mm",
          label: "Mevcut Çubuk Çapı (mm)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        askiYuku_N: 2000,
        izinVerilenGerilme_sigma_MPa: 140,
        mevcutCubukCapi_d_mm: 8,
      }}
      mainUnit="mm"
      mainValueKey="gerekliCap_mm"
      mainDecimals={2}
      intermediateLabels={{
        gerekliAlan_mm2: "Gerekli Kesit Alanı (mm²)",
      }}
    />
  );
}
