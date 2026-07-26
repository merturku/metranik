import { describe, expect, it } from "vitest";
import { dosemeKalinligi } from "./doseme-kalinligi";

describe("doseme-kalinligi", () => {
  it("Ln=5m, iki ucu sürekli (mn=28) → ~17.86 cm", () => {
    const r = dosemeKalinligi.compute({
      serbestAciklik_Ln_m: 5,
      mesnetKatsayisi_mn: 28,
    });

    expect(r.value.minimumKalinlik_cm).toBeCloseTo(17.857, 2);
  });

  it("konsol döşemede (küçük mn) minimum kalınlık artar", () => {
    const surekli = dosemeKalinligi.compute({ serbestAciklik_Ln_m: 5, mesnetKatsayisi_mn: 28 });
    const konsol = dosemeKalinligi.compute({ serbestAciklik_Ln_m: 5, mesnetKatsayisi_mn: 10 });

    expect(konsol.value.minimumKalinlik_cm).toBeGreaterThan(surekli.value.minimumKalinlik_cm);
  });
});
