import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ev için taşınabilir jeneratör gücü: çalışma gücü toplamı + en büyük motorlu cihazın (buzdolabı, pompa, klima)
// kalkış fazlası: Pgerekli = [ΣPçalışma + (k − 1)·Pmotor]·(1 + yedek). k = kalkış/çalışma gücü katsayısı (motorlarda tipik 2–3, kompresörlü
// cihazlarda 3–7; cihaz etiketinden/üreticiden teyit edin). VA = W/cosφ. Yalnız aynı anda çalışan cihazlar toplanır.
// Elektronik hassas cihazlarda (bilgisayar, TV) inverter tipi jeneratör tercih edilmelidir; bu modül güç dengesidir.
export const evTasinabilirJeneratorGucuInputSchema = z.object({
  calismaGucuToplami_W: z.number().positive(),
  enBuyukMotorGucu_W: z.number().min(0),
  kalkisKatsayisi: z.number().min(1).max(10),
  yedekPayi_yuzde: z.number().min(0).max(100),
  cosPhi: z.number().min(0.5).max(1),
});

export type EvTasinabilirJeneratorGucuInput = z.infer<typeof evTasinabilirJeneratorGucuInputSchema>;

export interface EvTasinabilirJeneratorGucuOutput {
  gerekliGuc_W: number;
}

function compute(input: EvTasinabilirJeneratorGucuInput): CalcResult<EvTasinabilirJeneratorGucuOutput> {
  const tepe = input.calismaGucuToplami_W + (input.kalkisKatsayisi - 1) * input.enBuyukMotorGucu_W;
  const gerekli = tepe * (1 + input.yedekPayi_yuzde / 100);
  return {
    value: { gerekliGuc_W: gerekli },
    intermediates: {
      kalkis_anindaki_tepe_yuk_W: tepe,
      gerekli_VA: gerekli / input.cosPhi,
      gerekli_kVA: gerekli / input.cosPhi / 1000,
    },
    standardsUsed: [],
  };
}

export const evTasinabilirJeneratorGucu: CalcModule<EvTasinabilirJeneratorGucuInput, EvTasinabilirJeneratorGucuOutput> = {
  id: "ev-tasinabilir-jenerator-gucu",
  title: "Ev Taşınabilir Jeneratör Gücü (Kalkış Yüklü)",
  discipline: "ev",
  standards: [],
  inputSchema: evTasinabilirJeneratorGucuInputSchema,
  compute,
};
