import { describe, expect, it } from "vitest";
import { atikSuDebisi } from "./atik-su-debisi";

describe("atik-su-debisi", () => {
  it("K=0.5, ΣDU=20 → ~2.236 L/s", () => {
    const r = atikSuDebisi.compute({
      kullanimKatsayisi_K: 0.5,
      toplamDesarjBirimi_DU: 20,
    });

    expect(r.value.debi_Ls).toBeCloseTo(2.236, 3);
  });
});
