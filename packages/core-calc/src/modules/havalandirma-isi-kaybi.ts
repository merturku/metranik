import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 825 havalandırma (infiltrasyon) ısı kaybı bileşeni: hava değişim sayısı
// ile hacmin çarpımı, havanın hacimsel ısı kapasitesiyle sıcaklık farkına
// çarpılır. Q = (ρ×cp/3600)×n×V×ΔT; ρ×cp/3600 ≈ 0.335 W/m³K (hava için).
// Bina zarfından iletim kaybını (Pencere/Duvar Isı Kaybı modülü) tamamlayan
// ayrı bir ısı kaybı bileşenidir.
const HAVA_HACIMSEL_ISI_KATSAYISI_WM3K = (1.2 * 1005) / 3600;

export const havalandirmaIsiKaybiInputSchema = z.object({
  havaDegisimSayisi_n_1h: z.number().positive(),
  hacim_V_m3: z.number().positive(),
  sicaklikFarki_dT_C: z.number().positive(),
});

export type HavalandirmaIsiKaybiInput = z.infer<typeof havalandirmaIsiKaybiInputSchema>;

export interface HavalandirmaIsiKaybiOutput {
  isiKaybi_W: number;
}

function compute(input: HavalandirmaIsiKaybiInput): CalcResult<HavalandirmaIsiKaybiOutput> {
  const isiKaybiW =
    HAVA_HACIMSEL_ISI_KATSAYISI_WM3K *
    input.havaDegisimSayisi_n_1h *
    input.hacim_V_m3 *
    input.sicaklikFarki_dT_C;

  return {
    value: { isiKaybi_W: isiKaybiW },
    intermediates: {
      havaHacimselIsiKatsayisi_Wm3K: HAVA_HACIMSEL_ISI_KATSAYISI_WM3K,
    },
    standardsUsed: ["TS 825"],
  };
}

export const havalandirmaIsiKaybi: CalcModule<
  HavalandirmaIsiKaybiInput,
  HavalandirmaIsiKaybiOutput
> = {
  id: "havalandirma-isi-kaybi",
  title: "Havalandırma (İnfiltrasyon) Isı Kaybı",
  discipline: "mekanik",
  standards: ["TS 825"],
  inputSchema: havalandirmaIsiKaybiInputSchema,
  compute,
};
