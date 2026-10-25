import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kombi / ani su ısıtıcının sürekli sıcak su debisi (enerji dengesi):
// ṁ = P/(cp·ΔT), ΔT = Tkullanım − Tşebeke; cp = 4,186 kJ/kgK, ρ ≈ 1 kg/L.
// P: cihazın kullanım suyu tarafındaki ısıl gücü (çıkış); katalogda yalnız ısıl
// yük (giriş) verilmişse verimle çarpılarak girilir. Kataloglardaki "ΔT = 30 K
// sıcak su debisi" EN 13203-1'in spesifik debi (D) tanımıyla aynı ΔT'dir.
// Eşzamanlı duşlar istenen debiyi aşarsa, tüm debide ulaşılabilen sıcaklık
// T = Tşebeke + P/(ṁ·cp) olur.
const CP_KJ_KGK = 4.186;
const SPESIFIK_DEBI_DT_K = 30;

export const kombiSicakSuDebisiInputSchema = z
  .object({
    sicakSuGucu_kW: z.number().positive(),
    sebekeSuyuSicakligi_C: z.number(),
    kullanimSicakligi_C: z.number(),
    dusDebisi_Ldk: z.number().positive(),
    esZamanliDusSayisi: z.number().int().min(1),
  })
  .refine((v) => v.kullanimSicakligi_C > v.sebekeSuyuSicakligi_C, {
    message: "Kullanım sıcaklığı şebeke suyu sıcaklığından yüksek olmalı",
  });

export type KombiSicakSuDebisiInput = z.infer<typeof kombiSicakSuDebisiInputSchema>;

export interface KombiSicakSuDebisiOutput {
  sicakSuDebisi_Ldk: number;
}

function compute(input: KombiSicakSuDebisiInput): CalcResult<KombiSicakSuDebisiOutput> {
  const dT = input.kullanimSicakligi_C - input.sebekeSuyuSicakligi_C;
  const debiLdk = (input.sicakSuGucu_kW / (CP_KJ_KGK * dT)) * 60;
  const gerekenDebiLdk = input.dusDebisi_Ldk * input.esZamanliDusSayisi;
  const ulasilanSicaklik =
    input.sebekeSuyuSicakligi_C + input.sicakSuGucu_kW / (CP_KJ_KGK * (gerekenDebiLdk / 60));

  const verdict: CalcResult<KombiSicakSuDebisiOutput>["verdict"] =
    debiLdk >= gerekenDebiLdk
      ? {
          status: "uygun",
          note: `${input.kullanimSicakligi_C} °C'de ${debiLdk.toFixed(1)} L/dk ≥ ${input.esZamanliDusSayisi} duş × ${input.dusDebisi_Ldk} L/dk = ${gerekenDebiLdk} L/dk.`,
        }
      : {
          status: "uygunsuz",
          note: `${gerekenDebiLdk} L/dk çekişte su ancak ${ulasilanSicaklik.toFixed(1)} °C'ye ısınır (istenen ${input.kullanimSicakligi_C} °C). Daha yüksek güçlü cihaz, depolu (boyler) sistem veya düşük debili duş başlığı düşünün.`,
        };

  return {
    value: { sicakSuDebisi_Ldk: debiLdk },
    intermediates: {
      sicaklik_artisi_K: dT,
      spesifik_debi_dT30_Ldk: (input.sicakSuGucu_kW / (CP_KJ_KGK * SPESIFIK_DEBI_DT_K)) * 60,
      karsilanan_dus_sayisi: debiLdk / input.dusDebisi_Ldk,
      gereken_debi_Ldk: gerekenDebiLdk,
      gereken_debide_ulasilan_sicaklik_C: ulasilanSicaklik,
    },
    standardsUsed: ["EN 13203-1"],
    verdict,
  };
}

export const kombiSicakSuDebisi: CalcModule<KombiSicakSuDebisiInput, KombiSicakSuDebisiOutput> = {
  id: "kombi-sicak-su-debisi",
  title: "Kombi / Ani Su Isıtıcı Sıcak Su Debisi",
  discipline: "ev",
  standards: ["EN 13203-1"],
  inputSchema: kombiSicakSuDebisiInputSchema,
  compute,
};
