"use client";

import { merdivenKapisiAcmaKuvveti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MerdivenKapisiAcmaKuvvetiPage() {
  return (
    <CalcPage
      module={merdivenKapisiAcmaKuvveti}
      standardsLabel="NFPA 92 / TS EN 12101-6 — kapı açma kuvveti"
      description="Basınçlandırılmış kaçış merdiveni kapısının açma kuvvetini kapı kapatıcı kuvveti ve basınç farkından hesaplar, izin verilen sınırla karşılaştırır."
      formula="F = F_dc + W·A·ΔP / (2·(W − d))"
      engineeringNote="133 N (30 lbf) NFPA 101/92'deki tipik üst sınırdır; erişilebilirlik için ≤ 100 N tercih edilebilir — yerel yönetmelikten teyit edin. d tutamağın menteşeden uzak kapı kenarına mesafesidir. Basınç farkı çok yüksekse basınç tahliye damperi veya değişken debili fan kullanılır. Fan debisi için Merdiven Basınçlandırma Fanı Debisi modülüne bakın."
      fields={[
        { key: "kapiKapaticiKuvveti_N", label: "Kapı Kapatıcı Kuvveti F_dc (N)", type: "number", min: 0, step: 5 },
        { key: "kapiGenisligi_m", label: "Kapı Genişliği W (m)", type: "number", min: 0.5, step: 0.05 },
        { key: "kapiYuksekligi_m", label: "Kapı Yüksekliği (m)", type: "number", min: 1, step: 0.05 },
        { key: "basincFarki_Pa", label: "Basınç Farkı ΔP (Pa)", type: "number", min: 0, step: 5 },
        { key: "tutamakMesafesi_m", label: "Tutamak – Kapı Kenarı Mesafesi d (m)", type: "number", min: 0, step: 0.05 },
        { key: "azamiKuvvet_N", label: "İzin Verilen Azami Kuvvet (N)", type: "number", min: 10, step: 5 },
      ]}
      defaults={{ kapiKapaticiKuvveti_N: 40, kapiGenisligi_m: 0.9, kapiYuksekligi_m: 2.1, basincFarki_Pa: 50, tutamakMesafesi_m: 0.1, azamiKuvvet_N: 133 }}
      mainUnit="N (kapı açma kuvveti)"
      mainValueKey="acmaKuvveti_N"
      mainDecimals={0}
      intermediateLabels={{
        basinc_kuvveti_N: "Basınç Kuvveti (N)",
        kapi_alani_m2: "Kapı Alanı (m²)",
        izin_verilen_azami_basinc_farki_Pa: "İzin Verilen Azami ΔP (Pa)",
        kuvvet_kgf: "Kuvvet (kgf)",
      }}
    />
  );
}
