"use client";

import { minimumYatayKurbYaricapi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MinimumYatayKurbYaricapiPage() {
  return (
    <CalcPage
      module={minimumYatayKurbYaricapi}
      standardsLabel={"AASHTO Green Book (yatay kurb)"}
      description={"Tasarım hızı, dever (süperelevasyon) ve yanal sürtünme katsayısından yatay kurbda izin verilen en küçük yarıçapı hesaplar."}
      formula={"Rmin = V²/(127·(e + f))"}
      engineeringNote={"V km/h, e dever (m/m), f izin verilen yanal sürtünme katsayısıdır. f tasarım hızına göre azalır (örn. 100 km/h için ≈ 0,12–0,13; AASHTO tablosundan teyit edin). Azami dever iklim ve trafik koşullarına göre sınırlanır (genellikle 0,06–0,10). Bu modül minimum yarıçaptır; gerçek tasarımda geçiş eğrisi ve görüş mesafesi kontrolü ayrıca yapılır."}
      fields={[
        { key: "hiz_kmh", label: "Tasarım Hızı V (km/h)", type: "number", step: 10, min: 10 },
        { key: "dever", label: "Dever e (m/m)", type: "number", step: 0.01, min: 0 },
        { key: "surtunme", label: "Yanal Sürtünme Katsayısı f", type: "number", step: 0.01, min: 0.01 },
      ]}
      defaults={{ hiz_kmh: 100, dever: 0.08, surtunme: 0.12 }}
      mainUnit={"m"}
      mainValueKey={"minYaricap_m"}
      mainDecimals={1}
      intermediateLabels={{
        e_plus_f: "e + f",
        yanal_ivme_ms2: "Yanal İvme (m/s²)",
      }}
    />
  );
}
