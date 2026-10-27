"use client";

import { sogutucuAkiskanAzamiSarj } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SogutucuAkiskanAzamiSarjPage() {
  return (
    <CalcPage
      module={sogutucuAkiskanAzamiSarj}
      standardsLabel="TS EN 378-1 Ek C / IEC 60335-2-40 Ek GG"
      description="R32, R1234yf ve R290 gibi yanıcı soğutucu akışkanlı klima/ısı pompası iç ünitesinde, oda alanı ve montaj yüksekliğine göre izin verilen azami şarj miktarını ve verilen şarj için gereken asgari oda alanını hesaplar."
      formula="mmax = 2,5·LFL^(5/4)·h0·√A,   Amin = (m / (2,5·LFL^(5/4)·h0))²,   m1 = 4·LFL,   m2 = 26·LFL"
      engineeringNote="LFL alt yanıcılık sınırıdır (ISO 817: R32 0,307, R1234yf 0,289, R290 0,038 kg/m³); R290'ın LFL'si çok düşük olduğu için aynı odada ve montajda R32'ye göre ≈ 14 kat daha az şarja izin verilir ((0,307/0,038)^1,25 ≈ 13,6). h0 sızıntının çıktığı yüksekliktir: zemin tipi 0,6, pencere tipi 1,0, duvar tipi 1,8, tavan tipi 2,2 m — yüksek montaj sızan gazın yere çökmeden seyrelmesini sağlar. m ≤ m1 ise oda alanına bağlı sınır uygulanmaz. m > m2 durumunda bu formül kullanılamaz; ek önlemler (mekanik havalandırma, sızıntı algılama, kapatma vanaları) için standarda bakılır. A2L akışkanlarda (R32, R1234yf) IEC 60335-2-40'ın yeni sürümleri hava sirkülasyonu ve sızıntı algılamayla daha yüksek şarja izin verebilir; geçerli sürümü ve ürün belgesini teyit edin. Şarj miktarı fabrika şarjı + boru uzunluğuna göre ilave şarjın toplamıdır."
      fields={[
        {
          key: "akiskan",
          label: "Soğutucu Akışkan",
          type: "select",
          options: [
            { value: "R32", label: "R32 (A2L, LFL 0,307 kg/m³)" },
            { value: "R1234yf", label: "R1234yf (A2L, LFL 0,289 kg/m³)" },
            { value: "R290", label: "R290 — propan (A3, LFL 0,038 kg/m³)" },
          ],
        },
        { key: "sarjMiktari_kg", label: "Toplam Şarj Miktarı m (kg)", type: "number", min: 0, step: 0.05 },
        { key: "odaAlani_m2", label: "Oda Taban Alanı A (m²)", type: "number", min: 1, step: 1 },
        {
          key: "montajTipi",
          label: "İç Ünite Montaj Tipi",
          type: "select",
          options: [
            { value: "zemin", label: "Zemin tipi (h0 = 0,6 m)" },
            { value: "pencere", label: "Pencere tipi (h0 = 1,0 m)" },
            { value: "duvar", label: "Duvar tipi (h0 = 1,8 m)" },
            { value: "tavan", label: "Tavan tipi (h0 = 2,2 m)" },
          ],
        },
      ]}
      defaults={{ akiskan: "R32", sarjMiktari_kg: 1.5, odaAlani_m2: 20, montajTipi: "duvar" }}
      mainUnit="kg (azami şarj)"
      mainValueKey="azamiSarj_kg"
      mainDecimals={2}
      intermediateLabels={{
        alt_yanicilik_siniri_LFL_kgm3: "Alt Yanıcılık Sınırı LFL (kg/m³)",
        montaj_yuksekligi_h0_m: "Montaj Yüksekliği h0 (m)",
        asgari_oda_alani_m2: "Asgari Oda Alanı Amin (m²)",
        m1_kg: "m1 = 4·LFL (kg)",
        m2_kg: "m2 = 26·LFL (kg)",
      }}
    />
  );
}
