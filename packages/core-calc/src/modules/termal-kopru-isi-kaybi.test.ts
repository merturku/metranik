import { describe, it, expect } from "vitest";
import { termalKopruIsiKaybi } from "./termal-kopru-isi-kaybi";

describe("Isıl Köprü Isı Kaybı", () => {
  it("ψ 0,15, L 20 m, ΔT 20 K → 60 W; UA 100 W/K'ye göre %3", () => {
    const r = termalKopruIsiKaybi.compute({ psi_WmK: 0.15, uzunluk_m: 20, icSicaklik_C: 20, disSicaklik_C: 0, duvarUA_WK: 100 });
    expect(r.value.isiKaybi_W).toBeCloseTo(60, 9);
    expect(r.intermediates.ek_kayip_yuzde as number).toBeCloseTo(3, 9);
  });
});
