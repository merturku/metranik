"use client";

import { sogukOdaUrunYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SogukOdaUrunYukuPage() {
  return (
    <CalcPage
      module={sogukOdaUrunYuku}
      standardsLabel="ASHRAE Refrigeration"
      description="Soğuk odaya veya şok dondurucuya giren ürünün, giriş sıcaklığından depolama sıcaklığına indirilmesi (gerekiyorsa dondurulması) için gereken ısı miktarını ve verilen sürede çekilmesi gereken soğutma gücünü hesaplar."
      formula="Q = m·[c1·(T1 − Tf) + hif + c2·(Tf − T2)],   Q̇ = Q / t   (T2 ≥ Tf ise Q = m·c1·(T1 − T2))"
      engineeringNote="Özgül ısılar (donma üstü/altı), donma gizli ısısı ve donma noktası ürüne özgüdür; ASHRAE Refrigeration Handbook ürün özellikleri tablolarından alınmalıdır (yaklaşık olarak su içeriği yüksek ürünlerde c1 ≈ 3,5, c2 ≈ 1,8 kJ/kgK, hif ≈ 335 × su oranı kJ/kg). Bu yalnız ürün yüküdür: duvar iletimi, kapı açılması (sızma), aydınlatma, personel, fan motoru, defrost ve meyve-sebzede solunum ısısı ayrıca eklenip toplama %10 civarı emniyet payı konmalıdır. Soğutma süresi, günlük ürün girişi için genellikle 24 saattir."
      fields={[
        { key: "urunKutlesi_kg", label: "Ürün Kütlesi m (kg)", type: "number", min: 1, step: 100 },
        { key: "girisSicakligi_C", label: "Ürün Giriş Sıcaklığı T1 (°C)", type: "number", step: 1 },
        { key: "depolamaSicakligi_C", label: "Depolama Sıcaklığı T2 (°C)", type: "number", step: 1 },
        { key: "donmaNoktasi_C", label: "Donma Noktası Tf (°C)", type: "number", step: 0.1 },
        { key: "donmaUstuOzgulIsi_kJkgK", label: "Donma Üstü Özgül Isı c1 (kJ/kgK)", type: "number", min: 0.1, step: 0.1 },
        { key: "donmaAltiOzgulIsi_kJkgK", label: "Donma Altı Özgül Isı c2 (kJ/kgK)", type: "number", min: 0.1, step: 0.1 },
        { key: "donmaGizliIsisi_kJkg", label: "Donma Gizli Isısı hif (kJ/kg)", type: "number", min: 0, step: 5 },
        { key: "sogutmaSuresi_h", label: "Soğutma Süresi t (h)", type: "number", min: 0.5, step: 1 },
      ]}
      defaults={{
        urunKutlesi_kg: 1000,
        girisSicakligi_C: 10,
        depolamaSicakligi_C: -18,
        donmaNoktasi_C: -2.2,
        donmaUstuOzgulIsi_kJkgK: 3.6,
        donmaAltiOzgulIsi_kJkgK: 1.9,
        donmaGizliIsisi_kJkg: 255,
        sogutmaSuresi_h: 24,
      }}
      mainUnit="kW"
      mainValueKey="urunSogutmaYuku_kW"
      mainDecimals={2}
      intermediateLabels={{
        islem: "İşlem",
        donma_ustu_duyulur_isi_kJ: "Donma Üstü Duyulur Isı Q1 (kJ)",
        donma_gizli_isisi_kJ: "Donma Gizli Isısı Q2 (kJ)",
        donma_alti_duyulur_isi_kJ: "Donma Altı Duyulur Isı Q3 (kJ)",
        toplam_isi_kJ: "Toplam Isı (kJ)",
        toplam_isi_kWh: "Toplam Isı (kWh)",
      }}
    />
  );
}
