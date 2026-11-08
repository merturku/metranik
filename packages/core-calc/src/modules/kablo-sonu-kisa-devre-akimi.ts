import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kablo sonundaki 3 faz simetrik kısa devre akımı (empedans toplama, IEC 60909 yaklaşık yöntemi):
// Zs = c·U/(√3·Ik,kaynak); Xs = Zs/√(1 + (R/X)²), Rs = Xs·(R/X);  Rt = Rs + R'·L, Xt = Xs + X'·L;
// Ik = c·U/(√3·√(Rt² + Xt²)). c gerilim faktörü (maks. kısa devre için 1,05 alçak gerilimde ±%10 toleransla;
// 1,0 nominal). R' ve X' (mΩ/m) kablo üreticisinden/IEC 60909-0'dan alınır; maks. Ik için 20 °C direnci, minimum Ik
// (koruma/açma süresi) için çalışma sıcaklığı direnci kullanılmalıdır. Motor katkısı ve şönt kollar dikkate alınmaz.
export const kabloSonuKisaDevreAkimiInputSchema = z.object({
  nominalGerilim_V: z.number().positive(),
  kaynakKisaDevreAkimi_kA: z.number().positive(),
  kaynakR_X_orani: z.number().min(0).max(5),
  gerilimFaktoru_c: z.number().min(0.9).max(1.2),
  kabloR_mOhm_m: z.number().min(0),
  kabloX_mOhm_m: z.number().min(0),
  kabloUzunlugu_m: z.number().min(0),
});

export type KabloSonuKisaDevreAkimiInput = z.infer<typeof kabloSonuKisaDevreAkimiInputSchema>;

export interface KabloSonuKisaDevreAkimiOutput {
  kisaDevreAkimi_kA: number;
}

function compute(input: KabloSonuKisaDevreAkimiInput): CalcResult<KabloSonuKisaDevreAkimiOutput> {
  const cU = input.gerilimFaktoru_c * input.nominalGerilim_V;
  const zs = cU / (Math.sqrt(3) * input.kaynakKisaDevreAkimi_kA * 1000);
  const xs = zs / Math.sqrt(1 + input.kaynakR_X_orani ** 2);
  const rs = xs * input.kaynakR_X_orani;
  const rc = (input.kabloR_mOhm_m / 1000) * input.kabloUzunlugu_m;
  const xc = (input.kabloX_mOhm_m / 1000) * input.kabloUzunlugu_m;
  const rt = rs + rc;
  const xt = xs + xc;
  const zt = Math.hypot(rt, xt);
  const ik = cU / (Math.sqrt(3) * zt);
  return {
    value: { kisaDevreAkimi_kA: ik / 1000 },
    intermediates: {
      kaynak_empedansi_ohm: zs,
      kablo_direnci_ohm: rc,
      kablo_reaktansi_ohm: xc,
      toplam_empedans_ohm: zt,
      akim_dusus_orani_yuzde: (ik / (input.kaynakKisaDevreAkimi_kA * 1000)) * 100,
    },
    standardsUsed: ["IEC 60909-0 (3 faz kısa devre, empedans toplama)"],
  };
}

export const kabloSonuKisaDevreAkimi: CalcModule<KabloSonuKisaDevreAkimiInput, KabloSonuKisaDevreAkimiOutput> = {
  id: "kablo-sonu-kisa-devre-akimi",
  title: "Kablo Sonu Kısa Devre Akımı (Empedans Toplama)",
  discipline: "elektrik",
  standards: ["IEC 60909-0"],
  inputSchema: kabloSonuKisaDevreAkimiInputSchema,
  compute,
};
