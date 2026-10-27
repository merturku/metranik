"use client";

import { ustKatSuBasinciKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function UstKatSuBasinciKontroluPage() {
  return (
    <CalcPage
      module={ustKatSuBasinciKontrolu}
      standardsLabel="Hidrostatik basınç dengesi"
      description="Şebeke basıncının, binanın en üst katındaki muslukta yeterli akış basıncı sağlayıp sağlamadığını kontrol eder; hidrofor gerekiyorsa gereken basınç artışını, gerekmiyorsa hidroforsuz çıkılabilecek azami yüksekliği ve alt katlarda basınç düşürücü gerekip gerekmediğini verir."
      formula="Püst = Pşebeke − 0,0981·Δh − ΔPkayıp  [bar],   Δhmaks = (Pşebeke − ΔPkayıp − Pmin)/0,0981,   ΔPhidrofor = Pmin − Püst"
      engineeringNote="Her 10 m yükseklik yaklaşık 1 bar basınç kaybettirir (ρ·g = 0,0981 bar/m). Şebeke basıncı belediye/su idaresinden öğrenilmeli ya da sayaç çıkışında ölçülmelidir; gün içinde (özellikle akşam pik saatlerde) düşer, tasarımda en düşük değer kullanılmalıdır. Kayıplara sayaç, filtre, çekvalf, boru sürtünmesi ve armatür kayıpları tasarım debisinde dahil edilir (konutlarda tipik 0,3–0,8 bar). Musluktaki asgari akış basıncı armatüre göre değişir; termostatik batarya, kombi ve el duşları genellikle 1–1,5 bar ister — üretici değerini kullanın. Alt katlarda yüksek statik basınç armatür ve hortumlara zarar verir, su darbesini artırır; yaygın uygulamada 5 bar üstünde basınç düşürücü takılır. Sınır değerler yerel tesisat yönetmeliğinden teyit edilmelidir."
      fields={[
        { key: "sebekeBasinci_bar", label: "Şebeke Basıncı (bar, en düşük)", type: "number", min: 0.5, step: 0.1 },
        { key: "yukseklikFarki_m", label: "Sayaçtan En Üst Musluğa Yükseklik Δh (m)", type: "number", min: 0, step: 1 },
        { key: "boruKayiplari_bar", label: "Boru + Sayaç + Armatür Kayıpları (bar)", type: "number", min: 0, step: 0.1 },
        { key: "asgariMuslukBasinci_bar", label: "Musluktaki Asgari Akış Basıncı (bar)", type: "number", min: 0.1, step: 0.1 },
        { key: "azamiStatikBasinc_bar", label: "Azami Statik Basınç (bar)", type: "number", min: 1, step: 0.5 },
      ]}
      defaults={{
        sebekeBasinci_bar: 3,
        yukseklikFarki_m: 15,
        boruKayiplari_bar: 0.5,
        asgariMuslukBasinci_bar: 1,
        azamiStatikBasinc_bar: 5,
      }}
      mainUnit="bar (üst kat akış basıncı)"
      mainValueKey="ustKatBasinci_bar"
      mainDecimals={2}
      intermediateLabels={{
        statik_yukseklik_kaybi_bar: "Statik Yükseklik Kaybı (bar)",
        ust_kat_statik_basinci_bar: "Üst Kat Statik Basıncı (bar, akış yokken)",
        hidroforsuz_azami_yukseklik_m: "Hidroforsuz Azami Yükseklik (m)",
        gereken_basinc_artisi_bar: "Gereken Basınç Artışı (bar)",
        gereken_basinc_artisi_mSS: "Gereken Basınç Artışı (mSS)",
      }}
    />
  );
}
