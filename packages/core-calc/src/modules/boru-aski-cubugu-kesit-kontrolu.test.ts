import { describe, expect, it } from "vitest";
import { boruAskiCubuguKesitKontrolu } from "./boru-aski-cubugu-kesit-kontrolu";

describe("boru-aski-cubugu-kesit-kontrolu", () => {
  it("Yük=2000N, σizin=140MPa, mevcut çap=8mm → gerekli≈4.26mm → uygun", () => {
    const r = boruAskiCubuguKesitKontrolu.compute({
      askiYuku_N: 2000,
      izinVerilenGerilme_sigma_MPa: 140,
      mevcutCubukCapi_d_mm: 8,
    });

    expect(r.intermediates.gerekliAlan_mm2).toBeCloseTo(14.286, 2);
    expect(r.value.gerekliCap_mm).toBeCloseTo(4.2649, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
});
