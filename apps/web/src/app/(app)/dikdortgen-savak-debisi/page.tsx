"use client";

import { dikdortgenSavakDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DikdortgenSavakDebisiPage() {
  return (
    <CalcPage
      module={dikdortgenSavakDebisi}
      standardsLabel={"Francis savak formülü (USBR Water Measurement Manual)"}
      description={"Dikdörtgen keskin kenarlı savakta yük derinliği ve savak genişliğinden geçen debiyi, uç büzülmesi düzeltmesiyle hesaplar."}
      formula={"Q = (2/3)·Cd·√(2g)·(b − 0,1·n·H)·H^(3/2)"}
      engineeringNote={"Havalandırılmış serbest düşümlü keskin kenarlı savak için geçerlidir; yük H savak başlangıcından yeterli mesafede (≥ 4H) ölçülmelidir. n = 2 tam uç büzülmesi, n = 0 bastırılmış savak. Cd ≈ 0,62 başlangıç değeridir; H/b, savak yüksekliği ve yaklaşım hızı etkileri için yayımlı Kindsvater-Carter eğrileriyle teyit edin."}
      fields={[
        { key: "b_m", label: "Savak Genişliği b (m)", type: "number", step: 0.1, min: 0.05 },
        { key: "h_m", label: "Yük Derinliği H (m)", type: "number", step: 0.05, min: 0.005 },
        { key: "cd", label: "Debi Katsayısı Cd", type: "number", step: 0.01, min: 0.3 },
        { key: "n", label: "Uç Büzülme Sayısı n", type: "select", options: [{ value: "0", label: "0 (bastırılmış)" }, { value: "1", label: "1" }, { value: "2", label: "2 (tam büzülme)" }] },
      ]}
      defaults={{ b_m: 1, h_m: 0.3, cd: 0.62, n: "2" }}
      mainUnit={"m³/s"}
      mainValueKey={"debi_m3s"}
      mainDecimals={4}
      intermediateLabels={{
        etkin_genislik_m: "Etkin Genişlik (m)",
        debi_Ls: "Debi (L/s)",
        h_b_orani: "H / b",
      }}
    />
  );
}
