import { describe, expect, it } from "vitest";
import { duvarUDegeriHesabi } from "./duvar-u-degeri-hesabi";

describe("duvar-u-degeri-hesabi", () => {
  it("Rsi=0.13, Rse=0.04, tuğla d=0.19m k=0.72, EPS d=0.05m k=0.035 → U≈0.537 W/m²K", () => {
    const r = duvarUDegeriHesabi.compute({
      icYuzeyDirenci_Rsi_m2KW: 0.13,
      disYuzeyDirenci_Rse_m2KW: 0.04,
      katman1Kalinligi_d1_m: 0.19,
      katman1Iletkenlik_k1_WmK: 0.72,
      katman2Kalinligi_d2_m: 0.05,
      katman2Iletkenlik_k2_WmK: 0.035,
    });

    expect(r.intermediates.katman1Direnci_m2KW).toBeCloseTo(0.26389, 4);
    expect(r.intermediates.katman2Direnci_m2KW).toBeCloseTo(1.42857, 4);
    expect(r.value.isiGecirmeKatsayisi_U_Wm2K).toBeCloseTo(0.5369, 3);
  });
});
