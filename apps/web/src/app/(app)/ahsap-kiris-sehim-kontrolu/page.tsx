"use client";

import { ahsapKirisSehimKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AhsapKirisSehimKontroluPage() {
  return (
    <CalcPage
      module={ahsapKirisSehimKontrolu}
      standardsLabel="TS EN 1995-1-1 §2.2.3"
      description="Basit mesnetli, düzgün yayılı yüklü masif ahşap kirişin anlık sehimini ve sünme etkisini içeren nihai sehimini hesaplar; servis sınıfına göre sünme katsayısını uygulayarak seçilen sehim sınırlarıyla karşılaştırır."
      formula="uinst = 5wL⁴/(384·E0,mean·I),   ufin = uinst,G·(1 + kdef) + uinst,Q·(1 + ψ2·kdef)"
      engineeringNote="Ahşapta sünme sehimi zamanla belirgin artırır: iç mekânda kdef = 0,6, korunaklı dışta 0,8, açık havada 2,0 (nihai sehim kalıcı yükte 3 katına çıkar). ψ2 yarı kalıcı yük katsayısıdır (konut/ofis kullanım yükü 0,3, depolama 0,8, kar 0–0,2). Sınırlar TS EN 1995-1-1 Tablo 7.2'nin önerdiği aralıklardan seçilir (anlık L/300–L/500, nihai L/150–L/300); hassas kaplamalı döşemelerde daha sıkı sınır kullanın. Kayma sehimi ihmal edilmiştir; kısa ve yüksek kirişlerde (L/h < 15) ayrıca hesaplanmalıdır. Titreşim kontrolü (konut döşemeleri) bu hesabın kapsamı dışındadır."
      fields={[
        {
          key: "dayanimSinifi",
          label: "Dayanım Sınıfı",
          type: "select",
          options: [
            { value: "C16", label: "C16 (E0,mean 8000 MPa)" },
            { value: "C24", label: "C24 (E0,mean 11 000 MPa)" },
            { value: "C30", label: "C30 (E0,mean 12 000 MPa)" },
          ],
        },
        { key: "genislik_b_mm", label: "Kesit Genişliği b (mm)", type: "number", min: 10, step: 10 },
        { key: "yukseklik_h_mm", label: "Kesit Yüksekliği h (mm)", type: "number", min: 10, step: 10 },
        { key: "aciklik_L_m", label: "Açıklık L (m)", type: "number", min: 0.5, step: 0.25 },
        { key: "kaliciYuk_gk_kNm", label: "Kalıcı Yük gk (kN/m)", type: "number", min: 0, step: 0.1 },
        { key: "hareketliYuk_qk_kNm", label: "Hareketli Yük qk (kN/m)", type: "number", min: 0, step: 0.1 },
        { key: "yariKaliciKatsayi_psi2", label: "Yarı Kalıcı Katsayı ψ2", type: "number", min: 0, step: 0.1 },
        {
          key: "servisSinifi",
          label: "Servis Sınıfı",
          type: "select",
          options: [
            { value: "1", label: "1 — ısıtılan iç mekân (kdef 0,6)" },
            { value: "2", label: "2 — korunaklı dış (kdef 0,8)" },
            { value: "3", label: "3 — açık hava (kdef 2,0)" },
          ],
        },
        { key: "anlikSinirPaydasi", label: "Anlık Sehim Sınırı L/…", type: "number", min: 100, step: 50 },
        { key: "nihaiSinirPaydasi", label: "Nihai Sehim Sınırı L/…", type: "number", min: 100, step: 50 },
      ]}
      defaults={{
        dayanimSinifi: "C24",
        genislik_b_mm: 100,
        yukseklik_h_mm: 200,
        aciklik_L_m: 4,
        kaliciYuk_gk_kNm: 0.5,
        hareketliYuk_qk_kNm: 1.5,
        yariKaliciKatsayi_psi2: 0.3,
        servisSinifi: "1",
        anlikSinirPaydasi: 300,
        nihaiSinirPaydasi: 250,
      }}
      mainUnit="mm (nihai sehim)"
      mainValueKey="nihaiSehim_mm"
      mainDecimals={1}
      intermediateLabels={{
        elastisite_modulu_E0mean_MPa: "Elastisite Modülü E0,mean (MPa)",
        atalet_momenti_I_cm4: "Atalet Momenti I (cm⁴)",
        kalici_yuk_anlik_sehimi_mm: "Kalıcı Yük Anlık Sehimi (mm)",
        hareketli_yuk_anlik_sehimi_mm: "Hareketli Yük Anlık Sehimi (mm)",
        toplam_anlik_sehim_mm: "Toplam Anlık Sehim (mm)",
        sunme_katsayisi_kdef: "Sünme Katsayısı kdef",
        anlik_sehim_siniri_mm: "Anlık Sehim Sınırı (mm)",
        nihai_sehim_siniri_mm: "Nihai Sehim Sınırı (mm)",
      }}
    />
  );
}
