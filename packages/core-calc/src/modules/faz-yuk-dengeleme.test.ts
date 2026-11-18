import { describe, it, expect } from "vitest";
import { fazYukDengeleme } from "./faz-yuk-dengeleme";

describe("Faz Yük Dengeleme", () => {
  it("30/25/20/15/10/5 A: L1 = 30+5, L2 = 25+10, L3 = 20+15 → 35/35/35 A, %0, nötr 0", () => {
    const r = fazYukDengeleme.compute({ y1: 30, y2: 25, y3: 20, y4: 15, y5: 10, y6: 5, y7: 0, y8: 0 });
    expect([r.intermediates.l1_A, r.intermediates.l2_A, r.intermediates.l3_A]).toEqual([35, 35, 35]);
    expect(r.value.dengesizlik_pct).toBeCloseTo(0, 10);
    expect(r.intermediates.notr_akimi_A as number).toBeCloseTo(0, 8);
    expect(r.intermediates.atama).toBe("L1: 30+5; L2: 25+10; L3: 20+15");
  });
  it("tek yük 40 A → L1 = 40: dengesizlik %200, nötr 40 A; toplam korunur", () => {
    const r = fazYukDengeleme.compute({ y1: 40, y2: 0, y3: 0, y4: 0, y5: 0, y6: 0, y7: 0, y8: 0 });
    expect(r.value.dengesizlik_pct).toBeCloseTo(200, 8);
    expect(r.intermediates.notr_akimi_A as number).toBeCloseTo(40, 8);
    const k = fazYukDengeleme.compute({ y1: 16, y2: 10, y3: 10, y4: 6, y5: 6, y6: 2, y7: 0, y8: 0 });
    expect((k.intermediates.l1_A as number) + (k.intermediates.l2_A as number) + (k.intermediates.l3_A as number)).toBeCloseTo(50, 10);
  });
  it("Zod: hiç yük yoksa reddedilir", () => {
    expect(fazYukDengeleme.inputSchema.safeParse({ y1: 0, y2: 0, y3: 0, y4: 0, y5: 0, y6: 0, y7: 0, y8: 0 }).success).toBe(false);
  });
});
