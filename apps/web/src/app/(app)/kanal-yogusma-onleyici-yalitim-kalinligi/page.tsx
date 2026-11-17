"use client";

import { kanalYogusmaOnleyiciYalitimKalinligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalYogusmaOnleyiciYalitimKalinligiPage() {
  return (
    <CalcPage
      module={kanalYogusmaOnleyiciYalitimKalinligi}
      standardsLabel={"TS EN ISO 12241 (düzlemsel direnç)"}
      description={"Soğuk hava kanalı dış yüzeyinde yoğuşmayı önlemek için yüzey sıcaklığını çiy noktasının üzerinde tutan asgari yalıtım kalınlığını hesaplar."}
      formula={"Td = çiy noktası(Ta, RH);  Ts = Td + pay;  t = λ·(1/ho)·[(Ta − Tc)/(Ta − Ts) − 1]"}
      engineeringNote={"Düzlemsel (dikdörtgen kanal) direnç ağı: yalıtımlı sacın iç yüzeyi soğuk hava sıcaklığında kabul edilir (iç taşınım ve sac direnci ihmal). Çiy noktası Magnus-Tetens (a = 17,62; b = 243,12) ile bulunur; ho dış yüzey taşınım+ışınım katsayısıdır (durgun havada ≈ 8 W/m²K). Boru için silindirik hesap ayrı modüldedir; buhar kesici (nem bariyeri) ayrıca gereklidir."}
      fields={[
        { key: "ortamSicakligi_C", label: "Ortam Hava Sıcaklığı Ta (°C)", type: "number", step: 1 },
        { key: "bagilNem_pct", label: "Ortam Bağıl Nemi (%)", type: "number", step: 5, min: 1 },
        { key: "kanalSicakligi_C", label: "Kanal İç (Soğuk Hava) Sıcaklığı Tc (°C)", type: "number", step: 1 },
        { key: "lambda_WmK", label: "Yalıtım λ (W/mK)", type: "number", step: 0.005, min: 0.01 },
        { key: "hDis_Wm2K", label: "Dış Yüzey Isı Taşınım Katsayısı ho (W/m²K)", type: "number", step: 0.5, min: 1 },
        { key: "pay_K", label: "Çiy Noktası Güvenlik Payı (K)", type: "number", step: 0.5, min: 0 },
      ]}
      defaults={{ ortamSicakligi_C: 30, bagilNem_pct: 60, kanalSicakligi_C: 12, lambda_WmK: 0.035, hDis_Wm2K: 8, pay_K: 1 }}
      mainUnit={"mm"}
      mainValueKey={"kalinlik_mm"}
      mainDecimals={1}
      intermediateLabels={{
        ciy_noktasi_C: "Çiy Noktası (°C)",
        hedef_yuzey_sicakligi_C: "Hedef Yüzey Sıcaklığı (°C)",
        not_: "Not",
      }}
    />
  );
}
