import { describe, expect, it } from "vitest";
import { isiYalitimKalinligiHesabi } from "./isi-yalitim-kalinligi-hesabi";

describe("isi-yalitim-kalinligi-hesabi", () => {
  it("TS 825: Rmevcut=0.5, Uhedef=0.4, λ=0.035 → 7 cm ek yalıtım", () => {
    const r = isiYalitimKalinligiHesabi.compute({
      mevcutDuvarDirenci_m2KW: 0.5,
      hedefUDegeri_WmK: 0.4,
      yalitimIletkenligi_WmK: 0.035,
    });

    expect(r.intermediates.hedefDirenc_m2KW).toBeCloseTo(2.5, 5);
    expect(r.intermediates.ekYalitimDirenci_m2KW).toBeCloseTo(2, 5);
    expect(r.value.gerekliKalinlik_cm).toBeCloseTo(7, 5);
  });
});
