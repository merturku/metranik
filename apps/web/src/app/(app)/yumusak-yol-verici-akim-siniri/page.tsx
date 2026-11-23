"use client";

import { yumusakYolVericiAkimSiniri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YumusakYolVericiAkimSiniriPage() {
  return (
    <CalcPage
      module={yumusakYolVericiAkimSiniri}
      standardsLabel={'IEC 60947-4-2'}
      description={'Soft starter başlangıç gerilimine göre kalkış akımını, kalkış momentini ve yük momentine göre marjı hesaplar.'}
      formula={'I = (Ik/In)·In·u;  T = (Tk/Tn)·u² [Tn];  umin = √(1,25·Tyük/Tk)'}
      engineeringNote={'İdeal asenkron motor kabulüyle akım gerilimle, moment gerilimin karesiyle değişir. 1,25 moment marjı pratik bir eşiktir, standart değeri değildir. Gerçek soft starter akım sınırı, rampa süresi ve motor eğrisi üretici verisinden teyit edilmelidir.'}
      fields={[
        { key: "anmaAkimi_A", label: "Motor Anma Akımı In (A)", type: "number", step: 1, min: 0.1 },
        { key: "direktKalkisAkimOrani", label: "Direkt Kalkış Akım Oranı Ik/In", type: "number", step: 0.5, min: 1 },
        { key: "direktKalkisMomentOrani", label: "Direkt Kalkış Moment Oranı Tk/Tn", type: "number", step: 0.1, min: 0.1 },
        { key: "baslangicGerilimi_yuzde", label: "Başlangıç Gerilimi (% U)", type: "number", step: 5, min: 10 },
        { key: "yukMomentOrani", label: "Yük Momenti (Tn katı)", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ anmaAkimi_A: 100, direktKalkisAkimOrani: 7, direktKalkisMomentOrani: 2, baslangicGerilimi_yuzde: 50, yukMomentOrani: 0.3 }}
      mainUnit={'A'}
      mainValueKey={'kalkisAkimi_A'}
      mainDecimals={1}
      intermediateLabels={{
        direkt_yol_akimi_A: "Direkt yol akımı (A)",
        akim_orani_direkt_e: "u (gerilim oranı)",
        kalkis_momenti_Tn: "Kalkış momenti (Tn)",
        moment_marji_Tkalkis_Tyuk: "Moment marjı",
        min_baslangic_gerilimi_yuzde: "Asgari başlangıç gerilimi (%)",
        min_gerilimde_akim_A: "Asgari gerilimde akım (A)",
      }}
    />
  );
}
