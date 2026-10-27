import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İzin verilen dokunma ve adım gerilimleri (IEEE Std 80, Dalziel vücut akımı sınırı):
// IB = k/√ts,  k = 0,116 (50 kg) / 0,157 (70 kg);  vücut direnci RB = 1000 Ω.
// Yüzey tabakası azaltma katsayısı Cs = 1 − 0,09·(1 − ρ/ρs)/(2hs + 0,09)
// (hs = 0 veya ρs = ρ ise ρs·Cs = ρ, yani tabakasız zemin).
// Edokunma = (1000 + 1,5·Cs·ρs)·k/√ts,  Eadım = (1000 + 6·Cs·ρs)·k/√ts.
// GPR izin verilen dokunma geriliminin altındaysa ayrıntılı göz/adım gerilimi hesabı gerekmez.
const VUCUT_KATSAYISI: Record<"50" | "70", number> = { "50": 0.116, "70": 0.157 };

export const izinVerilenDokunmaAdimGerilimiInputSchema = z.object({
  zeminOzdirenci_ohmm: z.number().positive(),
  yuzeyTabakasiOzdirenci_ohmm: z.number().positive(),
  yuzeyTabakasiKalinligi_m: z.number().min(0),
  arizaSuresi_s: z.number().positive(),
  vucutAgirligi: z.enum(["50", "70"]),
  toprakPotansiyelYukselmesi_GPR_V: z.number().min(0),
});

export type IzinVerilenDokunmaAdimGerilimiInput = z.infer<typeof izinVerilenDokunmaAdimGerilimiInputSchema>;

export interface IzinVerilenDokunmaAdimGerilimiOutput {
  dokunmaGerilimi_V: number;
}

function compute(input: IzinVerilenDokunmaAdimGerilimiInput): CalcResult<IzinVerilenDokunmaAdimGerilimiOutput> {
  const rho = input.zeminOzdirenci_ohmm;
  const rhoS = input.yuzeyTabakasiOzdirenci_ohmm;
  const hs = input.yuzeyTabakasiKalinligi_m;
  const ts = input.arizaSuresi_s;
  const k = VUCUT_KATSAYISI[input.vucutAgirligi];

  const cs = 1 - (0.09 * (1 - rho / rhoS)) / (2 * hs + 0.09);
  const ib = k / Math.sqrt(ts);
  const dokunma = (1000 + 1.5 * cs * rhoS) * ib;
  const adim = (1000 + 6 * cs * rhoS) * ib;
  const gpr = input.toprakPotansiyelYukselmesi_GPR_V;

  let verdict: CalcResult<IzinVerilenDokunmaAdimGerilimiOutput>["verdict"];
  if (gpr > 0) {
    verdict =
      gpr <= dokunma
        ? {
            status: "uygun",
            note: `GPR = ${gpr.toFixed(0)} V ≤ izin verilen dokunma gerilimi ${dokunma.toFixed(0)} V: IEEE 80'e göre ayrıntılı göz/adım gerilimi hesabı gerekmez.`,
          }
        : {
            status: "sinirda",
            note: `GPR = ${gpr.toFixed(0)} V > izin verilen dokunma gerilimi ${dokunma.toFixed(0)} V: ızgara geometrisiyle göz (mesh) ve adım gerilimleri hesaplanıp bu sınırlarla karşılaştırılmalı.`,
          };
  }

  const gecerlilik =
    ts < 0.03 || ts > 3
      ? "Arıza süresi Dalziel bağıntısının geçerlilik aralığı (0,03–3 s) dışında; sonuç yaklaşıktır."
      : "Dalziel bağıntısı geçerlilik aralığında (0,03–3 s).";

  return {
    value: { dokunmaGerilimi_V: dokunma },
    intermediates: {
      yuzey_tabakasi_katsayisi_Cs: cs,
      izin_verilen_vucut_akimi_IB_A: ib,
      adim_gerilimi_V: adim,
      gecerlilik,
    },
    standardsUsed: ["IEEE Std 80"],
    verdict,
  };
}

export const izinVerilenDokunmaAdimGerilimi: CalcModule<
  IzinVerilenDokunmaAdimGerilimiInput,
  IzinVerilenDokunmaAdimGerilimiOutput
> = {
  id: "izin-verilen-dokunma-adim-gerilimi",
  title: "İzin Verilen Dokunma ve Adım Gerilimi",
  discipline: "elektrik",
  standards: ["IEEE Std 80"],
  inputSchema: izinVerilenDokunmaAdimGerilimiInputSchema,
  compute,
};
