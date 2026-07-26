import { describe, expect, it } from "vitest";
import { akuSarjSuresi } from "./aku-sarj-suresi";

describe("aku-sarj-suresi", () => {
  it("C=100Ah, I=10A, η=0.85 → ~11.765 saat", () => {
    const r = akuSarjSuresi.compute({
      bataryaKapasitesi_C_Ah: 100,
      sarjAkimi_I_A: 10,
      sarjVerimi_eta: 0.85,
    });

    expect(r.value.sarjSuresi_saat).toBeCloseTo(11.765, 2);
  });
});
