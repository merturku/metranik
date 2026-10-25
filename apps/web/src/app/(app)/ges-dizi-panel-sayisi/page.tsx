"use client";

import { gesDiziPanelSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GesDiziPanelSayisiPage() {
  return (
    <CalcPage
      module={gesDiziPanelSayisi}
      standardsLabel="IEC 62548"
      description="Güneş paneli katalog değerleri ve invertör gerilim sınırlarından bir dizideki (string) seri panel sayısının alt ve üst sınırını hesaplar; seçilen panel sayısını invertör azami DC gerilimi ve MPPT penceresiyle kontrol eder."
      formula="V(T) = VSTC·[1 + β/100·(T − 25)],   Nmaks = ⌊Vdc,maks / Voc(Tmin)⌋,   Nmin = ⌈VMPPT,min / Vmp(Tmaks)⌉"
      engineeringNote="Panel gerilimi soğukta artar: en düşük hücre sıcaklığı olarak sahadaki en düşük ortam sıcaklığı (güneş doğarken hücre ≈ ortam) alınır. Voc(Tmin) ile hesaplanan dizi gerilimi invertörün azami DC giriş gerilimini asla aşmamalıdır — aşılırsa invertör kalıcı hasar görebilir. En yüksek hücre sıcaklığı yazın ortam + 25…35 K alınabilir. Vmp katsayısı katalogda yoksa Pmax katsayısı yaklaşık olarak kullanılabilir. Dizi akımı (Isc × 1,25) ve kablo/sigorta seçimi ayrıca kontrol edilmelidir."
      fields={[
        { key: "panelVoc_V", label: "Panel Açık Devre Gerilimi Voc (V, STC)", type: "number", min: 1, step: 0.1 },
        { key: "panelVmp_V", label: "Panel MPP Gerilimi Vmp (V, STC)", type: "number", min: 1, step: 0.1 },
        { key: "vocSicaklikKatsayisi_yuzdeK", label: "Voc Sıcaklık Katsayısı (%/K)", type: "number", step: 0.01 },
        { key: "vmpSicaklikKatsayisi_yuzdeK", label: "Vmp Sıcaklık Katsayısı (%/K)", type: "number", step: 0.01 },
        { key: "enDusukHucreSicakligi_C", label: "En Düşük Hücre Sıcaklığı (°C)", type: "number", min: -40, step: 1 },
        { key: "enYuksekHucreSicakligi_C", label: "En Yüksek Hücre Sıcaklığı (°C)", type: "number", min: 25, step: 1 },
        { key: "invertorMaksDcGerilimi_V", label: "İnvertör Azami DC Gerilimi (V)", type: "number", min: 1, step: 50 },
        { key: "mpptMinGerilimi_V", label: "MPPT Alt Gerilimi (V)", type: "number", min: 1, step: 10 },
        { key: "mpptMaksGerilimi_V", label: "MPPT Üst Gerilimi (V)", type: "number", min: 1, step: 10 },
        { key: "dizidekiPanelSayisi", label: "Dizideki Panel Sayısı", type: "number", min: 1, step: 1 },
      ]}
      defaults={{
        panelVoc_V: 49.5,
        panelVmp_V: 41.7,
        vocSicaklikKatsayisi_yuzdeK: -0.27,
        vmpSicaklikKatsayisi_yuzdeK: -0.35,
        enDusukHucreSicakligi_C: -10,
        enYuksekHucreSicakligi_C: 70,
        invertorMaksDcGerilimi_V: 1000,
        mpptMinGerilimi_V: 200,
        mpptMaksGerilimi_V: 850,
        dizidekiPanelSayisi: 18,
      }}
      mainUnit="panel (azami)"
      mainValueKey="maksPanelSayisi"
      mainDecimals={0}
      intermediateLabels={{
        panel_voc_en_dusuk_sicaklikta_V: "Panel Voc, En Düşük Sıcaklıkta (V)",
        panel_vmp_en_yuksek_sicaklikta_V: "Panel Vmp, En Yüksek Sıcaklıkta (V)",
        panel_vmp_en_dusuk_sicaklikta_V: "Panel Vmp, En Düşük Sıcaklıkta (V)",
        min_panel_sayisi_mppt: "MPPT İçin Asgari Panel Sayısı",
        maks_panel_sayisi_mppt: "MPPT İçin Azami Panel Sayısı",
        dizi_voc_en_dusuk_sicaklikta_V: "Dizi Voc, En Düşük Sıcaklıkta (V)",
        dizi_vmp_en_yuksek_sicaklikta_V: "Dizi Vmp, En Yüksek Sıcaklıkta (V)",
        dizi_vmp_en_dusuk_sicaklikta_V: "Dizi Vmp, En Düşük Sıcaklıkta (V)",
      }}
    />
  );
}
