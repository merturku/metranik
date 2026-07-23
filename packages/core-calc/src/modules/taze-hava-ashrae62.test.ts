import { describe, expect, it } from "vitest";
import { tazeHavaAshrae62 } from "./taze-hava-ashrae62";

describe("taze-hava-ashrae62", () => {
  // Vbz = 10×2.5 + 50×0.3 = 25+15 = 40 L/s, bağımsız doğrulanabilir (toplama formülü).
  it("10 kişi, 50 m², Rp=2.5, Ra=0.3 için taze hava debisini hesaplar", () => {
    const r = tazeHavaAshrae62.compute({
      kisiSayisi: 10,
      alan_m2: 50,
      kisiBasiDebi_Rp: 2.5,
      alanBasiDebi_Ra: 0.3,
    });

    expect(r.value.debi_L_s).toBeCloseTo(40, 5);
  });
});
