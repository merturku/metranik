"use client";

import { akuGrubuSeriParalel } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AkuGrubuSeriParalelPage() {
  return (
    <CalcPage
      module={akuGrubuSeriParalel}
      standardsLabel="Seri/paralel bağlantı bağıntıları"
      description="Hedef gerilim ve kapasite için gereken seri ve paralel akü sayısını, grup gerilimini, kapasitesini ve enerjisini hesaplar."
      formula="Ns = ⌈V_hedef/V_hücre⌉;  Np = ⌈C_hedef/C_hücre⌉;  E = V·C/1000"
      engineeringNote="Seri hatta aynı model ve yaşta hücreler kullanılmalı; paralelde her kol için ayrı sigorta önerilir. Paralel kol sayısı arttıkça kollar arası akım dengesizliği artar (genellikle ≤ 3–4 kol önerilir; üretici sınırlarına uyun). Kullanılabilir enerji deşarj derinliğine bağlıdır. UPS/Batarya Kapasitesi ve Akü Şarj Süresi modülleriyle birlikte kullanın."
      fields={[
        { key: "hucreGerilimi_V", label: "Hücre/Akü Gerilimi (V)", type: "number", step: 1, min: 0.1 },
        { key: "hucreKapasitesi_Ah", label: "Hücre/Akü Kapasitesi (Ah)", type: "number", step: 5, min: 0.1 },
        { key: "hedefGerilim_V", label: "Hedef Gerilim (V)", type: "number", step: 1, min: 0.1 },
        { key: "hedefKapasite_Ah", label: "Hedef Kapasite (Ah)", type: "number", step: 10, min: 0.1 },
        { key: "desarjDerinligi_yuzde", label: "Deşarj Derinliği DoD (%)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ hucreGerilimi_V: 12, hucreKapasitesi_Ah: 100, hedefGerilim_V: 48, hedefKapasite_Ah: 200, desarjDerinligi_yuzde: 50 }}
      mainUnit="adet"
      mainValueKey="toplamHucre"
      mainDecimals={0}
      intermediateLabels={{
        seri_sayisi_Ns: "Seri Sayısı Ns",
        paralel_kol_sayisi_Np: "Paralel Kol Sayısı Np",
        grup_gerilimi_V: "Grup Gerilimi (V)",
        grup_kapasitesi_Ah: "Grup Kapasitesi (Ah)",
        toplam_enerji_kWh: "Toplam Enerji (kWh)",
        kullanilabilir_enerji_kWh: "Kullanılabilir Enerji (kWh)",
        paralel_kol_uyarisi: "Paralel Kol Uyarısı",
      }}
    />
  );
}
