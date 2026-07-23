import { describe, expect, it } from "vitest";
import { aydinlatmaEn12464 } from "./aydinlatma-en12464";

describe("aydinlatma-en12464", () => {
  // Φ = 500×20/(0.6×0.8) = 10000/0.48 = 20833.33 lm, bağımsız doğrulanabilir (lümen yöntemi).
  it("500 lux, 20 m², UF=0.6, MF=0.8 için gerekli akıyı hesaplar", () => {
    const r = aydinlatmaEn12464.compute({
      hedefAydinlik_lux: 500,
      alan_m2: 20,
      faydaliKullanimFaktoru: 0.6,
      bakimFaktoru: 0.8,
    });

    expect(r.value.gerekliAkilAr_lm).toBeCloseTo(20833.33, 1);
  });
});
