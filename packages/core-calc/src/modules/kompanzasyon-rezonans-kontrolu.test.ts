import { describe, expect, it } from "vitest";
import { kompanzasyonRezonansKontrolu } from "./kompanzasyon-rezonans-kontrolu";

describe("kompanzasyon-rezonans-kontrolu", () => {
  it("Ssc=5000 kVA, Qc=500 kVAr, riskli h=5, tolerans=%10 → h≈3.162, fark %36.75 → uygun", () => {
    const r = kompanzasyonRezonansKontrolu.compute({
      kisaDevreGucu_Ssc_kVA: 5000,
      kompanzasyonGucu_Qc_kVAr: 500,
      riskliHarmonikMertebe_h: 5,
      toleransOrani: 0.1,
    });

    expect(r.value.rezonansHarmonikMertebesi_h).toBeCloseTo(3.1623, 3);
    expect(r.intermediates.bagilFark_yuzde).toBeCloseTo(36.75, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
});
