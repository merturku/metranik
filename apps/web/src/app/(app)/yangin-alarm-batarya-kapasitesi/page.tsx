"use client";

import { yanginAlarmBataryaKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanginAlarmBataryaKapasitesiPage() {
  return (
    <CalcPage
      module={yanginAlarmBataryaKapasitesi}
      standardsLabel={"NFPA 72 / EN 54-4"}
      description={"Yangın alarm paneli ikincil güç kaynağı (akü) için bekleme ve alarm akımlarından gereken amper-saat kapasitesini hesaplar ve seçilen aküyle karşılaştırır."}
      formula={"Ah = (I_bekleme·t_bekleme + I_alarm·t_alarm)·f"}
      engineeringNote={"NFPA 72: 24 saat bekleme + 5 dakika alarm (sesli tahliye sistemlerinde 15 dakika); EN 54-4 ve ulusal şartnameler farklı süre isteyebilir, projenin şartnamesinden teyit edin. Emniyet katsayısı akü yaşlanması, düşük sıcaklık ve deşarj akımı etkisini karşılar (yaygın 1,2–1,25; üretici deşarj eğrisinden teyit edin). Akımlar panel dahil tüm dedektör, modül ve sirenlerin toplamı olmalıdır. 24 V sistemde iki adet 12 V akü seridir: kapasite (Ah) tek akünün değeridir."}
      fields={[
        { key: "beklemeAkimi_mA", label: "Bekleme Akımı (mA)", type: "number", step: 10, min: 0 },
        { key: "alarmAkimi_mA", label: "Alarm Akımı (mA)", type: "number", step: 10, min: 0 },
        { key: "beklemeSuresi_saat", label: "Bekleme Süresi (saat)", type: "number", step: 1, min: 1 },
        { key: "alarmSuresi_dk", label: "Alarm Süresi (dakika)", type: "number", step: 1, min: 0 },
        { key: "emniyetKatsayisi", label: "Emniyet / Yaşlanma Katsayısı", type: "number", step: 0.05, min: 1 },
        { key: "secilenBatarya_Ah", label: "Seçilen Akü Kapasitesi (Ah)", type: "number", step: 0.1, min: 0.1 },
      ]}
      defaults={{ beklemeAkimi_mA: 60, alarmAkimi_mA: 300, beklemeSuresi_saat: 24, alarmSuresi_dk: 5, emniyetKatsayisi: 1.25, secilenBatarya_Ah: 2.4 }}
      mainUnit={"Ah"}
      mainValueKey={"gerekliKapasite_Ah"}
      mainDecimals={2}
      intermediateLabels={{
        bekleme_Ah: "Bekleme Tüketimi (Ah)",
        alarm_Ah: "Alarm Tüketimi (Ah)",
        net_Ah: "Net Tüketim (Ah)",
        gerekli_Ah: "Gerekli Kapasite (Ah)",
        secilen_Ah: "Seçilen Kapasite (Ah)",
        kapasite_kullanim_orani: "Kapasite Kullanım Oranı",
      }}
    />
  );
}
