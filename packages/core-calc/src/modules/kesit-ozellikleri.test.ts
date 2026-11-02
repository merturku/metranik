import { describe, it, expect } from "vitest";
import { kesitOzellikleri } from "./kesit-ozellikleri";

describe("Kesit Özellikleri", () => {
  it("300×500: A 150 000 mm², I 3,125e9 mm⁴, W 12,5e6 mm³, i = 144,3 mm", () => {
    const r = kesitOzellikleri.compute({ tip: "dikdortgen", boyut1_mm: 300, boyut2_mm: 500 });
    expect(r.value.alan_mm2).toBe(150000);
    expect(r.intermediates.atalet_momenti_mm4 as number).toBeCloseTo(3.125e9, -3);
    expect(r.intermediates.mukavemet_momenti_mm3 as number).toBeCloseTo(12.5e6, -2);
    expect(r.intermediates.atalet_yaricapi_mm as number).toBeCloseTo(144.34, 1);
  });
  it("Ø100 daire: A 7853,98; I = πd⁴/64 = 4,909e6; i = d/4 = 25", () => {
    const r = kesitOzellikleri.compute({ tip: "daire", boyut1_mm: 100, boyut2_mm: 1 });
    expect(r.value.alan_mm2).toBeCloseTo(7853.98, 2);
    expect(r.intermediates.atalet_momenti_mm4 as number).toBeCloseTo(4.9087e6, -3);
    expect(r.intermediates.atalet_yaricapi_mm as number).toBeCloseTo(25, 6);
  });
  it("boru Ø100×5: A = 1492,26; I = 1,688e6", () => {
    const r = kesitOzellikleri.compute({ tip: "boru", boyut1_mm: 100, boyut2_mm: 5 });
    expect(r.value.alan_mm2).toBeCloseTo(1492.26, 1);
    expect(r.intermediates.atalet_momenti_mm4 as number).toBeCloseTo(1.688e6, -3);
  });
  it("boruda 2t ≥ D reddedilir", () => {
    expect(kesitOzellikleri.inputSchema.safeParse({ tip: "boru", boyut1_mm: 10, boyut2_mm: 6 }).success).toBe(false);
  });
});
