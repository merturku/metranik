"use client";

import { kolonBoyutlandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KolonBoyutlandirmaPage() {
  return (
    <CalcPage
      module={kolonBoyutlandirma}
      standardsLabel="TS 500 / TBDY 2018"
      description="Kesit alanına ve donatı miktarına göre kolonun basit eksenel taşıma kapasitesini hesaplar."
      formula="Nu = 0.85×fcd×(Ac−As) + fyd×As"
      engineeringNote="Bu basitleştirilmiş hesap yalnızca eksenel yükü kapsar; moment-eksenel yük etkileşimi (M-N diyagramı) ve narinlik etkisi ayrıca kontrol edilmelidir."
      fields={[
        {
          key: "betonKarakteristikDayanim_fck_MPa",
          label: "Beton Karakteristik Dayanımı fck (MPa)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "celikAkmaDayanimi_fyk_MPa",
          label: "Çelik Akma Dayanımı fyk (MPa)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "kolonKesitAlani_Ac_mm2",
          label: "Kolon Kesit Alanı Ac (mm²)",
          type: "number",
          min: 1,
          step: 100,
        },
        {
          key: "donatiAlani_As_mm2",
          label: "Donatı Alanı As (mm²)",
          type: "number",
          min: 0,
          step: 10,
        },
      ]}
      defaults={{
        betonKarakteristikDayanim_fck_MPa: 25,
        celikAkmaDayanimi_fyk_MPa: 420,
        kolonKesitAlani_Ac_mm2: 90000,
        donatiAlani_As_mm2: 2513,
      }}
      mainUnit="kN"
      mainValueKey="eksenelKapasite_kN"
      intermediateLabels={{
        betonHesapDayanimi_fcd_MPa: "Beton Hesap Dayanımı (fcd, MPa)",
        celikHesapDayanimi_fyd_MPa: "Çelik Hesap Dayanımı (fyd, MPa)",
      }}
    />
  );
}
