import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Nokta yöntemi (ters kare ve kosinüs yasası): noktasal kabul edilen bir
// armatürün P noktasında oluşturduğu aydınlık düzeyi.
// θ = atan(d/h), r = √(h² + d²);
// yatay düzlem: Eh = Iθ·cos θ / r² = Iθ·cos³θ / h²,
// armatüre bakan düşey düzlem: Ev = Iθ·sin θ / r² = Iθ·cos²θ·sin θ / h².
// Iθ: armatürün θ doğrultusundaki ışık şiddeti (cd), fotometrik veriden (polar
// eğri/IES dosyası) okunur; cd/klm verilmişse lamba akısıyla çarpılır.
// Yasa, mesafe armatürün en büyük boyutunun yaklaşık 5 katından büyükse geçerlidir.
// Birden fazla armatürün katkısı aynı noktada toplanır (süperpozisyon).
export const noktaYontemiAydinlikDuzeyiInputSchema = z.object({
  isikSiddeti_cd: z.number().positive(),
  montajYuksekligi_h_m: z.number().positive(),
  yatayMesafe_d_m: z.number().min(0),
  bakimFaktoru: z.number().positive().max(1),
});

export type NoktaYontemiAydinlikDuzeyiInput = z.infer<typeof noktaYontemiAydinlikDuzeyiInputSchema>;

export interface NoktaYontemiAydinlikDuzeyiOutput {
  yatayAydinlikDuzeyi_lx: number;
}

function compute(input: NoktaYontemiAydinlikDuzeyiInput): CalcResult<NoktaYontemiAydinlikDuzeyiOutput> {
  const h = input.montajYuksekligi_h_m;
  const d = input.yatayMesafe_d_m;
  const r2 = h * h + d * d;
  const r = Math.sqrt(r2);
  const cosT = h / r;
  const sinT = d / r;
  const ehBaslangic = (input.isikSiddeti_cd * cosT) / r2;
  const evBaslangic = (input.isikSiddeti_cd * sinT) / r2;

  return {
    value: { yatayAydinlikDuzeyi_lx: ehBaslangic * input.bakimFaktoru },
    intermediates: {
      gelis_acisi_derece: (Math.atan2(d, h) * 180) / Math.PI,
      armature_uzaklik_r_m: r,
      yatay_baslangic_aydinlik_lx: ehBaslangic,
      dusey_aydinlik_lx: evBaslangic * input.bakimFaktoru,
    },
    standardsUsed: [],
  };
}

export const noktaYontemiAydinlikDuzeyi: CalcModule<
  NoktaYontemiAydinlikDuzeyiInput,
  NoktaYontemiAydinlikDuzeyiOutput
> = {
  id: "nokta-yontemi-aydinlik-duzeyi",
  title: "Nokta Yöntemiyle Aydınlık Düzeyi",
  discipline: "elektrik",
  standards: [],
  inputSchema: noktaYontemiAydinlikDuzeyiInputSchema,
  compute,
};
