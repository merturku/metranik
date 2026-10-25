"use client";

import { kontrolVanasiOtoritesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KontrolVanasiOtoritesiPage() {
  return (
    <CalcPage
      module={kontrolVanasiOtoritesi}
      standardsLabel="Hidronik Tasarım"
      description="Isıtma-soğutma devresindeki iki yollu kontrol vanasının, tam açıkken oluşturduğu basınç kaybından vana otoritesini hesaplar; kararlı kontrol için gereken Kvs değerini ve buna uyan standart Kvs adımını önerir."
      formula="ΔPv = 100 × (Q/Kvs)²  [kPa],   N = ΔPv / (ΔPv + ΔPdevre),   Kvs(N = 0,5) = Q / √(ΔPdevre/100)"
      engineeringNote="ΔPdevre, debisi vanayla birlikte değişen bölümün kaybıdır: batarya/eşanjör ve fark basınç regülatörü (veya pompa) ile vana arasındaki boru ve armatürler. Otorite düştükçe vananın karakteristiği bozulur; küçük açıklıklarda debi ani değişir ve kontrol salınır. Yaygın tasarım önerisi N ≥ 0,5, kabul edilebilir alt sınır 0,25'tir. Kvs aşırı küçük seçilirse pompa basma yüksekliği ve enerji tüketimi artar; değişken debili sistemlerde basınçtan bağımsız (PICV) vanalar bu sorunu ortadan kaldırır."
      fields={[
        { key: "debi_m3h", label: "Tasarım Debisi Q (m³/h)", type: "number", min: 0.01, step: 0.1 },
        { key: "vanaKvs_m3h", label: "Vana Kvs (m³/h)", type: "number", min: 0.1, step: 0.1 },
        { key: "devreBasincKaybi_kPa", label: "Değişken Debili Devre Kaybı ΔPdevre (kPa)", type: "number", min: 0.1, step: 1 },
      ]}
      defaults={{
        debi_m3h: 2,
        vanaKvs_m3h: 4,
        devreBasincKaybi_kPa: 25,
      }}
      mainUnit="(otorite N)"
      mainValueKey="vanaOtoritesi_N"
      mainDecimals={2}
      intermediateLabels={{
        tam_acik_vana_kaybi_kPa: "Tam Açık Vana Kaybı ΔPv (kPa)",
        toplam_kayip_kPa: "Vana + Devre Toplam Kaybı (kPa)",
        otorite_05_icin_gerekli_Kvs: "N = 0,5 İçin Gereken Kvs",
        onerilen_standart_Kvs: "Önerilen Standart Kvs",
      }}
    />
  );
}
