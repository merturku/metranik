import { describe, expect, it } from "vitest";
import { trafoKisaDevreAkimi } from "./trafo-kisa-devre-akimi";

describe("trafo-kisa-devre-akimi", () => {
  it("Sn=1000kVA, Vn=400V, Ucc=5% → ~28.87 kA", () => {
    const r = trafoKisaDevreAkimi.compute({
      trafoGucu_Sn_kVA: 1000,
      nominalGerilim_Vn_V: 400,
      kisaDevreGerilimYuzdesi_Ucc: 5,
    });

    expect(r.intermediates.nominalAkim_A).toBeCloseTo(1443.38, 1);
    expect(r.value.kisaDevreAkimi_kA).toBeCloseTo(28.868, 2);
  });
});
