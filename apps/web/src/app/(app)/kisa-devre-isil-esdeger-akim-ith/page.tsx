"use client";

import { kisaDevreIsilEsdegerAkimIth } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KisaDevreIsilEsdegerAkimIthPage() {
  return (
    <CalcPage
      module={kisaDevreIsilEsdegerAkimIth}
      standardsLabel={"IEC 60909-0"}
      description={"Başlangıç kısa devre akımı, darbe faktörü ve süreden ısıl eşdeğer kısa devre akımını (Ith) hesaplar ve ekipmanın nominal kısa süreli dayanım akımıyla aynı ısıl etki (I²t) esasında karşılaştırır."}
      formula={"Ith = Ik″·√(m + n);  m = (e^(4f·Tk·ln(κ−1)) − 1)/(2f·Tk·ln(κ−1));  Ith·√(Tk/Tkr) ≤ Ithr"}
      engineeringNote={"n = 1 jeneratörden uzak kısa devreleri kapsar (AC bileşen sönümsüz). Jeneratöre yakın arızalarda n < 1 olabilir (IEC 60909-0 Şekil 22 eğrileri). κ, R/X oranından IEC 60909-0 bağıntısıyla bulunur (κ = 1,02 + 0,98e^(−3R/X)); bu platformdaki Darbe Kısa Devre Akımı modülü κ'yı üretir. Eşdeğerlik I²t esasına dayanır; kısa süreli dayanım Tkr'nin 1 s veya 3 s olması ekipman belgesinden alınır. Dinamik dayanım (tepe akım ip) ayrıca kontrol edilmelidir."}
      fields={[
        { key: "ik_kA", label: "Başlangıç Kısa Devre Akımı Ik″ (kA)", type: "number", step: 1, min: 0.1 },
        { key: "kappa", label: "Darbe Faktörü κ (1–2)", type: "number", step: 0.05, min: 1.01 },
        { key: "sure_s", label: "Kısa Devre Süresi Tk (s)", type: "number", step: 0.1, min: 0.01 },
        { key: "frekans_Hz", label: "Frekans (Hz)", type: "number", step: 10, min: 1 },
        { key: "n", label: "AC Bileşen Faktörü n (generatörden uzakta 1)", type: "number", step: 0.1, min: 0 },
        { key: "ithr_kA", label: "Nominal Kısa Süreli Dayanım Ithr (kA)", type: "number", step: 1, min: 0.1 },
        { key: "tkr_s", label: "Nominal Dayanım Süresi Tkr (s)", type: "number", step: 0.5, min: 0.01 },
      ]}
      defaults={{ ik_kA: 20, kappa: 1.8, sure_s: 1, frekans_Hz: 50, n: 1, ithr_kA: 25, tkr_s: 1 }}
      mainUnit={"kA"}
      mainValueKey={"ith_kA"}
      mainDecimals={2}
      intermediateLabels={{
        m_faktoru: "DC Bileşen Faktörü m",
        sqrt_m_n: "√(m + n)",
        esdeger_akim_nominal_sure_kA: "Nominal Süreye Eşdeğer Akım (kA)",
        kullanim_orani: "Kullanım Oranı",
      }}
    />
  );
}
