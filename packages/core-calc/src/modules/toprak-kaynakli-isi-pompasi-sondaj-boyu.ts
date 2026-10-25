import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Toprak kaynaklı ısı pompasında düşey sonda (sondaj) boyu, VDI 4640 Bölüm 2 özgül
// ısı çekme gücü yöntemi: topraktan çekilen güç Qçekme = Qısıtma·(1 − 1/COP)
// (ısıtma gücünün kompresör elektriği dışındaki kısmı), toplam sonda boyu
// L = Qçekme / q, q: zemin cinsine ve yıllık çalışma saatine bağlı özgül ısı çekme
// gücü (W/m, VDI 4640 tablosundan veya ısıl tepki testinden).
// Tablo yöntemi küçük tesisler (≈ 30 kW'a kadar ısıtma gücü) ve 40–100 m sonda
// boyları için geçerlidir; daha büyük tesislerde simülasyon/ısıl tepki testi gerekir.
export const toprakKaynakliIsiPompasiSondajBoyuInputSchema = z.object({
  isitmaGucu_kW: z.number().positive(),
  mevsimselCop: z.number().gt(1),
  ozgulIsiCekmeGucu_Wm: z.number().positive(),
  sondaSayisi: z.number().int().min(1),
});

export type ToprakKaynakliIsiPompasiSondajBoyuInput = z.infer<typeof toprakKaynakliIsiPompasiSondajBoyuInputSchema>;

export interface ToprakKaynakliIsiPompasiSondajBoyuOutput {
  toplamSondaBoyu_m: number;
}

function compute(
  input: ToprakKaynakliIsiPompasiSondajBoyuInput,
): CalcResult<ToprakKaynakliIsiPompasiSondajBoyuOutput> {
  const Q = input.isitmaGucu_kW;
  const cekme_kW = Q * (1 - 1 / input.mevsimselCop);
  const toplam = (cekme_kW * 1000) / input.ozgulIsiCekmeGucu_Wm;
  const sondaBasina = toplam / input.sondaSayisi;

  const verdict: CalcResult<ToprakKaynakliIsiPompasiSondajBoyuOutput>["verdict"] =
    Q > 30
      ? {
          status: "sinirda",
          note: `Isıtma gücü ${Q} kW > 30 kW: VDI 4640 tablo yöntemi bu büyüklükte yeterli değil; ısıl tepki testi ve sonda alanı simülasyonu yapılmalı.`,
        }
      : sondaBasina < 40 || sondaBasina > 100
        ? {
            status: "sinirda",
            note: `Sonda başına ${sondaBasina.toFixed(0)} m, tablo değerlerinin geçerli olduğu 40–100 m aralığının dışında; sonda sayısını değiştirin.`,
          }
        : {
            status: "uygun",
            note: `${input.sondaSayisi} × ${sondaBasina.toFixed(0)} m sonda; toplam ${toplam.toFixed(0)} m. Sondalar arası en az 6 m bırakın.`,
          };

  return {
    value: { toplamSondaBoyu_m: toplam },
    intermediates: {
      topraktan_cekilen_guc_kW: cekme_kW,
      kompresor_elektrik_gucu_kW: Q - cekme_kW,
      sonda_basina_boy_m: sondaBasina,
    },
    standardsUsed: ["VDI 4640 Bölüm 2"],
    verdict,
  };
}

export const toprakKaynakliIsiPompasiSondajBoyu: CalcModule<
  ToprakKaynakliIsiPompasiSondajBoyuInput,
  ToprakKaynakliIsiPompasiSondajBoyuOutput
> = {
  id: "toprak-kaynakli-isi-pompasi-sondaj-boyu",
  title: "Toprak Kaynaklı Isı Pompası Sondaj Boyu",
  discipline: "mekanik",
  standards: ["VDI 4640 Bölüm 2"],
  inputSchema: toprakKaynakliIsiPompasiSondajBoyuInputSchema,
  compute,
};
