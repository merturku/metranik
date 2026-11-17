import { describe, it, expect } from "vitest";
import { celikKolonEtkinBurkulmaBoyuK } from "./celik-kolon-etkin-burkulma-boyu-k";

describe("Çelik Kolon K Katsayısı", () => {
  it("GA = GB = 1: ötelenmesiz K = 0,7778; ötelenmeli K = 1,3416 (nomogram ≈ 0,77 / 1,32)", () => {
    const a = celikKolonEtkinBurkulmaBoyuK.compute({ ga: 1, gb: 1, cerceve: "otelenmesiz", L_m: 4, r_mm: 60 });
    expect(a.value.K).toBeCloseTo(0.777778, 5);
    expect(a.intermediates.burkulma_boyu_m as number).toBeCloseTo(3.11111, 4);
    expect(a.intermediates.narinlik as number).toBeCloseTo(51.8519, 3);
    expect(celikKolonEtkinBurkulmaBoyuK.compute({ ga: 1, gb: 1, cerceve: "otelenmeli", L_m: 4, r_mm: 60 }).value.K).toBeCloseTo(1.341641, 5);
  });
  it("uç sınırlar: iki uç ankastre (G = 0) → 0,5 / 1,0", () => {
    expect(celikKolonEtkinBurkulmaBoyuK.compute({ ga: 0, gb: 0, cerceve: "otelenmesiz", L_m: 1, r_mm: 1 }).value.K).toBeCloseTo(0.5, 10);
    expect(celikKolonEtkinBurkulmaBoyuK.compute({ ga: 0, gb: 0, cerceve: "otelenmeli", L_m: 1, r_mm: 1 }).value.K).toBeCloseTo(1, 10);
  });
});
