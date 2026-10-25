import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// SPT'ye dayalı basitleştirilmiş sıvılaşma değerlendirmesi (Seed-Idriss yöntemi,
// NCEER/NSF çalıştayı özeti: Youd vd. 2001, J. Geotech. Geoenviron. Eng. 127(10)).
// Deprem yükü: CSR = 0,65·(amaks/g)·(σv/σ'v)·rd, rd (Liao-Whitman):
//   z ≤ 9,15 m: 1 − 0,00765z;  ≤ 23 m: 1,174 − 0,0267z;  ≤ 30 m: 0,744 − 0,008z.
// Direnç (temiz kum eşdeğeri (N1)60cs < 30, M = 7,5):
//   CRR7,5 = 1/(34 − N) + N/135 + 50/(10N + 45)² − 1/200.
// Büyüklük ölçek katsayısı MSF = 10^2,24 / Mw^2,56; efektif gerilme düzeltmesi
// Kσ = (σ'v/Pa)^(f − 1) ≤ 1 (f = 0,6–0,8, rölatif sıkılığa göre).
// FS = CRR7,5·MSF·Kσ / CSR. (N1)60cs ≥ 30 olan temiz granüler zemin sıvılaşmaz
// kabul edilir; yeraltı su seviyesinin üstündeki zemin sıvılaşmaz.
const GAMMA_W = 9.81;
const PA_kPa = 100;

function gerilmeAzaltmaKatsayisi(z: number): number {
  if (z <= 9.15) return 1 - 0.00765 * z;
  if (z <= 23) return 1.174 - 0.0267 * z;
  return 0.744 - 0.008 * z;
}

export const zeminSivilasmaGuvenlikSayisiInputSchema = z.object({
  maksYerIvmesi_g: z.number().positive().max(2),
  depremBuyuklugu_Mw: z.number().min(5).max(9),
  derinlik_z_m: z.number().positive().max(30),
  yeraltiSuyuDerinligi_m: z.number().min(0),
  dogalBirimHacimAgirlik_kNm3: z.number().positive(),
  doygunBirimHacimAgirlik_kNm3: z.number().positive(),
  sptN1_60cs: z.number().min(0),
  kSigmaUssu_f: z.number().min(0.6).max(0.8),
  gerekliGuvenlikSayisi: z.number().min(1),
});

export type ZeminSivilasmaGuvenlikSayisiInput = z.infer<typeof zeminSivilasmaGuvenlikSayisiInputSchema>;

export interface ZeminSivilasmaGuvenlikSayisiOutput {
  guvenlikSayisi_FS: number | null;
}

function compute(input: ZeminSivilasmaGuvenlikSayisiInput): CalcResult<ZeminSivilasmaGuvenlikSayisiOutput> {
  const z = input.derinlik_z_m;
  const zw = input.yeraltiSuyuDerinligi_m;
  const kuru = Math.min(z, zw);
  const doygun = Math.max(0, z - zw);
  const sigmaV = input.dogalBirimHacimAgirlik_kNm3 * kuru + input.doygunBirimHacimAgirlik_kNm3 * doygun;
  const u = GAMMA_W * doygun;
  const sigmaVe = sigmaV - u;
  const rd = gerilmeAzaltmaKatsayisi(z);
  const csr = 0.65 * input.maksYerIvmesi_g * (sigmaV / sigmaVe) * rd;
  const msf = 10 ** 2.24 / input.depremBuyuklugu_Mw ** 2.56;
  const kSigma = Math.min(1, (sigmaVe / PA_kPa) ** (input.kSigmaUssu_f - 1));
  const N = input.sptN1_60cs;
  const sivilasmaz = N >= 30 || z <= zw;
  const crr = N < 30 ? 1 / (34 - N) + N / 135 + 50 / (10 * N + 45) ** 2 - 1 / 200 : null;
  const fs = crr === null ? null : (crr * msf * kSigma) / csr;
  const gerekli = input.gerekliGuvenlikSayisi;

  const verdict: CalcResult<ZeminSivilasmaGuvenlikSayisiOutput>["verdict"] =
    z <= zw
      ? { status: "uygun", note: `İncelenen derinlik (${z} m) yeraltı su seviyesinin (${zw} m) üstünde; doygun olmayan zemin sıvılaşmaz.` }
      : fs === null
        ? { status: "uygun", note: `(N1)60cs = ${N} ≥ 30: temiz granüler zemin sıvılaşmayacak kadar sıkı kabul edilir.` }
        : fs >= gerekli
          ? { status: "uygun", note: `FS = ${fs.toFixed(2)} ≥ ${gerekli}: bu derinlikte sıvılaşma beklenmez.` }
          : fs >= 1
            ? {
                status: "sinirda",
                note: `1 ≤ FS = ${fs.toFixed(2)} < ${gerekli}: güvenlik payı yetersiz; ince dane düzeltmesini ve zemin parametrelerini gözden geçirin.`,
              }
            : {
                status: "uygunsuz",
                note: `FS = ${fs.toFixed(2)} < 1: bu derinlikte sıvılaşma beklenir. Zemin iyileştirme (jet grout, taş kolon, sıkıştırma) veya derin temel gerekir.`,
              };

  return {
    value: { guvenlikSayisi_FS: sivilasmaz ? null : fs },
    intermediates: {
      toplam_gerilme_sigmaV_kPa: sigmaV,
      bosluk_suyu_basinci_u_kPa: u,
      efektif_gerilme_sigmaVe_kPa: sigmaVe,
      gerilme_azaltma_katsayisi_rd: rd,
      tekrarli_gerilme_orani_CSR: csr,
      direnc_orani_CRR75: crr ?? "— (N ≥ 30, sıvılaşmaz)",
      buyukluk_olcek_katsayisi_MSF: msf,
      efektif_gerilme_duzeltmesi_Ksigma: kSigma,
    },
    standardsUsed: ["Youd vd. (2001) NCEER/NSF"],
    verdict,
  };
}

export const zeminSivilasmaGuvenlikSayisi: CalcModule<
  ZeminSivilasmaGuvenlikSayisiInput,
  ZeminSivilasmaGuvenlikSayisiOutput
> = {
  id: "zemin-sivilasma-guvenlik-sayisi",
  title: "Zemin Sıvılaşma Güvenlik Sayısı (SPT)",
  discipline: "insaat",
  standards: ["Youd vd. (2001) NCEER/NSF"],
  inputSchema: zeminSivilasmaGuvenlikSayisiInputSchema,
  compute,
};
