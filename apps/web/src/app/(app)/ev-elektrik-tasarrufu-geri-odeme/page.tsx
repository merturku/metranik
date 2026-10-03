"use client";
import { CalcPage } from "@/components/calc-page";
import { evElektrikTasarufuGeriOdeme } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={evElektrikTasarufuGeriOdeme}
      fields={[
        { name: "yatirim_TL", label: "Yatırım (TL)" },
        { name: "yillik_tasarruf_TL", label: "Yıllık Tasarruf (TL)" },
      ]}
      defaults={{ yatirim_TL: 50000, yillik_tasarruf_TL: 10000 }}
      description="Enerji verimliliği yatırımının geri ödeme süresi"
      formula="t = Yatırım / Yıllık_Tasarruf"
      engineeringNote="5-8 yıl arası geri ödeme ekonomik olarak uygun kabul edilir."
    />
  );
}
