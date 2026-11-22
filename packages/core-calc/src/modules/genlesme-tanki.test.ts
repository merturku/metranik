import { describe, expect, it } from "vitest";
import { genlesmeTanki } from "./genlesme-tanki";

describe("genlesme-tanki", () => {
  // Vt = Vs·e/(1−Pa/Pf) = 100×0.03/(1−1.5/3) = 3/0.5 = 6 L, bağımsız doğrulanabilir.
  it("100 L sistem, %3 genleşme, 1.5/3 bar için tank hacmini hesaplar", () => {
    const r = genlesmeTanki.compute({
      sistemSuHacmi_L: 100,
      genlesmeOrani: 0.03,
      ilkBasinc_bar: 1.5,
      sonBasinc_bar: 3,
    });

    expect(r.value.tankHacmi_L).toBeCloseTo(6, 5);
  });

  it("ilk basınç ≥ son basınç ise girdi reddedilir (negatif/sonsuz hacim üretmez)", () => {
    const g = { sistemSuHacmi_L: 100, genlesmeOrani: 0.03, ilkBasinc_bar: 3, sonBasinc_bar: 3 };
    expect(genlesmeTanki.inputSchema.safeParse(g).success).toBe(false);
    expect(genlesmeTanki.inputSchema.safeParse({ ...g, ilkBasinc_bar: 4 }).success).toBe(false);
  });
});
