"use client";

import { zeminSivilasmaGuvenlikSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminSivilasmaGuvenlikSayisiPage() {
  return (
    <CalcPage
      module={zeminSivilasmaGuvenlikSayisi}
      standardsLabel="Youd vd. (2001) NCEER"
      description="Kumlu zeminde belirli bir derinlik için depremin oluşturduğu tekrarlı gerilme oranını (CSR) SPT'den elde edilen sıvılaşma direnciyle (CRR) karşılaştırarak sıvılaşmaya karşı güvenlik sayısını hesaplar."
      formula="CSR = 0,65·(amaks/g)·(σv/σ'v)·rd,   CRR7,5 = 1/(34 − N) + N/135 + 50/(10N + 45)² − 1/200,   FS = CRR7,5·MSF·Kσ / CSR"
      engineeringNote="N, ince dane düzeltmesi yapılmış temiz kum eşdeğeri (N1)60cs'dir (enerji, çubuk boyu, örnekleyici, kuyu çapı ve örtü yükü düzeltmeleri yapılmış olmalı). TBDY 2018'de amaks = 0,4·SDS alınır; deprem büyüklüğü bölgedeki tasarım depremine göre seçilir (MSF = 10^2,24/Mw^2,56). Kσ yalnız σ'v > 100 kPa'da azaltma yapar; f gevşek-orta sıkı kumda 0,7–0,8, sıkı kumda 0,6–0,7. Yöntem 30 m'ye kadar ve (N1)60cs < 30 için geçerlidir. Gerekli güvenlik sayısını TBDY 2018 ve proje şartnamesinden teyit edin. Hesap her SPT derinliği için ayrı yapılmalıdır."
      fields={[
        { key: "maksYerIvmesi_g", label: "En Büyük Yer İvmesi amaks (g)", type: "number", min: 0.01, step: 0.05 },
        { key: "depremBuyuklugu_Mw", label: "Deprem Büyüklüğü Mw", type: "number", min: 5, step: 0.1 },
        { key: "derinlik_z_m", label: "İncelenen Derinlik z (m)", type: "number", min: 0.5, step: 0.5 },
        { key: "yeraltiSuyuDerinligi_m", label: "Yeraltı Su Seviyesi Derinliği (m)", type: "number", min: 0, step: 0.5 },
        { key: "dogalBirimHacimAgirlik_kNm3", label: "Su Üstü Birim Hacim Ağırlık γn (kN/m³)", type: "number", min: 10, step: 0.5 },
        { key: "doygunBirimHacimAgirlik_kNm3", label: "Doygun Birim Hacim Ağırlık γsat (kN/m³)", type: "number", min: 10, step: 0.5 },
        { key: "sptN1_60cs", label: "Düzeltilmiş SPT (N1)60cs", type: "number", min: 0, step: 1 },
        { key: "kSigmaUssu_f", label: "Kσ Üssü f (0,6–0,8)", type: "number", min: 0.6, step: 0.05 },
        { key: "gerekliGuvenlikSayisi", label: "Gerekli Güvenlik Sayısı", type: "number", min: 1, step: 0.05 },
      ]}
      defaults={{
        maksYerIvmesi_g: 0.3,
        depremBuyuklugu_Mw: 7.5,
        derinlik_z_m: 5,
        yeraltiSuyuDerinligi_m: 2,
        dogalBirimHacimAgirlik_kNm3: 19,
        doygunBirimHacimAgirlik_kNm3: 19,
        sptN1_60cs: 15,
        kSigmaUssu_f: 0.7,
        gerekliGuvenlikSayisi: 1.1,
      }}
      mainUnit="(FS)"
      mainValueKey="guvenlikSayisi_FS"
      mainDecimals={2}
      intermediateLabels={{
        toplam_gerilme_sigmaV_kPa: "Toplam Düşey Gerilme σv (kPa)",
        bosluk_suyu_basinci_u_kPa: "Boşluk Suyu Basıncı u (kPa)",
        efektif_gerilme_sigmaVe_kPa: "Efektif Düşey Gerilme σ'v (kPa)",
        gerilme_azaltma_katsayisi_rd: "Gerilme Azaltma Katsayısı rd",
        tekrarli_gerilme_orani_CSR: "Tekrarlı Gerilme Oranı CSR",
        direnc_orani_CRR75: "Sıvılaşma Direnci CRR7,5",
        buyukluk_olcek_katsayisi_MSF: "Büyüklük Ölçek Katsayısı MSF",
        efektif_gerilme_duzeltmesi_Ksigma: "Efektif Gerilme Düzeltmesi Kσ",
      }}
    />
  );
}
