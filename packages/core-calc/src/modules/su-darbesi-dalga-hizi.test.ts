import { describe, it, expect } from "vitest";
import { suDarbesiDalgaHizi } from "./su-darbesi-dalga-hizi";

describe("Su Darbesi Dalga Hızı", () => {
  const g = { hacimselModul_GPa: 2.2, yogunluk_kgm3: 1000, borucapi_mm: 300, etKalinligi_mm: 6, elastisiteModulu_GPa: 207, poisson: 0.3, ankraj: "genlesme" as const };
  it("çelik Ø300×6, genleşme derzli: a0 = 1483,2; a ≈ 1231 m/s", () => {
    const r = suDarbesiDalgaHizi.compute(g);
    expect(r.intermediates.rijit_boru_dalga_hizi_ms as number).toBeCloseTo(1483.24, 1);
    expect(r.intermediates.c1_katsayisi as number).toBeCloseTo(0.85, 10);
    const beklenen = 1483.2397 / Math.sqrt(1 + (2.2 / 207) * 50 * 0.85);
    expect(r.value.dalgaHizi_ms).toBeCloseTo(beklenen, 3);
    expect(r.value.dalgaHizi_ms).toBeGreaterThan(1200);
    expect(r.value.dalgaHizi_ms).toBeLessThan(1260);
  });
  it("çok rijit boruda (E → ∞) a → √(K/ρ)", () => {
    const r = suDarbesiDalgaHizi.compute({ ...g, elastisiteModulu_GPa: 1e9 });
    expect(r.value.dalgaHizi_ms).toBeCloseTo(1483.24, 1);
  });
  it("c1 küçüldükçe hız artar: genleşmeli (0,85) > tüm ankrajlı (0,91) > serbest (0,95)", () => {
    const a = (k: "tum" | "genlesme" | "serbest") => suDarbesiDalgaHizi.compute({ ...g, ankraj: k }).value.dalgaHizi_ms;
    expect(a("genlesme")).toBeGreaterThan(a("tum"));
    expect(a("tum")).toBeGreaterThan(a("serbest"));
  });
});
