"use client";

import { notrTopraklamaDirenciSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function NotrTopraklamaDirenciSecimiPage() {
  return (
    <CalcPage
      module={notrTopraklamaDirenciSecimi}
      standardsLabel="Ohm Yasası"
      description="Faz gerilimi ve hedeflenen sınırlı toprak arıza akımından, jeneratör/trafo nötr topraklama direncini (NGR) hesaplar; arıza anındaki direnç güç kaybını bilgi amaçlı verir."
      formula="R = Vfaz / Iarıza, P = Iarıza²×R"
      engineeringNote="NGR, jeneratör/trafo nötrü ile toprak arasına bağlanarak toprak arıza akımını termik ve mekanik olarak zararsız bir seviyeye sınırlar (tipik yüzlerce amper). Güç kaybı yalnız arıza anında (kısa süreli) oluşur, sürekli rejim değildir."
      fields={[
        {
          key: "fazGerilimi_V",
          label: "Faz-Nötr Gerilimi (V)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "hedefArizaAkimi_A",
          label: "Hedef Arıza Akımı (A)",
          type: "number",
          min: 1,
          step: 10,
        },
      ]}
      defaults={{
        fazGerilimi_V: 231,
        hedefArizaAkimi_A: 400,
      }}
      mainUnit="Ω"
      mainValueKey="ngrDirenci_ohm"
      mainDecimals={4}
      intermediateLabels={{
        gucKaybi_kW: "Güç Kaybı (kW)",
      }}
    />
  );
}
