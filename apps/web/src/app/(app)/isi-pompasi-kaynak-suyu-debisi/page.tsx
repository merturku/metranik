"use client";

import { isiPompasiKaynakSuyuDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiPompasiKaynakSuyuDebisiPage() {
  return (
    <CalcPage
      module={isiPompasiKaynakSuyuDebisi}
      standardsLabel={"Enerji dengesi (COP)"}
      description={"Isıtma kapasitesi ve COP'tan evaporatörün çekeceği ısıyı, kompresör gücünü ve kuyu/göl/nehir kaynak suyu debisini hesaplar."}
      formula={"Qevap = Qısıtma·(1 − 1/COP);  ṁ = Qevap/(cp·ΔTkaynak);  Wkomp = Qısıtma/COP"}
      engineeringNote={"COP, işletme sıcaklık koşullarındaki (kaynak ve ısıtma suyu) değerdir. Kaynak suyunun donmaması için ΔT genellikle 3–5 K ile sınırlandırılır; ΔT küçüldükçe debi artar. Kuyu pompası ve geri basma (reenjeksiyon) kapasitesi bu debiyle kontrol edilmelidir; yer altı suyu kullanımı için ruhsat/izin gerekir."}
      fields={[
        { key: "isitmaKapasitesi_kW", label: "Isıtma Kapasitesi (kW)", type: "number", step: 5, min: 0.1 },
        { key: "cop", label: "COP", type: "number", step: 0.1, min: 1.01 },
        { key: "deltaT_K", label: "Kaynak Suyu Sıcaklık Düşümü ΔT (K)", type: "number", step: 0.5, min: 0.5 },
      ]}
      defaults={{ isitmaKapasitesi_kW: 50, cop: 4.5, deltaT_K: 4 }}
      mainUnit={"m³/h"}
      mainValueKey={"kaynakDebisi_m3h"}
      mainDecimals={2}
      intermediateLabels={{
        evaporator_isisi_kW: "Evaporatör Isısı (kW)",
        kompresor_gucu_kW: "Kompresör Gücü (kW)",
        kaynak_debisi_kgs: "Kaynak Suyu Debisi (kg/s)",
      }}
    />
  );
}
