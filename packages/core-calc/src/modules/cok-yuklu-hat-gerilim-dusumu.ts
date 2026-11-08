import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Boyunca yük çeken hat (3 yüke kadar) gerilim düşümü — IEC 60364-5-52 Ek G yaklaşımı:
// ΔU = b·Σ(Ik·Lk)·(R'·cosφ + X'·sinφ),  b = √3 (3 faz) / 2 (tek faz),  Lk = kaynağa mesafe.
// R' = ρθ/A, ρθ = ρ20·(1 + α·(θ − 20));  ρ20 Cu 0,017241 / Al 0,028264 Ω·mm²/m (IEC 60228),
// α Cu 0,00393 / Al 0,00403 1/K. X' girdi (küçük kesitte ≈ 0,08 mΩ/m). Tüm yüklerde aynı cosφ;
// yük akımlarının aritmetik toplanması (faz farkı ihmal) güvenli taraftadır.
const RHO20 = { bakir: 0.017241, aluminyum: 0.028264 } as const;
const ALFA = { bakir: 0.00393, aluminyum: 0.00403 } as const;

export const cokYukluHatGerilimDusumuInputSchema = z.object({
  faz: z.enum(["3", "1"]),
  nominalGerilim_V: z.number().positive(),
  iletken: z.enum(["bakir", "aluminyum"]),
  kesit_mm2: z.number().positive(),
  sicaklik_C: z.number().min(-10).max(120),
  reaktans_mOhm_m: z.number().min(0),
  cosPhi: z.number().min(0.1).max(1),
  izinVerilen_yuzde: z.number().positive(),
  yuk1_A: z.number().min(0),
  yuk1_mesafe_m: z.number().min(0),
  yuk2_A: z.number().min(0),
  yuk2_mesafe_m: z.number().min(0),
  yuk3_A: z.number().min(0),
  yuk3_mesafe_m: z.number().min(0),
});

export type CokYukluHatGerilimDusumuInput = z.infer<typeof cokYukluHatGerilimDusumuInputSchema>;

export interface CokYukluHatGerilimDusumuOutput {
  gerilimDusumu_V: number;
}

function compute(input: CokYukluHatGerilimDusumuInput): CalcResult<CokYukluHatGerilimDusumuOutput> {
  const rho = RHO20[input.iletken] * (1 + ALFA[input.iletken] * (input.sicaklik_C - 20));
  const r = rho / input.kesit_mm2; // Ω/m
  const x = input.reaktans_mOhm_m / 1000;
  const sinPhi = Math.sqrt(1 - input.cosPhi ** 2);
  const z = r * input.cosPhi + x * sinPhi;
  const b = input.faz === "3" ? Math.sqrt(3) : 2;
  const momentToplam =
    input.yuk1_A * input.yuk1_mesafe_m + input.yuk2_A * input.yuk2_mesafe_m + input.yuk3_A * input.yuk3_mesafe_m;
  const dU = b * momentToplam * z;
  const yuzde = (dU / input.nominalGerilim_V) * 100;
  const lim = input.izinVerilen_yuzde;
  const durum = yuzde > lim ? "uygunsuz" : yuzde >= 0.9 * lim ? "sinirda" : "uygun";
  return {
    value: { gerilimDusumu_V: dU },
    intermediates: {
      iletken_ozdirenci_ohm_mm2_m: rho,
      birim_direnc_ohm_m: r,
      toplam_akim_mesafe_Am: momentToplam,
      gerilim_dusumu_yuzde: yuzde,
      izin_verilen_yuzde: lim,
    },
    standardsUsed: ["IEC 60364-5-52 (Ek G, gerilim düşümü)", "IEC 60228 (iletken özdirenci)"],
    verdict: {
      status: durum,
      note:
        durum === "uygunsuz"
          ? `ΔU %${yuzde.toFixed(2)} izin verilen %${lim}'i aşıyor; kesiti büyütün veya mesafeyi azaltın.`
          : durum === "sinirda"
            ? `ΔU %${yuzde.toFixed(2)}, sınırın %90'ından fazla (pratik marj); büyük kesit düşünün.`
            : `ΔU %${yuzde.toFixed(2)}, izin verilen %${lim} içinde.`,
    },
  };
}

export const cokYukluHatGerilimDusumu: CalcModule<CokYukluHatGerilimDusumuInput, CokYukluHatGerilimDusumuOutput> = {
  id: "cok-yuklu-hat-gerilim-dusumu",
  title: "Çok Yüklü Hat Gerilim Düşümü (Dağıtılmış Yük)",
  discipline: "elektrik",
  standards: ["IEC 60364-5-52", "IEC 60228"],
  inputSchema: cokYukluHatGerilimDusumuInputSchema,
  compute,
};
