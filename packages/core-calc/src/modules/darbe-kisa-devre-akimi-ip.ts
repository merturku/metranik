import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Darbe (tepe) kısa devre akımı (IEC 60909-0, uzak kısa devre): ip = κ·√2·Ik″,  κ = 1,02 + 0,98·e^(−3·R/X).
// R/X oranı kısa devre noktasından görülen eşdeğer empedansın oranıdır (kablo ve kaynak toplamı). Kesicinin yapma kapasitesi,
// baraların elektrodinamik zorlanması (Bara Elektrodinamik Kuvvet modülü) ve cihaz dinamik dayanımı ip ile kontrol edilir.
// Tek kaynaklı radyal şebeke için geçerlidir; ağlı/çok kaynaklı sistemde κ için ayrı yöntemler gerekir.
export const darbeKisaDevreAkimiIpInputSchema = z.object({
  baslangicKisaDevreAkimi_kA: z.number().positive(),
  r_x_orani: z.number().min(0).max(5),
});

export type DarbeKisaDevreAkimiIpInput = z.infer<typeof darbeKisaDevreAkimiIpInputSchema>;

export interface DarbeKisaDevreAkimiIpOutput {
  darbeAkimi_kA: number;
}

function compute(input: DarbeKisaDevreAkimiIpInput): CalcResult<DarbeKisaDevreAkimiIpOutput> {
  const kappa = 1.02 + 0.98 * Math.exp(-3 * input.r_x_orani);
  const ip = kappa * Math.SQRT2 * input.baslangicKisaDevreAkimi_kA;
  return {
    value: { darbeAkimi_kA: ip },
    intermediates: {
      kappa,
      tepe_etkin_orani_ip_Ik: kappa * Math.SQRT2,
      simetrik_tepe_kA: Math.SQRT2 * input.baslangicKisaDevreAkimi_kA,
    },
    standardsUsed: ["IEC 60909-0 (Eş. 14–15)"],
  };
}

export const darbeKisaDevreAkimiIp: CalcModule<DarbeKisaDevreAkimiIpInput, DarbeKisaDevreAkimiIpOutput> = {
  id: "darbe-kisa-devre-akimi-ip",
  title: "Darbe (Tepe) Kısa Devre Akımı ip (κ Faktörü)",
  discipline: "elektrik",
  standards: ["IEC 60909-0"],
  inputSchema: darbeKisaDevreAkimiIpInputSchema,
  compute,
};
