import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Zemine oturan döşeme U değeri (TS EN ISO 13370, yalıtımsız/yalıtımlı, düzgün birleşim kabulü):
// B' = A/(0,5·P) (karakteristik boyut), dt = w + λ·(Rsi + Rf + Rse);
// dt < B' (yalıtımsız/az yalıtımlı): U = 2λ/(π·B' + dt)·ln(π·B'/dt + 1);   dt ≥ B' (iyi yalıtımlı): U = λ/(0,457·B' + dt).
// w duvar kalınlığı, λ zemin iletkenliği (kil/silt ≈ 1,5, kum/çakıl ≈ 2,0, kaya ≈ 3,5 W/mK; yaygın girdi 2,0), Rf döşeme yalıtım direnci.
// Rsi = 0,17, Rse = 0,04 m²K/W (EN ISO 6946, aşağı ısı akışı). Sabit durum yıllık ortalama değerdir; kenar yalıtımı ve yeraltı suyu ayrıca değerlendirilmelidir.
const RSI = 0.17;
const RSE = 0.04;

export const zemineOturanDosemeUDegeriInputSchema = z.object({
  doseme_alani_m2: z.number().positive(),
  cevre_uzunlugu_m: z.number().positive(),
  duvarKalinligi_m: z.number().positive(),
  zeminIletkenligi_WmK: z.number().positive(),
  dosemeYalitimDirenci_m2KW: z.number().min(0),
});

export type ZemineOturanDosemeUDegeriInput = z.infer<typeof zemineOturanDosemeUDegeriInputSchema>;

export interface ZemineOturanDosemeUDegeriOutput {
  uDegeri_WmK: number;
}

function compute(input: ZemineOturanDosemeUDegeriInput): CalcResult<ZemineOturanDosemeUDegeriOutput> {
  const bPrime = input.doseme_alani_m2 / (0.5 * input.cevre_uzunlugu_m);
  const lam = input.zeminIletkenligi_WmK;
  const dt = input.duvarKalinligi_m + lam * (RSI + input.dosemeYalitimDirenci_m2KW + RSE);
  const yalitimsizTip = dt < bPrime;
  const u = yalitimsizTip
    ? ((2 * lam) / (Math.PI * bPrime + dt)) * Math.log((Math.PI * bPrime) / dt + 1)
    : lam / (0.457 * bPrime + dt);
  return {
    value: { uDegeri_WmK: u },
    intermediates: {
      karakteristik_boyut_B_m: bPrime,
      esdeger_kalinlik_dt_m: dt,
      hesap_kolu: yalitimsizTip ? "dt < B' (yalıtımsız/az yalıtımlı)" : "dt ≥ B' (iyi yalıtımlı)",
      birim_sicaklik_farki_isi_kaybi_WK: u * input.doseme_alani_m2,
    },
    standardsUsed: ["TS EN ISO 13370 (zemine oturan döşeme)", "TS EN ISO 6946 (yüzey dirençleri)"],
  };
}

export const zemineOturanDosemeUDegeri: CalcModule<ZemineOturanDosemeUDegeriInput, ZemineOturanDosemeUDegeriOutput> = {
  id: "zemine-oturan-doseme-u-degeri",
  title: "Zemine Oturan Döşeme U Değeri (EN ISO 13370)",
  discipline: "ev",
  standards: ["TS EN ISO 13370"],
  inputSchema: zemineOturanDosemeUDegeriInputSchema,
  compute,
};
