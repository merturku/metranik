import { describe, it, expect } from "vitest";
import { modul_239 } from "./modul_239";

describe("Sıcak Su Isınma Süresi", () => {
  it("DIN 4708: 100L boyler, ΔT=40K, P=3 kW → ~54 dakika", () => {
    const r = modul_239.compute({
      hacim_L: 100,
      sicaklik_artisi_K: 40,
      guc_kW: 3,
    });

    expect(r.value.isinma_suresi_dakika).toBeCloseTo(54, 0);
  });
});
