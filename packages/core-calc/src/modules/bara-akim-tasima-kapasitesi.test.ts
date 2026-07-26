import { describe, expect, it } from "vitest";
import { baraAkimTasimaKapasitesi } from "./bara-akim-tasima-kapasitesi";

describe("bara-akim-tasima-kapasitesi", () => {
  it("J=1.6 A/mm², A=500mm² → 800A", () => {
    const r = baraAkimTasimaKapasitesi.compute({
      akimYogunlugu_J_Amm2: 1.6,
      baraKesitAlani_mm2: 500,
    });

    expect(r.value.akimTasimaKapasitesi_A).toBeCloseTo(800, 5);
  });
});
