"use client";

import { gucUcgeniDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GucUcgeniDonusumuPage() {
  return (
    <CalcPage
      module={gucUcgeniDonusumu}
      standardsLabel="Güç üçgeni bağıntıları (AC devre teorisi)"
      description="Aktif güç ve güç faktöründen görünür gücü (kVA), reaktif gücü (kVAr) ve hat akımını hesaplar."
      formula="S = P/cosφ;   Q = P·tanφ = √(S² − P²);   I = S/(√3·U)  (3 faz)"
      engineeringNote="Üç fazda U hat arası gerilimdir (400 V). Güç faktörü yük karakteristiğine göre endüktif kabul edilir (Q pozitif = endüktif). Kompanzasyon için Kompanzasyon modülüne, trafo/jeneratör seçimi için Trafo Güç Seçimi ve Jeneratör Seçimi modüllerine bakın. Harmonikli yüklerde gerçek güç faktörü THD'ye bağlıdır."
      fields={[
        { key: "aktifGuc_kW", label: "Aktif Güç P (kW)", type: "number", min: 0.01, step: 10 },
        { key: "cosPhi", label: "Güç Faktörü cosφ (0–1)", type: "number", min: 0.05, step: 0.05 },
        { key: "gerilim_V", label: "Gerilim (V)", type: "number", min: 1, step: 10 },
        {
          key: "faz",
          label: "Faz Sayısı",
          type: "select",
          options: [
            { value: "3", label: "3 faz (hat arası gerilim)" },
            { value: "1", label: "Tek faz" },
          ],
        },
      ]}
      defaults={{ aktifGuc_kW: 100, cosPhi: 0.8, gerilim_V: 400, faz: "3" }}
      mainUnit="kVA (görünür güç)"
      mainValueKey="gorunurGuc_kVA"
      mainDecimals={1}
      intermediateLabels={{
        reaktif_guc_kVAr: "Reaktif Güç Q (kVAr)",
        akim_A: "Hat Akımı (A)",
        phi_derece: "φ Açısı (°)",
        tan_phi: "tanφ",
      }}
    />
  );
}
