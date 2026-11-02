import { describe, it, expect } from "vitest";
import { kolonYukToplama } from "./kolon-yuk-toplama";

describe("Kolon Yük Toplama", () => {
  it("5 kat × 25 m² × 12 kN/m² + çatı 25×8 + 30 kN öz ağırlık = 1730 kN", () => {
    const r = kolonYukToplama.compute({ katSayisi: 5, etkiAlani_m2: 25, katTasarimYuku_kNm2: 12, catiTasarimYuku_kNm2: 8, kolonOzAgirligi_kN: 30 });
    expect(r.intermediates.kat_yukleri_kN).toBe(1500);
    expect(r.intermediates.cati_yuku_kN).toBe(200);
    expect(r.value.eksenelYuk_kN).toBe(1730);
  });
});
