import { describe, it, expect } from "vitest";
import { evDirencSeriParalel } from "./ev-direnc-seri-paralel";

describe("Seri / Paralel Direnç", () => {
  it("10, 20, 30 Ω: seri 60 Ω; paralel 5,4545 Ω", () => {
    expect(evDirencSeriParalel.compute({ mod: "seri", r1: 10, r2: 20, r3: 30, r4: 0, r5: 0 }).value.esdegerDirenc_ohm).toBeCloseTo(60, 10);
    const p = evDirencSeriParalel.compute({ mod: "paralel", r1: 10, r2: 20, r3: 30, r4: 0, r5: 0 });
    expect(p.value.esdegerDirenc_ohm).toBeCloseTo(5.454545, 5);
    expect(p.intermediates.kullanilan_direnc_sayisi).toBe(3);
  });
  it("n eşit direnç paralel R/n; tek direnç aynen; hepsi 0 → Zod reddeder", () => {
    expect(evDirencSeriParalel.compute({ mod: "paralel", r1: 12, r2: 12, r3: 12, r4: 12, r5: 0 }).value.esdegerDirenc_ohm).toBeCloseTo(3, 10);
    expect(evDirencSeriParalel.compute({ mod: "seri", r1: 47, r2: 0, r3: 0, r4: 0, r5: 0 }).value.esdegerDirenc_ohm).toBeCloseTo(47, 10);
    expect(evDirencSeriParalel.inputSchema.safeParse({ mod: "seri", r1: 0, r2: 0, r3: 0, r4: 0, r5: 0 }).success).toBe(false);
  });
});
