import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çamaşır/bulaşık makinesi yıllık işletme maliyeti: yıllık döngü = haftalık × 52; enerji = döngü × kWh/döngü; su = döngü × L/döngü;
// maliyet = enerji × elektrik fiyatı + su(m³) × (su + atık su) birim bedeli + deterjan (girdi). Etiket (EU enerji) değerleri 'standart program' içindir;
// gerçek kullanımda sıcaklık/yük farklı olabilir. Sıcak su bağlantılı makinede ısıtma enerjisi ayrıca hesaplanmalıdır.
export const evCamasirMakinesiYillikMaliyetInputSchema = z.object({
  haftalikDongu: z.number().min(0),
  donguBasinaEnerji_kWh: z.number().min(0),
  donguBasinaSu_L: z.number().min(0),
  donguBasinaDeterjan_TL: z.number().min(0),
  elektrikFiyati_TLkWh: z.number().min(0),
  suFiyati_TLm3: z.number().min(0),
});

export type EvCamasirMakinesiYillikMaliyetInput = z.infer<typeof evCamasirMakinesiYillikMaliyetInputSchema>;

export interface EvCamasirMakinesiYillikMaliyetOutput {
  yillikMaliyet_TL: number;
}

function compute(input: EvCamasirMakinesiYillikMaliyetInput): CalcResult<EvCamasirMakinesiYillikMaliyetOutput> {
  const dongu = input.haftalikDongu * 52;
  const kwh = dongu * input.donguBasinaEnerji_kWh;
  const m3 = (dongu * input.donguBasinaSu_L) / 1000;
  const elektrik = kwh * input.elektrikFiyati_TLkWh;
  const su = m3 * input.suFiyati_TLm3;
  const deterjan = dongu * input.donguBasinaDeterjan_TL;
  return {
    value: { yillikMaliyet_TL: elektrik + su + deterjan },
    intermediates: {
      yillik_dongu: dongu,
      yillik_enerji_kWh: kwh,
      yillik_su_m3: m3,
      elektrik_maliyeti_TL: elektrik,
      su_maliyeti_TL: su,
      deterjan_maliyeti_TL: deterjan,
      dongu_basina_maliyet_TL: dongu > 0 ? (elektrik + su + deterjan) / dongu : "—",
    },
    standardsUsed: [],
  };
}

export const evCamasirMakinesiYillikMaliyet: CalcModule<EvCamasirMakinesiYillikMaliyetInput, EvCamasirMakinesiYillikMaliyetOutput> = {
  id: "ev-camasir-makinesi-yillik-maliyet",
  title: "Çamaşır / Bulaşık Makinesi Yıllık İşletme Maliyeti",
  discipline: "ev",
  standards: [],
  inputSchema: evCamasirMakinesiYillikMaliyetInputSchema,
  compute,
};
