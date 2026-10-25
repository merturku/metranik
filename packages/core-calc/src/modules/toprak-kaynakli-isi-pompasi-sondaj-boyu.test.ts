import { describe, it, expect } from "vitest";
import {
  toprakKaynakliIsiPompasiSondajBoyu,
  toprakKaynakliIsiPompasiSondajBoyuInputSchema,
} from "./toprak-kaynakli-isi-pompasi-sondaj-boyu";

const ev = { isitmaGucu_kW: 10, mevsimselCop: 4, ozgulIsiCekmeGucu_Wm: 50, sondaSayisi: 2 };

describe("Toprak Kaynaklı Isı Pompası Sondaj Boyu", () => {
  it("10 kW, COP 4: çekilen güç 10×(1 − 1/4) = 7,5 kW; q = 50 W/m → 150 m; 2 sonda × 75 m → uygun", () => {
    const r = toprakKaynakliIsiPompasiSondajBoyu.compute(ev);
    expect(r.intermediates.topraktan_cekilen_guc_kW).toBeCloseTo(7.5, 12);
    expect(r.intermediates.kompresor_elektrik_gucu_kW).toBeCloseTo(2.5, 12);
    expect(r.value.toplamSondaBoyu_m).toBeCloseTo(150, 9);
    expect(r.intermediates.sonda_basina_boy_m).toBeCloseTo(75, 9);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Zayıf zemin q = 25 W/m: 300 m; tek sondada 300 m > 100 m → sınırda", () => {
    const r = toprakKaynakliIsiPompasiSondajBoyu.compute({ ...ev, ozgulIsiCekmeGucu_Wm: 25, sondaSayisi: 1 });
    expect(r.value.toplamSondaBoyu_m).toBeCloseTo(300, 9);
    expect(r.verdict?.status).toBe("sinirda");
  });

  it("40 kW tesis tablo yönteminin dışında → sınırda", () => {
    expect(toprakKaynakliIsiPompasiSondajBoyu.compute({ ...ev, isitmaGucu_kW: 40, sondaSayisi: 8 }).verdict?.status).toBe("sinirda");
  });

  it("COP 1'den büyük olmalı", () => {
    expect(toprakKaynakliIsiPompasiSondajBoyuInputSchema.safeParse({ ...ev, mevsimselCop: 1 }).success).toBe(false);
  });
});
