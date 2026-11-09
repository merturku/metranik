import { describe, it, expect } from "vitest";
import { hidrostatikTestEkSuHacmi } from "./hidrostatik-test-ek-su-hacmi";

const g = { hatHacmi_L: 1000, basincArtisi_bar: 10, icCap_mm: 100, etKalinligi_mm: 3.6, boruEMod_MPa: 210000, suHacimModulu_MPa: 2200 };

describe("Hidrostatik Test Ek Su Hacmi", () => {
  it("1000 L, 10 bar, çelik DN100: ΔV = 1000·1·(1/2200 + 100/(210000·3,6)) = 0,5868 L", () => {
    const r = hidrostatikTestEkSuHacmi.compute(g);
    expect(r.value.ekSu_L).toBeCloseTo(0.5868, 3);
    expect(r.intermediates.su_sikismasi_L as number).toBeCloseTo(0.4545, 3);
    expect(r.intermediates.izin_verilen_kayip_L as number).toBeCloseTo(0.7042, 3);
  });
  it("rijit boruda (E → ∞) yalnız su sıkışması kalır; hacim ve basınçla doğrusal", () => {
    const r = hidrostatikTestEkSuHacmi.compute({ ...g, boruEMod_MPa: 1e12 });
    expect(r.value.ekSu_L).toBeCloseTo(1000 / 2200, 5);
    expect(hidrostatikTestEkSuHacmi.compute({ ...g, hatHacmi_L: 2000 }).value.ekSu_L / hidrostatikTestEkSuHacmi.compute(g).value.ekSu_L).toBeCloseTo(2, 8);
  });
});
