"use client";

import { nozulReaksiyonKuvveti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function NozulReaksiyonKuvvetiPage() {
  return (
    <CalcPage
      module={nozulReaksiyonKuvveti}
      standardsLabel={"Momentum denklemi"}
      description={"Nozuldan çıkan su jetinin debisi ve nozul çapından jet hızını ve hortumu tutan kişinin karşılaması gereken reaksiyon kuvvetini hesaplar."}
      formula={"v = Q/A;  F = ρ·Q·v = ρ·Q²/A"}
      engineeringNote={"Momentum denkleminin sonucudur: akış yönündeki net kuvvet tutucuya geri tepme olarak yansır. Çıkış basıncı nozulda atmosferik kabul edilir. Bir kişinin güvenle taşıyabileceği kuvvet kısa süreli yaklaşık 250–350 N'dir (sürekli kullanımda daha düşük); sınır değeri kurumunuzun prosedüründen alın. Gerçek jetteki kontraksiyon (Cc < 1) için nozul çıkış çapını etkin çap olarak girin."}
      fields={[
        { key: "q_Lmin", label: "Nozul Debisi Q (L/dk)", type: "number", step: 50, min: 1 },
        { key: "d_mm", label: "Nozul Çıkış Çapı (mm)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ q_Lmin: 500, d_mm: 20 }}
      mainUnit={"N"}
      mainValueKey={"reaksiyon_N"}
      mainDecimals={1}
      intermediateLabels={{
        jet_hizi_ms: "Jet Hızı (m/s)",
        reaksiyon_kgf: "Reaksiyon (kgf)",
        jet_dinamik_basinc_bar: "Jet Dinamik Basıncı (bar)",
      }}
    />
  );
}
