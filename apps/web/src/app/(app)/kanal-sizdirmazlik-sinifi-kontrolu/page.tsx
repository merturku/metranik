"use client";

import { kanalSizdirmazlikSinifiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalSizdirmazlikSinifiKontroluPage() {
  return (
    <CalcPage
      module={kanalSizdirmazlikSinifiKontrolu}
      standardsLabel="EN 12237 / EN 1507"
      description="Sahada ölçülen kanal sızıntı debisini kanal yüzey alanına bölerek sızıntı faktörüne çevirir ve test basıncındaki sızdırmazlık sınıfı sınırıyla (A/B/C/D) karşılaştırır."
      formula="f = q / A,  fmax = c × p^0,65  (c: A 0,027 · B 0,009 · C 0,003 · D 0,001 L/(s·m²·Pa^0,65))"
      engineeringNote="EN 12237 dairesel, EN 1507 dikdörtgen sac kanallar içindir. Yüzey alanı test edilen kanal bölümünün dış yüzeyidir (çevre × uzunluk). Her sınıfın izin verilen azami test basıncı ayrıca kontrol edilmelidir; sınıf katsayılarını yerel baskıdan teyit edin."
      fields={[
        { key: "testBasinci_Pa", label: "Test Basıncı p (Pa)", type: "number", min: 1, step: 50 },
        { key: "kanalYuzeyAlani_m2", label: "Test Edilen Kanal Yüzey Alanı A (m²)", type: "number", min: 0.1, step: 1 },
        { key: "olculenSizinti_Ls", label: "Ölçülen Sızıntı Debisi q (L/s)", type: "number", min: 0, step: 0.5 },
        {
          key: "hedefSinif",
          label: "Hedef Sızdırmazlık Sınıfı",
          type: "select",
          options: [
            { value: "A", label: "Sınıf A" },
            { value: "B", label: "Sınıf B" },
            { value: "C", label: "Sınıf C" },
            { value: "D", label: "Sınıf D" },
          ],
        },
      ]}
      defaults={{
        testBasinci_Pa: 400,
        kanalYuzeyAlani_m2: 50,
        olculenSizinti_Ls: 15,
        hedefSinif: "B",
      }}
      mainUnit="L/(s·m²)"
      mainValueKey="sizintiFaktoru_Lsm2"
      mainDecimals={3}
      intermediateLabels={{
        izinVerilenSizintiFaktoru_Lsm2: "İzin Verilen Sızıntı Faktörü fmax (L/(s·m²))",
        izinVerilenSizinti_Ls: "İzin Verilen Toplam Sızıntı (L/s)",
        kullanimOrani_yuzde: "Sınırın Kullanım Oranı (%)",
        saglananEnIyiSinif: "Sağlanan En İyi Sınıf",
      }}
    />
  );
}
