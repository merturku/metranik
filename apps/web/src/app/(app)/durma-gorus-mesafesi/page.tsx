"use client";

import { durmaGorusMesafesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DurmaGorusMesafesiPage() {
  return (
    <CalcPage
      module={durmaGorusMesafesi}
      standardsLabel={"AASHTO Green Book (SSD)"}
      description={"Tasarım hızı, algılama-tepki süresi, fren yavaşlaması ve boyuna eğimden durma görüş mesafesini hesaplar."}
      formula={"d = 0,278·V·t + V²/(254·(a/9,81 ± G))"}
      engineeringNote={"V km/h, t saniye, a m/s², G boyuna eğim (yokuş yukarı +, aşağı −, ondalık). AASHTO Green Book tasarım değerleri t = 2,5 s ve a = 3,4 m/s²'dir; ülke şartnamesi farklı değer isteyebilir (örn. KGM). Islak zemin ve ağır taşıt için daha uzun mesafe gerekir."}
      fields={[
        { key: "hiz_kmh", label: "Tasarım Hızı V (km/h)", type: "number", step: 10, min: 5 },
        { key: "tepkiSuresi_s", label: "Algılama-Tepki Süresi t (s)", type: "number", step: 0.1, min: 0 },
        { key: "yavaslama_ms2", label: "Fren Yavaşlaması a (m/s²)", type: "number", step: 0.1, min: 0.5 },
        { key: "egim", label: "Boyuna Eğim G (m/m, aşağı −)", type: "number", step: 0.01 },
      ]}
      defaults={{ hiz_kmh: 100, tepkiSuresi_s: 2.5, yavaslama_ms2: 3.4, egim: 0 }}
      mainUnit={"m"}
      mainValueKey={"durmaMesafesi_m"}
      mainDecimals={1}
      intermediateLabels={{
        tepki_mesafesi_m: "Tepki Mesafesi (m)",
        fren_mesafesi_m: "Fren Mesafesi (m)",
      }}
    />
  );
}
