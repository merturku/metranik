"use client";

import { boruIciTasinimKatsayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruIciTasinimKatsayisiPage() {
  return (
    <CalcPage
      module={boruIciTasinimKatsayisi}
      standardsLabel="Gnielinski / Dittus-Boelter"
      description="Dairesel boru içinde akan akışkanla boru cidarı arasındaki ısı taşınım katsayısını (h), Reynolds ve Prandtl sayılarından Gnielinski bağıntısıyla hesaplar; laminer akışta tam gelişmiş Nusselt değerini kullanır ve Dittus-Boelter sonucunu karşılaştırma için verir."
      formula="Re = V·D/ν,   Nu = (f/8)(Re − 1000)Pr / [1 + 12,7√(f/8)(Pr^(2/3) − 1)],   f = (0,790 ln Re − 1,64)⁻²,   h = Nu·k/D"
      engineeringNote="Akışkan özellikleri (ν, k, Pr) ortalama akışkan sıcaklığında alınmalıdır; varsayılanlar ≈ 60 °C su içindir (40 °C'de ν ≈ 0,66 mm²/s, k ≈ 0,63 W/(m·K), Pr ≈ 4,3). Gnielinski 3000–5·10⁶ Reynolds aralığında Dittus-Boelter'den daha doğrudur (tipik sapma ±%10); 2300–3000 geçiş bölgesinde akış kararsızdır ve sonuç yalnız tahmindir. Laminer akışta Nu = 3,66 (sabit cidar sıcaklığı) veya 4,36 (sabit ısı akısı) yalnız termal olarak tam gelişmiş bölge içindir; kısa borularda giriş etkisi h'yi artırır. Bağıntılar pürüzsüz boru içindir. Bulunan h, boru ısı kaybı ve eşanjör hesaplarındaki iç taşınım direncinin (1/(h·π·D·L)) girdisidir."
      fields={[
        { key: "hiz_ms", label: "Ortalama Akış Hızı V (m/s)", type: "number", min: 0.01, step: 0.1 },
        { key: "icCap_mm", label: "Boru İç Çapı D (mm)", type: "number", min: 1, step: 1 },
        { key: "kinematikViskozite_mm2s", label: "Kinematik Viskozite ν (mm²/s = cSt)", type: "number", min: 0, step: 0.01 },
        { key: "isilIletkenlik_WmK", label: "Isıl İletkenlik k (W/(m·K))", type: "number", min: 0, step: 0.01 },
        { key: "prandtl", label: "Prandtl Sayısı Pr", type: "number", min: 0, step: 0.1 },
        {
          key: "isiAkisYonu",
          label: "Akışkan (Dittus-Boelter üssü için)",
          type: "select",
          options: [
            { value: "isitma", label: "Isıtılıyor (n = 0,4)" },
            { value: "sogutma", label: "Soğutuluyor (n = 0,3)" },
          ],
        },
        {
          key: "sinirKosulu",
          label: "Cidar Koşulu (laminer akış için)",
          type: "select",
          options: [
            { value: "sabitSicaklik", label: "Sabit cidar sıcaklığı (Nu = 3,66)" },
            { value: "sabitIsiAkisi", label: "Sabit ısı akısı (Nu = 4,36)" },
          ],
        },
      ]}
      defaults={{
        hiz_ms: 1,
        icCap_mm: 25,
        kinematikViskozite_mm2s: 0.475,
        isilIletkenlik_WmK: 0.654,
        prandtl: 2.99,
        isiAkisYonu: "isitma",
        sinirKosulu: "sabitSicaklik",
      }}
      mainUnit="W/(m²·K) (taşınım katsayısı)"
      mainValueKey="h_Wm2K"
      mainDecimals={0}
      intermediateLabels={{
        reynolds_sayisi: "Reynolds Sayısı Re",
        akis_rejimi: "Akış Rejimi",
        surtunme_katsayisi_f: "Sürtünme Katsayısı f (Petukhov)",
        nusselt_gnielinski: "Nusselt Sayısı (Gnielinski)",
        nusselt_kullanilan: "Kullanılan Nusselt Sayısı",
        nusselt_dittus_boelter: "Nusselt Sayısı (Dittus-Boelter, karşılaştırma)",
      }}
    />
  );
}
