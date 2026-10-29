"use client";

import { istinatDuvariKaymaGuvenligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IstinatDuvariKaymaGuvenligiPage() {
  return (
    <CalcPage
      module={istinatDuvariKaymaGuvenligi}
      standardsLabel="Klasik geoteknik yaklaşımı (standart atfı yok)"
      description="İstinat duvarının taban kaymasına karşı güvenlik sayısını, taban sürtünmesi, adhezyon ve pasif dirençten hesaplar; gerekli güvenlik sayısıyla karşılaştırır."
      formula="FS = (ΣV·tanδ + ca·B + Pp)/ΣH   (δ ≈ 2/3·φ tipik, FS_gerekli ≥ 1,5 klasik değer)"
      engineeringNote="ΣV duvar, temel ve üzerindeki zemin ağırlığının toplamı; ΣH aktif toprak basıncının (Rankine/Coulomb) yatay bileşenidir (bkz. İstinat Duvarı Aktif Toprak Basıncı). Pasif direnç, ön tarafta kalıcı olmayabilecek zemine dayandığı için çoğu zaman güvenli tarafta 0 alınır. Taban adhezyonu kohezyonlu zeminde kullanılır, kuru ve iri daneli zeminde 0 alın. Gerekli FS'yi (örn. 1,5) projenizin yönetmeliğinden teyit edin; devrilme ve taşıma gücü kontrolleri ayrıca yapılmalıdır."
      fields={[
        { key: "toplamDusey_kNm", label: "Toplam Düşey Kuvvet ΣV (kN/m)", type: "number", min: 0.1, step: 10 },
        { key: "toplamYatay_kNm", label: "Toplam Yatay Kuvvet ΣH (kN/m)", type: "number", min: 0.1, step: 5 },
        { key: "tabanSurtunmeAcisi_derece", label: "Taban-Zemin Sürtünme Açısı δ (°)", type: "number", min: 0, step: 1 },
        { key: "tabanAdhezyonu_kPa", label: "Taban Adhezyonu ca (kPa)", type: "number", min: 0, step: 1 },
        { key: "tabanGenisligi_m", label: "Taban Genişliği B (m)", type: "number", min: 0.1, step: 0.1 },
        { key: "pasifDirenc_kNm", label: "Pasif Direnç Pp (kN/m)", type: "number", min: 0, step: 5 },
        { key: "gerekliFS", label: "Gerekli Güvenlik Sayısı", type: "number", min: 1, step: 0.1 },
      ]}
      defaults={{
        toplamDusey_kNm: 200,
        toplamYatay_kNm: 80,
        tabanSurtunmeAcisi_derece: 25,
        tabanAdhezyonu_kPa: 0,
        tabanGenisligi_m: 3,
        pasifDirenc_kNm: 0,
        gerekliFS: 1.5,
      }}
      mainUnit="(kayma güvenlik sayısı)"
      mainValueKey="kaymaGuvenlikSayisi"
      mainDecimals={2}
      intermediateLabels={{
        surtunme_direnci_kNm: "Sürtünme Direnci (kN/m)",
        adhezyon_direnci_kNm: "Adhezyon Direnci (kN/m)",
        toplam_direnc_kNm: "Toplam Direnç (kN/m)",
        gereken_ek_direnc_kNm: "Gereken Ek Direnç (kN/m)",
      }}
    />
  );
}
