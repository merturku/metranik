"use client";

import { cokKatmanliDuvarArayuzYogusmasiGlaser } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CokKatmanliDuvarArayuzYogusmasiGlaserPage() {
  return (
    <CalcPage
      module={cokKatmanliDuvarArayuzYogusmasiGlaser}
      standardsLabel={"TS EN ISO 13788"}
      description={"İç ve dış hava koşulları ile üç katmanın kalınlık, ısı iletkenliği ve buhar direnç faktöründen, katman arayüzlerindeki sıcaklığı ve buhar basıncını bulur; doyma basıncına oranla iç yoğuşma riskini kontrol eder."}
      formula={"θj = Ti − ΔT·ΣR/Rt;  pv,j = pv,i − (pv,i − pv,e)·Σsd/Σsd,t;  sd = μ·d;  yoğuşma: pv,j ≥ psat(θj)"}
      engineeringNote={"Yalnız iki arayüzde (1–2, 2–3) nokta kontrolü yapılır; tam Glaser diyagramı yüzeylerde ve katman içinde de çizilir. Oran ≥ 1 ise gerçek buhar basıncı doyma eğrisini izler ve yoğuşma miktarı hesaplanmalıdır (TS EN ISO 13788 aylık yöntem). Rsi = 0,13 ve Rse = 0,04 m²K/W alınmıştır. Katman sırası içten dışa girilir. μ ve λ değerleri malzeme beyanından alınmalı; buhar kesici katmanın μ·d değeri çok büyüktür. Kararlı hâl ve tek ortalama koşul varsayılır, mevsimsel birikim gözetilmez."}
      fields={[
        { key: "icSicaklik_C", label: "İç Sıcaklık (°C)", type: "number", step: 1 },
        { key: "icNem", label: "İç Bağıl Nem (0–1)", type: "number", step: 0.05, min: 0.05 },
        { key: "disSicaklik_C", label: "Dış Sıcaklık (°C)", type: "number", step: 1 },
        { key: "disNem", label: "Dış Bağıl Nem (0–1)", type: "number", step: 0.05, min: 0.05 },
        { key: "d1_m", label: "1. Katman (iç) Kalınlık (m)", type: "number", step: 0.01, min: 0.001 },
        { key: "lambda1", label: "1. Katman λ (W/m·K)", type: "number", step: 0.05, min: 0.01 },
        { key: "mu1", label: "1. Katman μ (buhar direnç faktörü)", type: "number", step: 1, min: 1 },
        { key: "d2_m", label: "2. Katman Kalınlık (m)", type: "number", step: 0.01, min: 0.001 },
        { key: "lambda2", label: "2. Katman λ (W/m·K)", type: "number", step: 0.05, min: 0.01 },
        { key: "mu2", label: "2. Katman μ", type: "number", step: 1, min: 1 },
        { key: "d3_m", label: "3. Katman (dış) Kalınlık (m)", type: "number", step: 0.01, min: 0.001 },
        { key: "lambda3", label: "3. Katman λ (W/m·K)", type: "number", step: 0.05, min: 0.01 },
        { key: "mu3", label: "3. Katman μ", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ icSicaklik_C: 20, icNem: 0.5, disSicaklik_C: -5, disNem: 0.8, d1_m: 0.02, lambda1: 0.87, mu1: 10, d2_m: 0.19, lambda2: 0.45, mu2: 10, d3_m: 0.05, lambda3: 0.04, mu3: 30 }}
      mainUnit={""}
      mainValueKey={"maksDoymaOrani"}
      mainDecimals={3}
      intermediateLabels={{
        arayuz1_sicaklik_C: "1–2. Katman Arayüz Sıcaklığı (°C)",
        arayuz1_pv_Pa: "1–2. Arayüz Buhar Basıncı (Pa)",
        arayuz1_psat_Pa: "1–2. Arayüz Doyma Basıncı (Pa)",
        arayuz2_sicaklik_C: "2–3. Katman Arayüz Sıcaklığı (°C)",
        arayuz2_pv_Pa: "2–3. Arayüz Buhar Basıncı (Pa)",
        arayuz2_psat_Pa: "2–3. Arayüz Doyma Basıncı (Pa)",
        U_degeri_Wm2K: "U Değeri (W/m²K)",
        toplam_sd_m: "Toplam Eşdeğer Difüzyon Kalınlığı (m)",
      }}
    />
  );
}
