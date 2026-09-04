"use client";

import { flasBuharOrani } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FlasBuharOraniPage() {
  return (
    <CalcPage
      module={flasBuharOrani}
      standardsLabel="Entalpi Dengesi"
      description="Blöf tankına giren yüksek basınçlı doymuş suyun düşük basınca genleşmesiyle oluşan flaş buhar oranını ve debisini, ilgili basınçlardaki buhar tablosu entalpileriyle hesaplar."
      formula="x = (hf,yüksek - hf,düşük) / hfg,düşük"
      engineeringNote="hf ve hfg değerleri, ilgili yüksek/düşük basınçlar için buhar tablolarından alınmalıdır. Buhar Kazanı Besi Suyu Debisi modülünün ürettiği blöf debisinin ne kadarının flaş buhara dönüştüğünü gösterir."
      fields={[
        {
          key: "blofDebisi_kgh",
          label: "Blöf Debisi (kg/h)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "yuksekBasincDoymusSuEntalpisi_hfYuksek_kJkg",
          label: "Yüksek Basınç Doymuş Su Entalpisi hf (kJ/kg)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "dusukBasincDoymusSuEntalpisi_hfDusuk_kJkg",
          label: "Düşük Basınç Doymuş Su Entalpisi hf (kJ/kg)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "dusukBasincBuharlasmaGizliIsisi_hfgDusuk_kJkg",
          label: "Düşük Basınç Buharlaşma Gizli Isısı hfg (kJ/kg)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        blofDebisi_kgh: 500,
        yuksekBasincDoymusSuEntalpisi_hfYuksek_kJkg: 762.6,
        dusukBasincDoymusSuEntalpisi_hfDusuk_kJkg: 419.1,
        dusukBasincBuharlasmaGizliIsisi_hfgDusuk_kJkg: 2256.9,
      }}
      mainUnit="kg/h"
      mainValueKey="flasBuharDebisi_kgh"
      mainDecimals={1}
      intermediateLabels={{
        flasBuharOrani_x: "Flaş Buhar Oranı x",
      }}
    />
  );
}
