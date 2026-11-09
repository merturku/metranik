import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Düz dikdörtgen kanat (fin) verimi, ucu yalıtılmış kabulü: m = √(2h/(k·t)),  η = tanh(m·L)/(m·L),
// kanat ısı transferi Q = η·h·A_kanat·ΔT,  A_kanat = 2·L·w (iki yüz, uç ihmal). t kanat kalınlığı, L kanat boyu, w genişlik.
// h taşınım katsayısı (hava tarafı ≈ 10–100 W/m²K), k kanat malzemesi (alüminyum ≈ 200, bakır ≈ 390, çelik ≈ 50 W/mK). Serpantin,
// radyatör ve genişletilmiş yüzeyli eşanjörlerde yüzey verimi için kullanılır; uç kaybı için düzeltilmiş boy Lc = L + t/2 kullanılabilir.
export const kanatFinVerimiInputSchema = z.object({
  tasinimKatsayisi_h: z.number().positive(),
  iletkenlik_k: z.number().positive(),
  kalinlik_mm: z.number().positive(),
  boy_mm: z.number().positive(),
  genislik_mm: z.number().positive(),
  sicaklikFarki_K: z.number(),
});

export type KanatFinVerimiInput = z.infer<typeof kanatFinVerimiInputSchema>;

export interface KanatFinVerimiOutput {
  kanatVerimi: number;
}

function compute(input: KanatFinVerimiInput): CalcResult<KanatFinVerimiOutput> {
  const t = input.kalinlik_mm / 1000;
  const l = input.boy_mm / 1000;
  const w = input.genislik_mm / 1000;
  const m = Math.sqrt((2 * input.tasinimKatsayisi_h) / (input.iletkenlik_k * t));
  const ml = m * l;
  const eta = Math.tanh(ml) / ml;
  const aKanat = 2 * l * w;
  const q = eta * input.tasinimKatsayisi_h * aKanat * input.sicaklikFarki_K;
  return {
    value: { kanatVerimi: eta },
    intermediates: {
      m_1_per_m: m,
      mL: ml,
      kanat_yuzey_alani_m2: aKanat,
      kanat_isi_transferi_W: q,
      ideal_isi_transferi_W: input.tasinimKatsayisi_h * aKanat * input.sicaklikFarki_K,
    },
    standardsUsed: ["Kanat ısı transferi teorisi (Incropera, düz kanat, adyabatik uç)"],
    verdict:
      eta < 0.6
        ? { status: "sinirda", note: "Kanat verimi düşük (< 0,6): kanat boyunu kısaltın veya iletkenliği/kalınlığı artırın." }
        : { status: "uygun", note: "Kanat verimi yeterli." },
  };
}

export const kanatFinVerimi: CalcModule<KanatFinVerimiInput, KanatFinVerimiOutput> = {
  id: "kanat-fin-verimi",
  title: "Kanat (Fin) Verimi ve Isı Transferi",
  discipline: "mekanik",
  standards: [],
  inputSchema: kanatFinVerimiInputSchema,
  compute,
};
