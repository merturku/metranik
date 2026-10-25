"use client";

import { tablaliKirisEtkiliGenislik } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TablaliKirisEtkiliGenislikPage() {
  return (
    <CalcPage
      module={tablaliKirisEtkiliGenislik}
      standardsLabel="TS EN 1992-1-1 §5.3.2.1"
      description="Döşemeyle monolitik dökülen betonarme kirişin (T veya L kesit) hesapta kullanılacak etkili tabla genişliğini, kiriş aralığı ve moment sıfır noktaları arası uzaklıktan hesaplar."
      formula="beff = Σ beff,i + bw,   beff,i = min(0,2·bi + 0,1·l0;  0,2·l0;  bi),   l0 = 0,85L (uç) / 0,70L (iç) / L (basit)"
      engineeringNote="bi, gövde yüzünden komşu kirişin gövde yüzüne kadar olan net aralığın yarısıdır; kenar kirişte döşemenin serbest ucuna kadar olan genişlik alınır (L kiriş için bir taraf 0). l0 oranları, komşu açıklıkların birbirine oranı 0,67–1,5 arasında ve konsol açıklığı bitişik açıklığın yarısından küçükse geçerlidir. Mesnet bölgesinde (negatif moment) l0 = 0,15·(L1 + L2) alınır ve tabla çekme bölgesinde kaldığı için genişlik yalnız donatı dağılımını etkiler. Etkili genişlik açıklık boyunca sabit kabul edilebilir."
      fields={[
        { key: "govdeGenisligi_bw_mm", label: "Gövde Genişliği bw (mm)", type: "number", min: 100, step: 50 },
        { key: "solTablaGenisligi_b1_mm", label: "Sol Net Tabla Genişliği b1 (mm)", type: "number", min: 0, step: 50 },
        { key: "sagTablaGenisligi_b2_mm", label: "Sağ Net Tabla Genişliği b2 (mm)", type: "number", min: 0, step: 50 },
        { key: "aciklik_L_m", label: "Kiriş Açıklığı L (m)", type: "number", min: 0.5, step: 0.5 },
        {
          key: "aciklikTipi",
          label: "Açıklık Tipi",
          type: "select",
          options: [
            { value: "basit", label: "Basit mesnetli tek açıklık (l0 = L)" },
            { value: "uc", label: "Sürekli kirişte uç açıklık (l0 = 0,85L)" },
            { value: "ic", label: "Sürekli kirişte iç açıklık (l0 = 0,70L)" },
          ],
        },
      ]}
      defaults={{
        govdeGenisligi_bw_mm: 300,
        solTablaGenisligi_b1_mm: 1850,
        sagTablaGenisligi_b2_mm: 1850,
        aciklik_L_m: 6,
        aciklikTipi: "uc",
      }}
      mainUnit="mm (beff)"
      mainValueKey="etkiliTablaGenisligi_mm"
      mainDecimals={0}
      intermediateLabels={{
        moment_sifir_noktalari_arasi_l0_mm: "Moment Sıfır Noktaları Arası l0 (mm)",
        sol_etkili_kanat_beff1_mm: "Sol Etkili Kanat beff,1 (mm)",
        sag_etkili_kanat_beff2_mm: "Sağ Etkili Kanat beff,2 (mm)",
        gercek_tabla_genisligi_mm: "Gerçek Tabla Genişliği b (mm)",
        etkili_gercek_orani: "Etkili / Gerçek Genişlik Oranı",
      }}
    />
  );
}
