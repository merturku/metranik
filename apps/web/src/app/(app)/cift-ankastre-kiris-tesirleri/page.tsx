"use client";

import { ciftAnkastreKirisTesirleri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CiftAnkastreKirisTesirleriPage() {
  return (
    <CalcPage
      module={ciftAnkastreKirisTesirleri}
      standardsLabel={'Klasik kiriş teorisi'}
      description={'İki ucu ankastre kirişte düzgün yayılı yük ve orta tekil yükten mesnet reaksiyonunu, uç/orta momentlerini ve sehimi hesaplar.'}
      formula={'R = wL/2 + P/2;  Muç = wL²/12 + PL/8;  Morta = wL²/24 + PL/8;  δ = wL⁴/(384EI) + PL³/(192EI)'}
      engineeringNote={'Elastik ve çatlamamış kesit kabulüyle klasik tablo çözümüdür; Muç + Morta = basit mesnetli kiriş momenti (denge kontrolü). Gerçek betonarmede mesnet dönmesi ve çatlama momentleri yeniden dağıtır, sehim artar. Moment işaretleri: uç çekme üst lifte, orta çekme alt lifte.'}
      fields={[
        { key: "aciklik_m", label: "Açıklık L (m)", type: "number", step: 0.5, min: 0.1 },
        { key: "yayiliYuk_kNm", label: "Yayılı Yük w (kN/m)", type: "number", step: 1, min: 0 },
        { key: "ortaTekilYuk_kN", label: "Orta Tekil Yük P (kN)", type: "number", step: 1, min: 0 },
        { key: "elastisiteModulu_GPa", label: "Elastisite Modülü E (GPa)", type: "number", step: 1, min: 1 },
        { key: "atalet_cm4", label: "Atalet Momenti I (cm⁴)", type: "number", step: 1000, min: 1 },
        { key: "sehimSiniriPaydasi", label: "Sehim Sınırı Paydası (L/n)", type: "number", step: 50, min: 1 },
      ]}
      defaults={{ aciklik_m: 6, yayiliYuk_kNm: 20, ortaTekilYuk_kN: 0, elastisiteModulu_GPa: 30, atalet_cm4: 200000, sehimSiniriPaydasi: 250 }}
      mainUnit={'kN·m'}
      mainValueKey={'ucMomenti_kNm'}
      mainDecimals={2}
      intermediateLabels={{
        mesnet_reaksiyonu_kN: "Mesnet reaksiyonu (kN)",
        aciklik_ortasi_momenti_kNm: "Orta moment (kN·m)",
        basit_mesnetli_Mmaks_kNm: "Basit mesnetli Mmaks (kN·m)",
        denge_kontrolu_Muc_arti_Morta_kNm: "Muç + Morta (kN·m)",
        EI_kNm2: "EI (kN·m²)",
        orta_sehim_mm: "Orta sehim (mm)",
        izin_sehim_mm: "İzin sehim (mm)",
      }}
    />
  );
}
