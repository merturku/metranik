"use client";

import { primerSekonderAyiriciBypass } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PrimerSekonderAyiriciBypassPage() {
  return (
    <CalcPage
      module={primerSekonderAyiriciBypass}
      standardsLabel={'Kütle/enerji dengesi'}
      description={'Primer ve sekonder debi farkından ayırıcı (ortak boru) debisini, primer dönüş karışım sıcaklığını ve ters akış durumunu hesaplar.'}
      formula={'Qb = Qp − Qs;  Qb ≥ 0: Tpd = (Qs·Tsd + Qb·Tg)/Qp;  Qb < 0: Tsg = (Qp·Tg + |Qb|·Tsd)/Qs'}
      engineeringNote={'Su için ρ = 1000 kg/m³, cp = 4,186 kJ/kg·K alındı. Ayırıcıdan geçen fazla debi primer dönüş sıcaklığını üretim sıcaklığına yaklaştırır ve ΔT\'yi düşürür. Sekonder debi primeri aşarsa ayırıcıda ters akış olur ve sekonder besleme sıcaklığı bozulur. Ayırıcı boru boyutu ve pompa seçimi ayrıca yapılmalıdır.'}
      fields={[
        { key: "primerDebi_m3h", label: "Primer Debi Qp (m³/h)", type: "number", step: 1, min: 0.1 },
        { key: "sekonderDebi_m3h", label: "Sekonder Debi Qs (m³/h)", type: "number", step: 1, min: 0.1 },
        { key: "primerGidisSicakligi_C", label: "Primer Gidiş (Üretim) Sıcaklığı (°C)", type: "number", step: 0.5 },
        { key: "sekonderDonusSicakligi_C", label: "Sekonder Dönüş Sıcaklığı (°C)", type: "number", step: 0.5 },
      ]}
      defaults={{ primerDebi_m3h: 100, sekonderDebi_m3h: 80, primerGidisSicakligi_C: 7, sekonderDonusSicakligi_C: 12 }}
      mainUnit={'m³/h'}
      mainValueKey={'ayiriciDebisi_m3h'}
      mainDecimals={2}
      intermediateLabels={{
        ayirici_debi_orani_Qb_Qp: "Qb/Qp",
        primer_donus_karisim_C: "Primer dönüş karışım (°C)",
        sekonder_gidis_C: "Sekonder gidiş (°C)",
        primer_deltaT_K: "Primer ΔT (K)",
        sekonder_deltaT_K: "Sekonder ΔT (K)",
        primer_isil_guc_kW: "Primer ısıl güç (kW)",
      }}
    />
  );
}
