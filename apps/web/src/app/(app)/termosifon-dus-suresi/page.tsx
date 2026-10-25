"use client";

import { termosifonDusSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TermosifonDusSuresiPage() {
  return (
    <CalcPage
      module={termosifonDusSuresi}
      standardsLabel="Karışım Enerji Dengesi"
      description="Termosifon veya boylerdeki sıcak suyun, şebeke suyuyla karıştırılıp istenen duş sıcaklığında kaç dakika yeteceğini ve depodan çekilen sıcak su debisini hesaplar."
      formula="Vkarışık = V × f × (Tdepo − Tşebeke)/(Tduş − Tşebeke),   t = Vkarışık / debi"
      engineeringNote="Kullanılabilir oran (f), depo içinde sıcak ve soğuk suyun karışması nedeniyle tüm hacmin depo sıcaklığında çekilemediğini hesaba katar; ideal durumda 1'dir, gerçek değer üreticiden alınmalıdır. Duş sırasında ısıtıcının çalışması ihmal edilmiştir. Lejyonella riskine karşı depo sıcaklığının 60 °C civarında tutulması önerilir. Şebeke suyu sıcaklığı kışın düştüğü için süre kışın kısalır."
      fields={[
        { key: "depoHacmi_L", label: "Depo Hacmi V (L)", type: "number", min: 5, step: 5 },
        { key: "depoSicakligi_C", label: "Depo Su Sıcaklığı (°C)", type: "number", min: 20, step: 5 },
        { key: "sebekeSuyuSicakligi_C", label: "Şebeke Suyu Sıcaklığı (°C)", type: "number", min: 1, step: 1 },
        { key: "dusSicakligi_C", label: "Duş Sıcaklığı (°C)", type: "number", min: 20, step: 1 },
        { key: "dusDebisi_Ldk", label: "Duş Debisi (L/dk)", type: "number", min: 1, step: 0.5 },
        { key: "kullanilabilirOran", label: "Kullanılabilir Oran f (0–1)", type: "number", min: 0.1, step: 0.05 },
      ]}
      defaults={{
        depoHacmi_L: 80,
        depoSicakligi_C: 60,
        sebekeSuyuSicakligi_C: 15,
        dusSicakligi_C: 40,
        dusDebisi_Ldk: 8,
        kullanilabilirOran: 1,
      }}
      mainUnit="dk"
      mainValueKey="dusSuresi_dk"
      mainDecimals={1}
      intermediateLabels={{
        karisik_su_hacmi_L: "Duş Sıcaklığında Karışık Su (L)",
        depodan_sicak_su_debisi_Ldk: "Depodan Çekilen Sıcak Su (L/dk)",
        sebekeden_soguk_su_debisi_Ldk: "Şebekeden Katılan Soğuk Su (L/dk)",
      }}
    />
  );
}
