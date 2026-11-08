import { describe, it, expect } from "vitest";
import { zeminEfektifGerilme } from "./zemin-efektif-gerilme";

const g = { derinlik_z_m: 6, suTablasiDerinligi_zw_m: 2, dogalBirimHacimAgirlik_kNm3: 17, doygunBirimHacimAgirlik_kNm3: 19 };

describe("Zemin Efektif Gerilme", () => {
  it("z = 6, zw = 2, γ = 17, γsat = 19: σ = 34 + 76 = 110; u = 9,81·4 = 39,24; σ' = 70,76 kPa", () => {
    const r = zeminEfektifGerilme.compute(g);
    expect(r.intermediates.toplam_dusey_gerilme_kPa).toBe(110);
    expect(r.intermediates.bosluk_suyu_basinci_kPa as number).toBeCloseTo(39.24, 8);
    expect(r.value.efektifGerilme_kPa).toBeCloseTo(70.76, 8);
  });
  it("su tablası derinin altındaysa u = 0, σ' = γ·z", () => {
    const r = zeminEfektifGerilme.compute({ ...g, suTablasiDerinligi_zw_m: 10 });
    expect(r.value.efektifGerilme_kPa).toBe(102);
  });
  it("σ' = z_batık·(γsat − γw) + γ·zw (batık birim ağırlık yolu)", () => {
    const r = zeminEfektifGerilme.compute(g);
    expect(r.value.efektifGerilme_kPa).toBeCloseTo(17 * 2 + 4 * (19 - 9.81), 8);
  });
});
