"use client";

import { celikCekmeElemaniDayanimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CelikCekmeElemaniDayanimiPage() {
  return (
    <CalcPage
      module={celikCekmeElemaniDayanimi}
      standardsLabel="TS EN 1993-1-1 §6.2.3"
      description="Çelik çekme elemanının tasarım çekme dayanımını brüt kesit akması ve delikli net kesit kopması durumlarından hesaplar; küçüğünü belirleyici alıp tasarım çekme kuvvetiyle karşılaştırır."
      formula="Npl,Rd = A·fy/γM0,   Nu,Rd = 0,9·Anet·fu/γM2,   NRd = min(Npl,Rd; Nu,Rd),   NEd/NRd ≤ 1   (γM0 = 1,00, γM2 = 1,25)"
      engineeringNote="Net alan, bulon deliklerinin çıkarılmasıyla (şaşırtmalı deliklerde s²/4p düzeltmesiyle) bulunur; bu modül Anet'i doğrudan girdi alır. Tek taraflı bağlanan köşebent/U profilde bağlantı dışmerkezliği için TS EN 1993-1-8 §3.10.3 ile ayrıca Nu,Rd düzeltmesi gerekir (burada yapılmaz). Kayma kategorisi C (öngermeli, kaymaya karşı) birleşimlerde yalnız Npl,Rd (net kesit akma kontrolü, §6.2.3(4)) esas alınır. Ulusal ekteki γM değerlerini teyit edin; ayrıca eleman narinliği (titreşim/kendi ağırlığı) ve birleşim dayanımı ayrıca kontrol edilmelidir. NEd = 0 girilirse yalnız dayanım hesaplanır."
      fields={[
        { key: "brutAlan_mm2", label: "Brüt Kesit Alanı A (mm²)", type: "number", min: 1, step: 50 },
        { key: "netAlan_mm2", label: "Net Kesit Alanı Anet (mm²)", type: "number", min: 1, step: 50 },
        { key: "akmaDayanimi_fy_MPa", label: "Akma Dayanımı fy (MPa)", type: "number", min: 1, step: 5 },
        { key: "cekmeDayanimi_fu_MPa", label: "Çekme Dayanımı fu (MPa)", type: "number", min: 1, step: 5 },
        { key: "tasarimCekmeKuvveti_NEd_kN", label: "Tasarım Çekme Kuvveti NEd (kN, 0 = karşılaştırma yok)", type: "number", min: 0, step: 10 },
      ]}
      defaults={{
        brutAlan_mm2: 2000,
        netAlan_mm2: 1700,
        akmaDayanimi_fy_MPa: 355,
        cekmeDayanimi_fu_MPa: 490,
        tasarimCekmeKuvveti_NEd_kN: 500,
      }}
      mainUnit="kN (tasarım çekme dayanımı)"
      mainValueKey="cekmeDayanimi_NRd_kN"
      mainDecimals={1}
      intermediateLabels={{
        Npl_Rd_kN: "Brüt Kesit Akması Npl,Rd (kN)",
        Nu_Rd_kN: "Net Kesit Kopması Nu,Rd (kN)",
        belirleyici: "Belirleyici Durum",
        kullanim_orani: "Kullanım Oranı NEd/NRd",
        net_brut_alan_orani: "Net / Brüt Alan Oranı",
      }}
    />
  );
}
