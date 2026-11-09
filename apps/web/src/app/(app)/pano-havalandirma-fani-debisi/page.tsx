"use client";

import { panoHavalandirmaFaniDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PanoHavalandirmaFaniDebisiPage() {
  return (
    <CalcPage
      module={panoHavalandirmaFaniDebisi}
      standardsLabel="Enerji dengesi"
      description="Pano içi ısı kaybı ve güneş kazancı ile izin verilen sıcaklık farkından gereken havalandırma fanı debisini hesaplar."
      formula="V̇ = (P_kayıp + P_güneş)/(ρ·cp·ΔT)·f;  V̇[m³/h] ≈ 2,985·P/ΔT·f"
      engineeringNote="ΔT izin verilen iç–dış sıcaklık farkıdır (T_iç,maks − T_dış,maks). Güvenlik çarpanı filtre kirlenmesi ve basınç kaybı içindir (≈ 1,2–1,5). Duvar iletimi katkısı ihmal edilir (güvenli taraf). Yüksek rakım ve sıcaklıkta yoğunluk düzeltmesi yapın. İç sıcaklık artışı için Pano Sıcaklık Artışı Kontrolü modülünü kullanın."
      fields={[
        { key: "isiKaybi_W", label: "Pano İçi Isı Kaybı (W)", type: "number", step: 10, min: 0 },
        { key: "gunesKazanci_W", label: "Güneş/Dış Isı Kazancı (W)", type: "number", step: 10, min: 0 },
        { key: "izinVerilenSicaklikFarki_K", label: "İzin Verilen Sıcaklık Farkı ΔT (K)", type: "number", step: 1, min: 0.5 },
        { key: "guvenlikCarpani", label: "Güvenlik Çarpanı", type: "number", step: 0.05, min: 1 },
      ]}
      defaults={{ isiKaybi_W: 500, gunesKazanci_W: 0, izinVerilenSicaklikFarki_K: 10, guvenlikCarpani: 1.3 }}
      mainUnit="m³/h"
      mainValueKey="gerekliDebi_m3h"
      mainDecimals={0}
      intermediateLabels={{
        toplam_isi_yuku_W: "Toplam Isı Yükü (W)",
        teorik_debi_m3h: "Teorik Debi (m³/h)",
        katalog_debisi_Ls: "Katalog Debisi (L/s)",
        katalog_debisi_CFM: "Katalog Debisi (CFM)",
      }}
    />
  );
}
