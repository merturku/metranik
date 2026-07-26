import { describe, expect, it } from "vitest";
import { acilAydinlatmaBataryaSuresi } from "./acil-aydinlatma-batarya-suresi";

describe("acil-aydinlatma-batarya-suresi", () => {
  it("C=4Ah, I=0.5A → 8 saat", () => {
    const r = acilAydinlatmaBataryaSuresi.compute({
      bataryaKapasitesi_C_Ah: 4,
      yukAkimi_I_A: 0.5,
    });

    expect(r.value.calismaSuresi_saat).toBeCloseTo(8, 5);
    expect(r.intermediates.calismaSuresi_dakika).toBeCloseTo(480, 5);
  });
});
