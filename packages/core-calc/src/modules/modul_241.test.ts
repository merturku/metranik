import { describe, it, expect } from "vitest";
import { modul_241 } from "./modul_241";

describe("Radyatör Çıkış Sıcaklığı", () => {
  it("Test: 10 × 5 = 50", () => {
    const r = modul_241.compute({ dever_1: 10, dever_2: 5 });
    expect(r.value.sonuc).toBeCloseTo(50, 0);
  });
});
