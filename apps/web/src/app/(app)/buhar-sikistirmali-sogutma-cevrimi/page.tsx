"use client";

import { buharSikistirmaliSogutmaCevrimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BuharSikistirmaliSogutmaCevrimiPage() {
  return (
    <CalcPage
      module={buharSikistirmaliSogutmaCevrimi}
      standardsLabel="Termodinamik çevrim analizi (P-h diyagramı)"
      description="Tek kademeli buhar sıkıştırmalı soğutma çevriminin COP'unu, soğutucu akışkan debisini, kompresör gücünü ve kondenserde atılan ısıyı, akışkanın P-h diyagramından okunan üç entalpi ile kompresör izentropik veriminden hesaplar."
      formula="h2 = h1 + (h2s − h1)/ηis,   qL = h1 − h3,   ṁ = QL/qL,   W = ṁ(h2 − h1),   QH = ṁ(h2 − h3),   COP = qL/(h2 − h1)"
      engineeringNote="h1 evaporatör çıkışındaki (kompresör emişi) kızgın buhar, h3 kondenser çıkışındaki (aşırı soğutulmuş) sıvı entalpisidir; kısılma vanası izentalpik olduğundan h4 = h3 alınır. h2s, emiş entropisinde (s2 = s1) yoğuşma basıncındaki entalpidir. Entalpiler aynı referans durumlu tablo/diyagramdan okunmalıdır (ASHRAE/IIR referansları farklı mutlak değer verir, farklar aynıdır). Kızdırma (superheat) h1'i, aşırı soğutma (subcooling) h3'ü değiştirerek COP'u etkiler. Boru basınç kayıpları ve kompresör ısı kaybı modellenmez; gerçek cihaz COP'u üretici verisinden (EN 14511 test koşulları) teyit edilmelidir. Isı pompası modunda faydalı ısı kondenser ısısıdır, COPısıtma = COPsoğutma + 1."
      fields={[
        { key: "sogutmaKapasitesi_kW", label: "Soğutma Kapasitesi QL (kW)", type: "number", min: 0.1, step: 0.5 },
        { key: "h1_kompresorGirisi_kJkg", label: "h1 — Kompresör Girişi (kJ/kg)", type: "number", step: 0.1 },
        { key: "h2s_izentropikCikis_kJkg", label: "h2s — İzentropik Kompresör Çıkışı (kJ/kg)", type: "number", step: 0.1 },
        { key: "h3_kondenserCikisi_kJkg", label: "h3 — Kondenser Çıkışı, Sıvı (kJ/kg)", type: "number", step: 0.1 },
        { key: "izentropikVerim", label: "Kompresör İzentropik Verimi ηis (0–1)", type: "number", min: 0.3, step: 0.01 },
      ]}
      defaults={{
        sogutmaKapasitesi_kW: 7.93,
        h1_kompresorGirisi_kJkg: 246.36,
        h2s_izentropikCikis_kJkg: 284.21,
        h3_kondenserCikisi_kJkg: 87.83,
        izentropikVerim: 0.939,
      }}
      mainUnit="COP (soğutma)"
      mainValueKey="copSogutma"
      mainDecimals={2}
      intermediateLabels={{
        h2_gercek_kompresor_cikisi_kJkg: "h2 — Gerçek Kompresör Çıkışı (kJ/kg)",
        sogutma_etkisi_qL_kJkg: "Soğutma Etkisi qL (kJ/kg)",
        kompresor_isi_w_kJkg: "Kompresör İşi w (kJ/kg)",
        kondenser_isi_qH_kJkg: "Kondenser Isısı qH (kJ/kg)",
        sogutucu_kutlesel_debi_kgs: "Soğutucu Akışkan Debisi (kg/s)",
        sogutucu_kutlesel_debi_kgh: "Soğutucu Akışkan Debisi (kg/h)",
        kompresor_gucu_kW: "Kompresör Gücü (kW)",
        kondenser_isi_atimi_kW: "Kondenser Isı Atımı (kW)",
        cop_isi_pompasi: "COP (ısı pompası modu)",
      }}
    />
  );
}
