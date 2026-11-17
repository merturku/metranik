"use client";

import { pompaKapaliVanaIsinmasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaKapaliVanaIsinmasiPage() {
  return (
    <CalcPage
      module={pompaKapaliVanaIsinmasi}
      standardsLabel={"Enerji dengesi / minimum debi ilkesi"}
      description={"Pompa kapalı vana (sıfır debi) durumunda mil gücünün gövdedeki suyu ısıtma hızını ve izin verilen sıcaklık artışına ulaşma süresini hesaplar."}
      formula={"dT/dt = Pmil/(m·cp);  t = ΔTizin/(dT/dt)"}
      engineeringNote={"Sıfır debide pompa gücünün tamamı gövde içindeki suya ısı olarak aktarılır; ısı kaybı ihmal edilir (tutucu). Mil gücü kapalı vanada anma gücünün tipik %30–60'ıdır, pompa eğrisinden alınmalıdır. Isınma kısa sürede sınıra ulaşıyorsa minimum debi hattı/by-pass veya akış anahtarı gerekir. İzin verilen artış (örn. 8 K) üretici/şartnameden teyit edilir."}
      fields={[
        { key: "milGucu_kW", label: "Kapalı Vanada Mil Gücü (kW)", type: "number", step: 0.5, min: 0.01 },
        { key: "suKutlesi_kg", label: "Gövde İçi Su Kütlesi (kg)", type: "number", step: 1, min: 0.1 },
        { key: "izinliArtis_K", label: "İzin Verilen Sıcaklık Artışı (K)", type: "number", step: 1, min: 0.1 },
      ]}
      defaults={{ milGucu_kW: 5, suKutlesi_kg: 20, izinliArtis_K: 8 }}
      mainUnit={"K/dk"}
      mainValueKey={"isinmaHizi_Kdk"}
      mainDecimals={2}
      intermediateLabels={{
        izinli_artis_suresi_dk: "İzinli Artışa Ulaşma Süresi (dk)",
        isinma_hizi_Ks: "Isınma Hızı (K/s)",
      }}
    />
  );
}
