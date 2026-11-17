"use client";

import { upsIsiYayilimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function UpsIsiYayilimiPage() {
  return (
    <CalcPage
      module={upsIsiYayilimi}
      standardsLabel={"IEC 62040-3"}
      description={"UPS çıkış gücü ve verimden salınan ısıyı, yedek payıyla birlikte gerekli soğutma kapasitesini (kW, BTU/h, TR) hesaplar."}
      formula={"Qısı = Pçıkış·(1/η − 1);  Qsoğutma = Qısı·(1 + yedek)"}
      engineeringNote={"Verim, çalışılan yük oranındaki değerdir (IEC 62040-3 yük noktaları); kısmi yükte verim düşer, üretici eğrisinden okuyun. Batarya şarj kaybı, giriş trafosu ve pano ısıları dahil değildir. Isı yükü soğutma ekipmanı seçimi için ön değerdir."}
      fields={[
        { key: "cikisGucu_kW", label: "UPS Çıkış Gücü (kW)", type: "number", step: 5, min: 0.1 },
        { key: "verim", label: "Çalışma Noktası Verimi (0–1)", type: "number", step: 0.01, min: 0.5 },
        { key: "yedekPayi", label: "Soğutma Yedek Payı (0–1)", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ cikisGucu_kW: 100, verim: 0.94, yedekPayi: 0.2 }}
      mainUnit={"kW"}
      mainValueKey={"isiYayilimi_kW"}
      mainDecimals={2}
      intermediateLabels={{
        giris_gucu_kW: "UPS Giriş Gücü (kW)",
        gerekli_sogutma_kW: "Gerekli Soğutma (kW)",
        gerekli_sogutma_BTUh: "Gerekli Soğutma (BTU/h)",
        gerekli_sogutma_TR: "Gerekli Soğutma (TR)",
      }}
    />
  );
}
