import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dikdörtgen temelde eksenel yük + moment etkisiyle oluşan taban zemin
// gerilmesi (elastik/doğrusal dağılım kabulü): q = N/A ± M/W,
// A = L×B, W = B×L² / 6, e = M/N (yükün ağırlık merkezinden dışmerkezliği).
// Çekme (negatif gerilme) oluşmaması için e ≤ L/6 (çekirdek/kern koşulu)
// sağlanmalı; ayrıca qmax izin verilen taşıma gücünü aşmamalıdır.
export const temelEksantrikYukKontroluInputSchema = z.object({
  eksenelYuk_N_kN: z.number().positive(),
  moment_M_kNm: z.number().nonnegative(),
  temelUzunlugu_L_m: z.number().positive(),
  temelGenisligi_B_m: z.number().positive(),
  izinVerilenTasimaGucu_qadm_kPa: z.number().positive(),
});

export type TemelEksantrikYukKontroluInput = z.infer<
  typeof temelEksantrikYukKontroluInputSchema
>;

export interface TemelEksantrikYukKontroluOutput {
  maksimumGerilme_qmax_kPa: number;
}

function compute(
  input: TemelEksantrikYukKontroluInput,
): CalcResult<TemelEksantrikYukKontroluOutput> {
  const alan_A_m2 = input.temelUzunlugu_L_m * input.temelGenisligi_B_m;
  const mukavemetMomenti_W_m3 =
    (input.temelGenisligi_B_m * input.temelUzunlugu_L_m ** 2) / 6;
  const disMerkezlik_e_m = input.moment_M_kNm / input.eksenelYuk_N_kN;
  const kernSiniri_m = input.temelUzunlugu_L_m / 6;

  const ortalamaGerilme_kPa = input.eksenelYuk_N_kN / alan_A_m2;
  const momentGerilmesi_kPa = input.moment_M_kNm / mukavemetMomenti_W_m3;
  const maksimumGerilme_qmax_kPa = ortalamaGerilme_kPa + momentGerilmesi_kPa;
  const minimumGerilme_qmin_kPa = ortalamaGerilme_kPa - momentGerilmesi_kPa;

  const kernIcinde = disMerkezlik_e_m <= kernSiniri_m;
  const tasimaUygun = maksimumGerilme_qmax_kPa <= input.izinVerilenTasimaGucu_qadm_kPa;

  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (!kernIcinde) {
    status = "uygunsuz";
    note = "Dışmerkezlik e, çekirdek sınırı L/6'yı aşıyor; temel tabanında çekme (ayrılma) oluşur.";
  } else if (!tasimaUygun) {
    status = "uygunsuz";
    note = "Maksimum taban gerilmesi izin verilen taşıma gücünü aşıyor.";
  } else if (maksimumGerilme_qmax_kPa > 0.9 * input.izinVerilenTasimaGucu_qadm_kPa) {
    status = "sinirda";
    note = "Maksimum taban gerilmesi izin verilen taşıma gücüne yakın.";
  } else {
    status = "uygun";
    note = "Dışmerkezlik çekirdek sınırı içinde ve taban gerilmesi izin verilen sınırın altında.";
  }

  return {
    value: { maksimumGerilme_qmax_kPa },
    intermediates: {
      minimumGerilme_qmin_kPa: Number(minimumGerilme_qmin_kPa.toFixed(2)),
      disMerkezlik_e_m: Number(disMerkezlik_e_m.toFixed(3)),
      kernSiniri_L6_m: Number(kernSiniri_m.toFixed(3)),
      izinVerilenTasimaGucu_qadm_kPa: input.izinVerilenTasimaGucu_qadm_kPa,
    },
    standardsUsed: [],
    verdict: { status, note },
  };
}

export const temelEksantrikYukKontrolu: CalcModule<
  TemelEksantrikYukKontroluInput,
  TemelEksantrikYukKontroluOutput
> = {
  id: "temel-eksantrik-yuk-kontrolu",
  title: "Temel Eksantrik Yük Zemin Gerilmesi Kontrolü",
  discipline: "insaat",
  standards: [],
  inputSchema: temelEksantrikYukKontroluInputSchema,
  compute,
};
