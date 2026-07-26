import { describe, expect, it } from "vitest";
import { kabloAkimTasimaKapasitesiDuzeltmesi } from "./kablo-akim-tasima-kapasitesi-duzeltmesi";

describe("kablo-akim-tasima-kapasitesi-duzeltmesi", () => {
  it("Iz=80A, kT=0.94, kG=0.8 → 60.16 A", () => {
    const r = kabloAkimTasimaKapasitesiDuzeltmesi.compute({
      temelAkimTasimaKapasitesi_Iz_A: 80,
      sicaklikDuzeltmeKatsayisi_kT: 0.94,
      gruplamaDuzeltmeKatsayisi_kG: 0.8,
    });

    expect(r.value.duzeltilmisAkimTasimaKapasitesi_A).toBeCloseTo(60.16, 2);
  });
});
