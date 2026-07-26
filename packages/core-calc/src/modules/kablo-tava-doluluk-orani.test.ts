import { describe, expect, it } from "vitest";
import { kabloTavaDolulukOrani } from "./kablo-tava-doluluk-orani";

describe("kablo-tava-doluluk-orani", () => {
  it("tek katman: 3000/10000mm² = %30 → uygun (sınır %40)", () => {
    const r = kabloTavaDolulukOrani.compute({
      kabloKesitAlanlariToplami_mm2: 3000,
      tavaKesitAlani_mm2: 10000,
      dizilimTipi: "tek",
    });

    expect(r.value.doluluk_yuzde).toBeCloseTo(30, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("tek katman: 4500/10000mm² = %45 → uygunsuz (sınır %40)", () => {
    const r = kabloTavaDolulukOrani.compute({
      kabloKesitAlanlariToplami_mm2: 4500,
      tavaKesitAlani_mm2: 10000,
      dizilimTipi: "tek",
    });

    expect(r.value.doluluk_yuzde).toBeCloseTo(45, 5);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("aynı %45 doluluk çok katmanlı dizilimde uygun kalır (sınır %50)", () => {
    const r = kabloTavaDolulukOrani.compute({
      kabloKesitAlanlariToplami_mm2: 4500,
      tavaKesitAlani_mm2: 10000,
      dizilimTipi: "cok",
    });

    expect(r.verdict?.status).toBe("uygun");
  });
});
