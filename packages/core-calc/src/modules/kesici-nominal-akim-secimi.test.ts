import { describe, it, expect } from "vitest";
import { kesiciNominalAkimSecimi } from "./kesici-nominal-akim-secimi";

describe("Kesici Nominal Akım Seçimi", () => {
  it("Ib 27 A → In 32 A (yüklenme %84,4)", () => {
    const r = kesiciNominalAkimSecimi.compute({ tasarimAkimi_A: 27 });
    expect(r.value.nominalAkim_A).toBe(32);
    expect(r.intermediates.yuklenme_yuzde as number).toBeCloseTo(84.375, 3);
  });
  it("Ib 16 A → 16 A; Ib 130 A → null", () => {
    expect(kesiciNominalAkimSecimi.compute({ tasarimAkimi_A: 16 }).value.nominalAkim_A).toBe(16);
    expect(kesiciNominalAkimSecimi.compute({ tasarimAkimi_A: 130 }).value.nominalAkim_A).toBeNull();
  });
});
