import { describe, it, expect } from "vitest";
import { modul_244 } from "./modul_244";

describe("Kablo I²R Kaybı", () => {
  it("IEC 60364: 16A, 0.125Ω → 32 W kayıp", () => {
    const r = modul_244.compute({
      akim_A: 16,
      direnc_Ω: 0.125,
      temp_artisi_K: 20,
    });
    expect(r.value.guc_kaybi_W).toBeCloseTo(32, 1);
  });
});
