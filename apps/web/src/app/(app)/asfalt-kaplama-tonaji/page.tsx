"use client";

import { asfaltKaplamaTonaji } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AsfaltKaplamaTonajiPage() {
  return (
    <CalcPage
      module={asfaltKaplamaTonaji}
      standardsLabel={"Geometrik metraj / birim ağırlık"}
      description={"Yol genişliği, uzunluğu, tabaka kalınlığı ve sıkışmış birim ağırlıktan asfalt karışım tonajını (fire dahil) ve bitüm miktarını hesaplar."}
      formula={"W = G·L·t·ρ·(1 + fire);  bitüm = W·bitüm oranı"}
      engineeringNote={"ρ sıkışmış karışımın birim ağırlığıdır (aşınma/binder tabakasında genellikle 2,30–2,45 t/m³; laboratuvar Marshall sonuçlarından alınmalıdır). Bitüm oranı karışım ağırlığına göre yüzdedir (tipik %4,5–6,0). Fire; serim, kenar ve ilk çıkış kayıplarını içerir. Tabaka kalınlığı sıkışma sonrası kalınlıktır."}
      fields={[
        { key: "genislik_m", label: "Yol Genişliği (m)", type: "number", step: 0.5, min: 0.5 },
        { key: "uzunluk_m", label: "Uzunluk (m)", type: "number", step: 100, min: 1 },
        { key: "kalinlik_cm", label: "Tabaka Kalınlığı (cm)", type: "number", step: 0.5, min: 0.5 },
        { key: "yogunluk_tm3", label: "Sıkışmış Birim Ağırlık (t/m³)", type: "number", step: 0.05, min: 1 },
        { key: "firePayi", label: "Fire Payı (0–1)", type: "number", step: 0.01, min: 0 },
        { key: "bitumOrani", label: "Bitüm Oranı (0–0,1)", type: "number", step: 0.005, min: 0 },
      ]}
      defaults={{ genislik_m: 7, uzunluk_m: 1000, kalinlik_cm: 5, yogunluk_tm3: 2.4, firePayi: 0.03, bitumOrani: 0.055 }}
      mainUnit={"ton"}
      mainValueKey={"asfaltTonaji_t"}
      mainDecimals={1}
      intermediateLabels={{
        sikismis_hacim_m3: "Sıkışmış Hacim (m³)",
        bitum_ton: "Bitüm (ton)",
        alan_m2: "Kaplama Alanı (m²)",
        ton_per_m2: "Birim Alan (kg/m²)",
      }}
    />
  );
}
