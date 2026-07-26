"use client";

import { kazikTasimaKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KazikTasimaKapasitesiPage() {
  return (
    <CalcPage
      module={kazikTasimaKapasitesi}
      standardsLabel="Zemin Mekaniği (Statik Yöntem)"
      description="Kazık çapı, boyu, uç taşıma ve çevre sürtünme dirençlerine göre basit statik yöntemle izin verilen kazık taşıma kapasitesini hesaplar."
      formula="Qu = qp×Ap + fs×As, Qa = Qu / FS"
      engineeringNote="qp ve fs değerleri zemin etüdü (SPT/CPT veya laboratuvar) sonuçlarından mühendisçe belirlenmelidir; bu hesap ön boyutlandırma amaçlıdır, kazık yükleme deneyi ile teyit gerekir."
      fields={[
        { key: "kazikCapi_D_m", label: "Kazık Çapı D (m)", type: "number", min: 0.1, step: 0.05 },
        { key: "kazikBoyu_L_m", label: "Kazık Boyu L (m)", type: "number", min: 1, step: 0.5 },
        {
          key: "ucTasimaDirenci_qp_kPa",
          label: "Uç Taşıma Direnci qp (kPa)",
          type: "number",
          min: 1,
          step: 50,
        },
        {
          key: "cevreSurtunmeDirenci_fs_kPa",
          label: "Çevre Sürtünme Direnci fs (kPa)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "guvenlikKatsayisi_FS",
          label: "Güvenlik Katsayısı FS",
          type: "number",
          min: 1,
          step: 0.1,
        },
      ]}
      defaults={{
        kazikCapi_D_m: 0.4,
        kazikBoyu_L_m: 10,
        ucTasimaDirenci_qp_kPa: 1500,
        cevreSurtunmeDirenci_fs_kPa: 50,
        guvenlikKatsayisi_FS: 2.5,
      }}
      mainUnit="kN"
      mainValueKey="izinVerilenKapasite_Qa_kN"
      intermediateLabels={{
        ucAlani_Ap_m2: "Uç Alanı Ap (m²)",
        cevreAlani_As_m2: "Çevre Alanı As (m²)",
        ucTasimaKapasitesi_kN: "Uç Taşıma Kapasitesi (kN)",
        cevreSurtunmeKapasitesi_kN: "Çevre Sürtünme Kapasitesi (kN)",
        nihaiKapasite_Qu_kN: "Nihai Kapasite Qu (kN)",
      }}
    />
  );
}
