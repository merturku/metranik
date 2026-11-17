"use client";

import { evOhmYasasiGuc } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvOhmYasasiGucPage() {
  return (
    <CalcPage
      module={evOhmYasasiGuc}
      standardsLabel={"Ohm yasası / Joule yasası"}
      description={"Bilinen iki büyüklükten (V, I, R, P) diğer ikisini hesaplar."}
      formula={"V = I·R;  P = V·I = I²R = V²/R"}
      engineeringNote={"Doğru akım ve saf direnç (veya AC'de cosφ = 1) için geçerlidir. Endüktif/kapasitif yüklerde gerçek güç P = V·I·cosφ'dir. Birimler V, A, Ω, W'tır; kW için 1000 ile bölün."}
      fields={[
        { key: "cift", label: "Bilinen Büyüklükler", type: "select", options: [{ value: "VI", label: "Gerilim ve Akım" }, { value: "VR", label: "Gerilim ve Direnç" }, { value: "VP", label: "Gerilim ve Güç" }, { value: "IR", label: "Akım ve Direnç" }, { value: "IP", label: "Akım ve Güç" }, { value: "RP", label: "Direnç ve Güç" }] },
        { key: "x1", label: "1. Değer (ilk harfin büyüklüğü)", type: "number", step: 1, min: 1e-06 },
        { key: "x2", label: "2. Değer (ikinci harfin büyüklüğü)", type: "number", step: 1, min: 1e-06 },
      ]}
      defaults={{ cift: "VR", x1: 230, x2: 50 }}
      mainUnit={"W"}
      mainValueKey={"guc_W"}
      mainDecimals={2}
      intermediateLabels={{
        gerilim_V: "Gerilim (V)",
        akim_A: "Akım (A)",
        direnc_ohm: "Direnç (Ω)",
      }}
    />
  );
}
