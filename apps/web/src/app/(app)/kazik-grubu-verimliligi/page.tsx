"use client";

import { kazikGrubuVerimliligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KazikGrubuVerimliligiPage() {
  return (
    <CalcPage
      module={kazikGrubuVerimliligi}
      standardsLabel="Converse-Labarre"
      description="Kazık çapı, kazıklar arası mesafe ve grup diziliminden (satır×sütun), kazıkların birbirine yakınlığı nedeniyle oluşan grup verimlilik kaybını hesaplar."
      formula="Eg = 1 - θ×[(n-1)m + (m-1)n] / (90×m×n), θ = arctan(d/s)"
      engineeringNote="Grup kapasitesi = Eg × (kazık sayısı) × (tekil kazık kapasitesi). Kazık grubu verimliliği kazık taşıma kapasitesi (statik yöntem) modülüyle birlikte kullanılabilir."
      fields={[
        {
          key: "kazikCapi_d_m",
          label: "Kazık Çapı d (m)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        {
          key: "kazikArasiMesafe_s_m",
          label: "Kazıklar Arası Mesafe s (m, merkezden merkeze)",
          type: "number",
          min: 0.2,
          step: 0.1,
        },
        {
          key: "siraSayisi_m",
          label: "Sıra Sayısı (m)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "sutunSayisi_n",
          label: "Sütun Sayısı (n)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        kazikCapi_d_m: 0.4,
        kazikArasiMesafe_s_m: 1.2,
        siraSayisi_m: 3,
        sutunSayisi_n: 3,
      }}
      mainUnit=""
      mainValueKey="grupVerimliligi"
      mainDecimals={3}
      intermediateLabels={{ theta_derece: "θ (derece)" }}
    />
  );
}
