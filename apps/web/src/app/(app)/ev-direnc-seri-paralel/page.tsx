"use client";

import { evDirencSeriParalel } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvDirencSeriParalelPage() {
  return (
    <CalcPage
      module={evDirencSeriParalel}
      standardsLabel={"Kirchhoff yasaları"}
      description={"En fazla beş direncin seri veya paralel bağlantıdaki eşdeğer direncini hesaplar."}
      formula={"Seri: Req = ΣRi;  Paralel: 1/Req = Σ(1/Ri)"}
      engineeringNote={"Kullanılmayan direnç kutularını 0 bırakın (0 atlanır; kısa devre olarak değerlendirilmez). Kondansatörler için formüller ters çalışır (seri: 1/C toplamı). Tüm dirençler aynı birimde girilmelidir."}
      fields={[
        { key: "mod", label: "Bağlantı", type: "select", options: [{ value: "seri", label: "Seri" }, { value: "paralel", label: "Paralel" }] },
        { key: "r1", label: "R1 (Ω)", type: "number", step: 1, min: 0 },
        { key: "r2", label: "R2 (Ω)", type: "number", step: 1, min: 0 },
        { key: "r3", label: "R3 (Ω)", type: "number", step: 1, min: 0 },
        { key: "r4", label: "R4 (Ω, 0 = yok)", type: "number", step: 1, min: 0 },
        { key: "r5", label: "R5 (Ω, 0 = yok)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ mod: "seri", r1: 10, r2: 20, r3: 30, r4: 0, r5: 0 }}
      mainUnit={"Ω"}
      mainValueKey={"esdegerDirenc_ohm"}
      mainDecimals={4}
      intermediateLabels={{
        kullanilan_direnc_sayisi: "Kullanılan Direnç Sayısı",
        iletkenlik_S: "Eşdeğer İletkenlik (S)",
      }}
    />
  );
}
