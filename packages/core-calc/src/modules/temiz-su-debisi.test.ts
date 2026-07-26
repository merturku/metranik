import { describe, expect, it } from "vitest";
import { temizSuDebisi } from "./temiz-su-debisi";

describe("temiz-su-debisi", () => {
  it("K=0.5, ΣLU=15 → ~1.936 L/s", () => {
    const r = temizSuDebisi.compute({
      kullanimKatsayisi_K: 0.5,
      toplamYuklemeBirimi_LU: 15,
    });

    expect(r.value.debi_Ls).toBeCloseTo(1.9365, 3);
  });
});
