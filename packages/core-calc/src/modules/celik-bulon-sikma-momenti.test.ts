import { describe, expect, it } from "vitest";
import { celikBulonSikmaMomenti } from "./celik-bulon-sikma-momenti";

describe("celik-bulon-sikma-momenti", () => {
  it("TS EN 1090-2: M16 8.8 (As=157mm², fub=800MPa), k=0.2 → ~281.3 Nm", () => {
    const r = celikBulonSikmaMomenti.compute({
      bulonCapi_mm: 16,
      gerilmeAlani_mm2: 157,
      nihaiCekmeDayanimi_fub_MPa: 800,
      torkKatsayisi_k: 0.2,
    });

    expect(r.intermediates.onGermeKuvveti_kN).toBeCloseTo(87.92, 2);
    expect(r.value.sikmaMomenti_Nm).toBeCloseTo(281.344, 1);
  });
});
