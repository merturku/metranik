import { describe, it, expect } from "vitest";
import { modul_238 } from "./modul_238";

describe("Pencere İsı Kaybı", () => {
  it("TS 825: 10 m² pencere, U=2.8 W/m²K, ΔT=20K → 560 W", () => {
    const r = modul_238.compute({
      alan_m2: 10,
      u_degeri_W_m2K: 2.8,
      sicaklik_farki_K: 20,
    });

    expect(r.value.isi_kaybi_W).toBe(560);
  });
});
