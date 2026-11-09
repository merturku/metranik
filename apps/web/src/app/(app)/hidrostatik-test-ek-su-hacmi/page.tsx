"use client";

import { hidrostatikTestEkSuHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HidrostatikTestEkSuHacmiPage() {
  return (
    <CalcPage
      module={hidrostatikTestEkSuHacmi}
      standardsLabel="EN 805 §11"
      description="Boru hattını deney basıncına çıkarmak için pompalanacak ek su hacmini (suyun sıkışması + boru genleşmesi) ve izin verilen kaybı hesaplar."
      formula="ΔV = V·ΔP·(1/Kw + D/(E·t));  ΔVizin = 1,2·ΔV"
      engineeringNote="İnce cidar boru ve halka gerilmesi varsayılır; eksenel gerilme, mesnet ve hava cebi etkisi ihmal edilir. 1,2 payı EN 805 uygulamasındandır, güncel sürümden teyit edin. Suyun hacim modülü sıcaklığa bağlıdır (≈ 2200 MPa, 20 °C). Plastik borularda E zamanla düşer, kısa süreli değeri girin."
      fields={[
        { key: "hatHacmi_L", label: "Hat İç Hacmi (L)", type: "number", step: 10, min: 0.1 },
        { key: "basincArtisi_bar", label: "Basınç Artışı ΔP (bar)", type: "number", step: 1, min: 0.1 },
        { key: "icCap_mm", label: "İç Çap D (mm)", type: "number", step: 1, min: 1 },
        { key: "etKalinligi_mm", label: "Et Kalınlığı t (mm)", type: "number", step: 0.1, min: 0.1 },
        { key: "boruEMod_MPa", label: "Boru Elastisite Modülü E (MPa)", type: "number", step: 1000, min: 1 },
        { key: "suHacimModulu_MPa", label: "Suyun Hacim Modülü Kw (MPa)", type: "number", step: 50, min: 1 },
      ]}
      defaults={{ hatHacmi_L: 1000, basincArtisi_bar: 10, icCap_mm: 100, etKalinligi_mm: 3.6, boruEMod_MPa: 210000, suHacimModulu_MPa: 2200 }}
      mainUnit="L"
      mainValueKey="ekSu_L"
      mainDecimals={3}
      intermediateLabels={{
        su_sikismasi_L: "Suyun Sıkışması (L)",
        boru_genlesmesi_L: "Boru Genleşmesi (L)",
        izin_verilen_kayip_L: "İzin Verilen Kayıp (L)",
      }}
    />
  );
}
