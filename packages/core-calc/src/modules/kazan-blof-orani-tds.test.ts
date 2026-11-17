import { describe, it, expect } from "vitest";
import { kazanBlofOraniTds } from "./kazan-blof-orani-tds";

describe("Kazan Blöf Oranı (TDS)", () => {
  it("S = 10 000 kg/h, Sf 200, Sk 3000: B = 714,29 kg/h; F = 10 714,29; B/F = %6,667 (= Sf/Sk)", () => {
    const r = kazanBlofOraniTds.compute({ buharDebisi_kgh: 10000, tdsBesi_ppm: 200, tdsKazan_ppm: 3000 });
    expect(r.value.blofDebisi_kgh).toBeCloseTo(714.2857, 3);
    expect(r.intermediates.besi_suyu_debisi_kgh as number).toBeCloseTo(10714.2857, 3);
    expect(r.intermediates.blof_orani_besi_pct as number).toBeCloseTo(6.66667, 4);
    expect(r.intermediates.blof_orani_buhar_pct as number).toBeCloseTo(7.14286, 4);
  });
  it("Zod: Sk ≤ Sf reddedilir", () => {
    expect(kazanBlofOraniTds.inputSchema.safeParse({ buharDebisi_kgh: 1000, tdsBesi_ppm: 500, tdsKazan_ppm: 500 }).success).toBe(false);
  });
});
