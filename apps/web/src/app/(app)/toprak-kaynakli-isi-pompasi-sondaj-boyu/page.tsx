"use client";

import { toprakKaynakliIsiPompasiSondajBoyu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ToprakKaynakliIsiPompasiSondajBoyuPage() {
  return (
    <CalcPage
      module={toprakKaynakliIsiPompasiSondajBoyu}
      standardsLabel="VDI 4640 Bölüm 2"
      description="Toprak kaynaklı (düşey sondalı) ısı pompasında, ısıtma gücü ve mevsimsel COP'tan topraktan çekilecek gücü ve zeminin özgül ısı çekme gücüne göre gereken toplam sonda boyunu hesaplar."
      formula="Qçekme = Qısıtma × (1 − 1/COP),   L = Qçekme / q,   sonda başına = L / n"
      engineeringNote="Özgül ısı çekme gücü q zemin cinsine, yeraltı suyuna ve yıllık çalışma saatine bağlıdır; VDI 4640 Bölüm 2 tablosundan alınmalıdır (kuru, gevşek zeminde düşük; suya doygun kumda ve sağlam kayada yüksek; yıllık çalışma saati arttıkça değer düşer). Tablo yöntemi yalnız ısıtma yapan, yaklaşık 30 kW'a kadar tesisler ve 40–100 m sondalar için geçerlidir; soğutma da yapılıyorsa, sıcak su yükü büyükse veya tesis büyükse ısıl tepki testi (TRT) ve simülasyon gerekir. Sondalar arası mesafe en az 6 m olmalıdır."
      fields={[
        { key: "isitmaGucu_kW", label: "Isı Pompası Isıtma Gücü (kW)", type: "number", min: 0.5, step: 0.5 },
        { key: "mevsimselCop", label: "Mevsimsel COP (SPF)", type: "number", min: 1.1, step: 0.1 },
        { key: "ozgulIsiCekmeGucu_Wm", label: "Özgül Isı Çekme Gücü q (W/m)", type: "number", min: 5, step: 5 },
        { key: "sondaSayisi", label: "Sonda Sayısı", type: "number", min: 1, step: 1 },
      ]}
      defaults={{
        isitmaGucu_kW: 10,
        mevsimselCop: 4,
        ozgulIsiCekmeGucu_Wm: 50,
        sondaSayisi: 2,
      }}
      mainUnit="m (toplam sonda)"
      mainValueKey="toplamSondaBoyu_m"
      mainDecimals={0}
      intermediateLabels={{
        topraktan_cekilen_guc_kW: "Topraktan Çekilen Güç (kW)",
        kompresor_elektrik_gucu_kW: "Kompresör Elektrik Gücü (kW)",
        sonda_basina_boy_m: "Sonda Başına Boy (m)",
      }}
    />
  );
}
