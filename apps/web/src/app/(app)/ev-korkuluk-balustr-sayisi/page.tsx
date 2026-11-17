"use client";

import { evKorkulukBalustrSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvKorkulukBalustrSayisiPage() {
  return (
    <CalcPage
      module={evKorkulukBalustrSayisi}
      standardsLabel={"Geometrik yerleşim — azami boşluk yönetmelikten"}
      description={"Korkuluk açıklığına, balüstr kalınlığına ve izin verilen azami boşluğa göre gereken balüstr adedini ve gerçekleşen net boşluğu hesaplar."}
      formula={"n ≥ (L − g_maks)/(w + g_maks);  boşluk = (L − n·w)/(n + 1)"}
      engineeringNote={"Azami boşluk (çocukların sıkışmaması için genellikle ≈ 100 mm) ilgili yönetmelikten teyit edilmelidir. Açıklık L iki ana dikme arasındaki net mesafedir. Balüstrler eşit aralıklı yerleştirilir; elde edilen boşluk azami değeri aşmaz."}
      fields={[
        { key: "aciklik_m", label: "Net Açıklık L (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "balustrKalinligi_mm", label: "Balüstr Kalınlığı w (mm)", type: "number", step: 1, min: 1 },
        { key: "azamiBosluk_mm", label: "Azami Boşluk (mm)", type: "number", step: 5, min: 10 },
      ]}
      defaults={{ aciklik_m: 2.4, balustrKalinligi_mm: 20, azamiBosluk_mm: 100 }}
      mainUnit={"adet"}
      mainValueKey={"balustrSayisi"}
      mainDecimals={0}
      intermediateLabels={{
        net_bosluk_mm: "Gerçekleşen Net Boşluk (mm)",
        balustr_aksi_mm: "Balüstr Aks Aralığı (mm)",
      }}
    />
  );
}
