import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ters zamanlı aşırı akım rölesi açma süresi (IEC 60255-151): t = TMS·k/((I/Is)^α − 1).
// Standart ters (SI) k 0,14 α 0,02; çok ters (VI) 13,5 / 1; aşırı ters (EI) 80 / 2; uzun süreli ters (LTI) 120 / 1.
// I ≤ Is ise röle açmaz (süre tanımsız → null).
export const asiriAkimRoleAcmaSuresiInputSchema = z.object({
  egri: z.enum(["si", "vi", "ei", "lti"]),
  arizaAkimi_A: z.number().positive(),
  baslamaAkimi_A: z.number().positive(),
  zamanCarpani: z.number().positive().max(10),
});

export type AsiriAkimRoleAcmaSuresiInput = z.infer<typeof asiriAkimRoleAcmaSuresiInputSchema>;

export interface AsiriAkimRoleAcmaSuresiOutput {
  acmaSuresi_s: number | null;
}

const EGRI = {
  si: { k: 0.14, a: 0.02, ad: "Standart ters (SI)" },
  vi: { k: 13.5, a: 1, ad: "Çok ters (VI)" },
  ei: { k: 80, a: 2, ad: "Aşırı ters (EI)" },
  lti: { k: 120, a: 1, ad: "Uzun süreli ters (LTI)" },
} as const;

function compute(input: AsiriAkimRoleAcmaSuresiInput): CalcResult<AsiriAkimRoleAcmaSuresiOutput> {
  const e = EGRI[input.egri];
  const m = input.arizaAkimi_A / input.baslamaAkimi_A;
  const acar = m > 1;
  const t = acar ? (input.zamanCarpani * e.k) / (m ** e.a - 1) : null;
  return {
    value: { acmaSuresi_s: t },
    intermediates: {
      akim_kati: m,
      egri: e.ad,
      k_katsayisi: e.k,
      alfa_ussu: e.a,
      durum: acar ? "Röle başlama akımının üstünde — açar" : "Arıza akımı ≤ başlama akımı — röle açmaz",
    },
    standardsUsed: ["IEC 60255-151"],
    verdict: acar
      ? undefined
      : { status: "uygunsuz", note: "Arıza akımı başlama akımını aşmıyor; koruma bu arızada çalışmaz." },
  };
}

export const asiriAkimRoleAcmaSuresi: CalcModule<AsiriAkimRoleAcmaSuresiInput, AsiriAkimRoleAcmaSuresiOutput> = {
  id: "asiri-akim-role-acma-suresi",
  title: "Ters Zamanlı Aşırı Akım Rölesi Açma Süresi",
  discipline: "elektrik",
  standards: ["IEC 60255-151"],
  inputSchema: asiriAkimRoleAcmaSuresiInputSchema,
  compute,
};
