import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Nem dengesi: G = V̇·ρ·(xi − xe) → V̇ = G/(ρ·Δx). x = 0,622·pv/(P − pv), pv = φ·pws (Magnus).
const P_ATM_HPA = 1013.25;
function pws(T: number): number {
  return 6.112 * Math.exp((17.62 * T) / (243.12 + T));
}
function mutlakNem_gkg(T: number, rh: number): number {
  const pv = rh * pws(T);
  return (622 * pv) / (P_ATM_HPA - pv);
}

export const konutNemDengesiHavalandirmaInputSchema = z.object({
  nemUretimi_kggun: z.number().positive(),
  icSicaklik_C: z.number().min(-10).max(40),
  icBagilNem: z.number().gt(0).lt(1),
  disSicaklik_C: z.number().min(-40).max(40),
  disBagilNem: z.number().gt(0).max(1),
  odaHacmi_m3: z.number().positive(),
  havaYogunlugu_kgm3: z.number().positive(),
});

export type KonutNemDengesiHavalandirmaInput = z.infer<typeof konutNemDengesiHavalandirmaInputSchema>;
export interface KonutNemDengesiHavalandirmaOutput {
  gerekliDebi_m3h: number | null;
}

function compute(input: KonutNemDengesiHavalandirmaInput): CalcResult<KonutNemDengesiHavalandirmaOutput> {
  const xi = mutlakNem_gkg(input.icSicaklik_C, input.icBagilNem);
  const xe = mutlakNem_gkg(input.disSicaklik_C, input.disBagilNem);
  const dx = xi - xe;
  if (dx <= 0) {
    return {
      value: { gerekliDebi_m3h: null },
      intermediates: { ic_mutlak_nem_gkg: xi, dis_mutlak_nem_gkg: xe, uyari: "Dış havanın mutlak nemi iç hedeften yüksek: havalandırmayla nem atılamaz (nem alma cihazı gerekir)" },
      standardsUsed: ["Nem kütle dengesi (TS EN ISO 13788 psikrometrik bağıntılar)"],
      verdict: { status: "uygunsuz", note: "Havalandırmayla nem atımı mümkün değil" },
    };
  }
  const Gh = (input.nemUretimi_kggun * 1000) / 24; // g/h
  const V = Gh / (input.havaYogunlugu_kgm3 * dx);
  return {
    value: { gerekliDebi_m3h: V },
    intermediates: {
      ic_mutlak_nem_gkg: xi,
      dis_mutlak_nem_gkg: xe,
      mutlak_nem_farki_gkg: dx,
      nem_uretimi_gh: Gh,
      hava_degisim_sayisi_1h: V / input.odaHacmi_m3,
      denge_kontrol_gh: V * input.havaYogunlugu_kgm3 * dx,
    },
    standardsUsed: ["Nem kütle dengesi (TS EN ISO 13788 psikrometrik bağıntılar)"],
  };
}

export const konutNemDengesiHavalandirma: CalcModule<KonutNemDengesiHavalandirmaInput, KonutNemDengesiHavalandirmaOutput> = {
  id: "konut-nem-dengesi-havalandirma",
  title: "Konut Nem Dengesi ve Gerekli Havalandırma Debisi",
  discipline: "ev",
  standards: ["Nem kütle dengesi (TS EN ISO 13788 psikrometrik bağıntılar)"],
  inputSchema: konutNemDengesiHavalandirmaInputSchema,
  compute,
};
