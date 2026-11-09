import { describe, it, expect } from "vitest";
import { esanjorNtuKarsitAkis } from "./esanjor-ntu-karsit-akis";

const g = { UA_WK: 1500, sicakDebiKapasitesi_Ch_WK: 2000, sogukDebiKapasitesi_Cc_WK: 1000, sicakGiris_C: 90, sogukGiris_C: 20 };

describe("Eşanjör ε–NTU (karşıt akış)", () => {
  it("UA = 1500, Cmin = 1000, Cmax = 2000: NTU = 1,5; Cr = 0,5; ε = 0,6908; Q = 48,36 kW", () => {
    const r = esanjorNtuKarsitAkis.compute(g);
    expect(r.intermediates.NTU).toBe(1.5);
    expect(r.intermediates.etkinlik_epsilon as number).toBeCloseTo(0.6908, 4);
    expect(r.value.isiTransferi_W).toBeCloseTo(48357, -1);
  });
  it("enerji dengesi: soğuk çıkış = 20 + 48 357/1000 = 68,4 °C; sıcak çıkış = 90 − 24,2 = 65,8 °C", () => {
    const r = esanjorNtuKarsitAkis.compute(g);
    expect(r.intermediates.soguk_cikis_C as number).toBeCloseTo(68.36, 1);
    expect(r.intermediates.sicak_cikis_C as number).toBeCloseTo(65.82, 1);
  });
  it("Cr = 1 → ε = NTU/(1 + NTU); UA → ∞ → ε → 1; ters sıcaklık uygunsuz", () => {
    const eq = esanjorNtuKarsitAkis.compute({ ...g, sicakDebiKapasitesi_Ch_WK: 1000 });
    expect(eq.intermediates.etkinlik_epsilon as number).toBeCloseTo(1.5 / 2.5, 8);
    expect(esanjorNtuKarsitAkis.compute({ ...g, UA_WK: 1e9 }).intermediates.etkinlik_epsilon as number).toBeCloseTo(1, 6);
    expect(esanjorNtuKarsitAkis.compute({ ...g, sicakGiris_C: 10 }).verdict?.status).toBe("uygunsuz");
  });
});
