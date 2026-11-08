"use client";

import { dosemeKirisYukAktarimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DosemeKirisYukAktarimiPage() {
  return (
    <CalcPage
      module={dosemeKirisYukAktarimi}
      standardsLabel="Yük alanı (zarf) yöntemi"
      description="Dört kenarı mesnetli iki doğrultuda çalışan döşemeden kısa ve uzun kenar kirişlerine gelen yükü, moment ve kesme eşdeğeri düzgün yayılı yük olarak hesaplar."
      formula="Kısa: q·lx/3;  Uzun: (q·lx/2)·(1 − m²/3),  m = lx/ly  (moment eşdeğeri);  kesme eşdeğeri: q·lx/4 ve (q·lx/2)(1 − m/2)"
      engineeringNote="Üçgen/yamuk yük alanı (zarf) yöntemidir; ly/lx > 2 ise döşeme tek doğrultuda çalışır ve yük uzun kenar kirişlerine q·lx/2 olarak aktarılır. Sürekli kiriş ve ankastre uç etkileri için moment dağıtımı ayrıca yapılmalıdır. Ana sonuç uzun kenar kirişi moment eşdeğeridir."
      fields={[
        { key: "dosemeYuku_kNm2", label: "Döşeme Tasarım Yükü q (kN/m²)", type: "number", step: 0.5, min: 0.1 },
        { key: "kisaKenar_lx_m", label: "Kısa Kenar lx (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "uzunKenar_ly_m", label: "Uzun Kenar ly (m)", type: "number", step: 0.1, min: 0.1 },
      ]}
      defaults={{ dosemeYuku_kNm2: 10, kisaKenar_lx_m: 4, uzunKenar_ly_m: 6 }}
      mainUnit="kN/m"
      mainValueKey="uzunKirisEsdegerYuk_kNm"
      mainDecimals={2}
      intermediateLabels={{
        m_orani_lx_ly: "m = lx/ly",
        kisa_kiris_moment_esdegeri_kNm: "Kısa Kiriş Moment Eşdeğeri (kN/m)",
        kisa_kiris_kesme_esdegeri_kNm: "Kısa Kiriş Kesme Eşdeğeri (kN/m)",
        uzun_kiris_kesme_esdegeri_kNm: "Uzun Kiriş Kesme Eşdeğeri (kN/m)",
        toplam_doseme_yuku_kN: "Toplam Döşeme Yükü (kN)",
        calisma_sekli: "Çalışma Şekli",
        not: "Not",
      }}
    />
  );
}
