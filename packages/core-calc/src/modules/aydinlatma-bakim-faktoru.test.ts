import { describe, it, expect } from "vitest";
import { aydinlatmaBakimFaktoru } from "./aydinlatma-bakim-faktoru";

describe("Aydınlatma Bakım Faktörü", () => {
  it("0,90·1,00·0,92·0,95 = 0,7866; 500 lx için başlangıç 635,7 lx", () => {
    const r = aydinlatmaBakimFaktoru.compute({ llmf: 0.9, lsf: 1, lmf: 0.92, rmf: 0.95, tasarimAydinligi_lux: 500 });
    expect(r.value.bakimFaktoru).toBeCloseTo(0.7866, 4);
    expect(r.intermediates.baslangic_aydinligi_gerekli_lux as number).toBeCloseTo(635.67, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("MF < 0,5 → sınırda", () => {
    expect(aydinlatmaBakimFaktoru.compute({ llmf: 0.7, lsf: 0.9, lmf: 0.7, rmf: 0.9, tasarimAydinligi_lux: 300 }).verdict?.status).toBe("sinirda");
  });
});
