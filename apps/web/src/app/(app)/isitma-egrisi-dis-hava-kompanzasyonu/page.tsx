"use client";

import { isitmaEgrisiDisHavaKompanzasyonu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsitmaEgrisiDisHavaKompanzasyonuPage() {
  return (
    <CalcPage
      module={isitmaEgrisiDisHavaKompanzasyonu}
      standardsLabel="TS EN 442-2 — radyatör üstel yasası"
      description="Dış hava sıcaklığına göre radyatörlü sistemin gerekli gidiş ve dönüş su sıcaklığını (ısıtma eğrisi noktası) hesaplar."
      formula="φ = (Ti−Te)/(Ti−Te,tas);  Tm = Ti + ΔTN·φ^(1/n);  Tgidiş = Tm + ΔTw,N·φ/2"
      engineeringNote="Sabit debi ve doğrusal yük–dış sıcaklık ilişkisi kabul edilir; güneş ve iç kazançlar ihmal edilir. ΔTN aritmetik ortalama aşırı sıcaklıktır (EN 442 logaritmik ortalamadan küçük fark verebilir). Üstel n radyatör tipine göre üretici verisidir (panel ≈ 1,3)."
      fields={[
        { key: "icSicaklik_C", label: "İç Sıcaklık Ti (°C)", type: "number", step: 1 },
        { key: "tasarimDisSicaklik_C", label: "Tasarım Dış Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "anlikDisSicaklik_C", label: "Anlık Dış Sıcaklık Te (°C)", type: "number", step: 1 },
        { key: "tasarimGidis_C", label: "Tasarım Gidiş Suyu (°C)", type: "number", step: 1 },
        { key: "tasarimDonus_C", label: "Tasarım Dönüş Suyu (°C)", type: "number", step: 1 },
        { key: "radyatorUssu", label: "Radyatör Üstü n", type: "number", step: 0.05, min: 1 },
      ]}
      defaults={{ icSicaklik_C: 20, tasarimDisSicaklik_C: -5, anlikDisSicaklik_C: 7.5, tasarimGidis_C: 75, tasarimDonus_C: 65, radyatorUssu: 1.3 }}
      mainUnit="°C (gidiş)"
      mainValueKey="gidisSicakligi_C"
      mainDecimals={1}
      intermediateLabels={{
        yuk_orani: "Yük Oranı φ",
        tasarim_ortalama_asiri_sicaklik_K: "Tasarım Ortalama Aşırı Sıcaklık ΔTN (K)",
        ortalama_su_sicakligi_C: "Ortalama Su Sıcaklığı (°C)",
        su_sicaklik_farki_K: "Gidiş–Dönüş Farkı (K)",
        donus_sicakligi_C: "Dönüş Sıcaklığı (°C)",
      }}
    />
  );
}
