import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Armatür/ek parça (dirsek, vana, te) kayıplarının eşdeğer boru uzunluğu: Le = K·D/f (Darcy sürtünme katsayısı f).
// K·ρV²/2 = f·(Le/D)·ρV²/2 eşitliğinden. n adet aynı parça için toplam = n·Le. Toplam hesap uzunluğu = düz boru + ΣLe.
// K değerleri armatür kataloğundan/Crane TP-410'dan girdidir (tablo gömülmedi); f hız ve pürüzlülüğe bağlıdır
// (Boru Sürtünme Katsayısı modülüyle bulunabilir).
export const armaturEsdegerBoruUzunluguInputSchema = z.object({
  kayipKatsayisi_K: z.number().positive(),
  icCap_mm: z.number().positive(),
  surtunmeKatsayisi_f: z.number().positive().max(0.1),
  adet: z.number().int().min(1),
  duzBoruUzunlugu_m: z.number().min(0),
});

export type ArmaturEsdegerBoruUzunluguInput = z.infer<typeof armaturEsdegerBoruUzunluguInputSchema>;

export interface ArmaturEsdegerBoruUzunluguOutput {
  toplamEsdegerUzunluk_m: number;
}

function compute(input: ArmaturEsdegerBoruUzunluguInput): CalcResult<ArmaturEsdegerBoruUzunluguOutput> {
  const ld = input.kayipKatsayisi_K / input.surtunmeKatsayisi_f;
  const le = (ld * input.icCap_mm) / 1000;
  const toplam = le * input.adet;
  return {
    value: { toplamEsdegerUzunluk_m: toplam },
    intermediates: {
      L_D_orani: ld,
      tek_parca_Le_m: le,
      toplam_hesap_uzunlugu_m: input.duzBoruUzunlugu_m + toplam,
    },
    standardsUsed: ["Darcy–Weisbach eşdeğer uzunluk yöntemi (Crane TP-410)"],
  };
}

export const armaturEsdegerBoruUzunlugu: CalcModule<ArmaturEsdegerBoruUzunluguInput, ArmaturEsdegerBoruUzunluguOutput> = {
  id: "armatur-esdeger-boru-uzunlugu",
  title: "Armatür Eşdeğer Boru Uzunluğu (K → Le)",
  discipline: "mekanik",
  standards: [],
  inputSchema: armaturEsdegerBoruUzunluguInputSchema,
  compute,
};
